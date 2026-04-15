"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";

export async function getProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect(routes.LOGIN);

    const { data: profile } = await supabase
        .from("users")
        .select("id,trainer_id, email, first_name, last_name, is_activated")
        .eq("id", user.id)
        .single();

    return profile;
}

export async function getUserRole(userId: string) {
    const supabase = await createClient();
    const { data: userPrivate, error } = await supabase
        .from('user_private')
        .select('role')
        .eq('id', userId)
        .single();

    if(error) {
        console.error('Error fetching user role:', error);
        return null;
    }

    return userPrivate?.role || null;

}

export async function getUserCredits(userId: string) {
    const supabase = await createClient();

    const { data:userPrivate,error } = await supabase
        .from("user_private")
        .select("credits")
        .eq("id", userId)
        .single();

    if(error) {
        console.error('Error fetching user credits:', error);
        return null;
    }

    return userPrivate?.credits || null;

}

export async function getTrainerClientsAndSessions(trainerId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select(`
            id, 
            email, 
            first_name, 
            last_name,
            trainer_notes!trainer_notes_client_id_fkey (
                id,
                note,
                created_at,
                updated_at
            ),
            bookings!bookings_client_id_fkey (
                id,
                status,
                sessions!bookings_session_id_fkey (
                    id,
                    start_time,
                    end_time,
                    session_type,
                    status,
                    price,
                    trainer_notes!trainer_notes_session_id_fkey (
                        id,
                        note,
                        created_at,
                        updated_at
                    )
                )
            )
        `)
        .eq("trainer_id", trainerId)
        .eq("bookings.status", "reserved")
        .in("bookings.sessions.status", ["scheduled", "completed"])
        .eq("bookings.sessions.trainer_id", trainerId)
        .is("trainer_notes.session_id", null); // Only get general client notes at user level

    if (error) {
        console.error('Error fetching trainer clients:', error);
        return [];
    }

    const now = new Date();

    const clientsWithSessions = data?.map(client => {
        const allSessions = client.bookings
            ?.filter(booking => booking.sessions)
            .map(booking => ({
                booking_id: booking.id,
                booking_status: booking.status,
                session_id: booking.sessions.id,
                start_time: booking.sessions.start_time,
                end_time: booking.sessions.end_time,
                session_type: booking.sessions.session_type,
                price: booking.sessions.price,
                status: booking.sessions.status,
                session_notes: booking.sessions.trainer_notes || []
            })) || [];

        return {
            id: client.id,
            email: client.email,
            first_name: client.first_name,
            last_name: client.last_name,
            client_notes: client.trainer_notes || [],
            upcoming_sessions: allSessions
                .filter(s => new Date(s.start_time) >= now)
                .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()),
            past_sessions: allSessions
                .filter(s => new Date(s.start_time) < now)
                .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        };
    });

    return clientsWithSessions?.map(({ bookings, trainer_notes, ...client }) => client) || [];
}