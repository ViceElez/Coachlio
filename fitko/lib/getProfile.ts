"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";
import type { TrainerClient,ClientSession,TrainerNote } from "@/constants/interface/clientProfileAndSessions";
import {getClientNotes, getSessionNotes} from "@/lib/notes";
import {getClientSessions} from "@/lib/session";

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

export async function getTrainerClientsAndSessions(
    trainerId: string
): Promise<TrainerClient[]> {
    const clients = await getTrainerClients(trainerId);

    if (clients.length === 0) {
        return [];
    }

    const clientIds = clients.map(c => c.id);

    const [clientNotes, bookings] = await Promise.all([
        getClientNotes(trainerId, clientIds),
        getClientSessions(trainerId, clientIds),
    ]);

    const sessionIds = bookings
        .map(b => b.session_id)
        .filter(Boolean);

    const sessionNotes = await getSessionNotes(trainerId, sessionIds);

    const now = new Date();

    const notesByClient = new Map<string, TrainerNote[]>();
    clientNotes.forEach((note) => {
        if (!notesByClient.has(note.client_id)) {
            notesByClient.set(note.client_id, []);
        }
        notesByClient.get(note.client_id)!.push(note);
    });

    const notesBySession = new Map<number, TrainerNote[]>();
    sessionNotes.forEach((note) => {
        if (!note.session_id) return;
        if (!notesBySession.has(note.session_id)) {
            notesBySession.set(note.session_id, []);
        }
        notesBySession.get(note.session_id)!.push(note);
    });

    const sessionsByClient = new Map<string, ClientSession[]>();
    bookings.forEach((booking: any) => {
        const session = Array.isArray(booking.sessions)
            ? booking.sessions[0]
            : booking.sessions;

        if (!session) return;

        const sessionData: ClientSession = {
            booking_id: booking.id,
            booking_status: booking.status,
            session_id: session.id,
            start_time: session.start_time,
            end_time: session.end_time,
            session_type: session.session_type,
            price: session.price,
            status: session.status,
            session_notes: notesBySession.get(session.id) || [],
        };

        if (!sessionsByClient.has(booking.client_id)) {
            sessionsByClient.set(booking.client_id, []);
        }

        sessionsByClient.get(booking.client_id)!.push(sessionData);
    });

    const result: TrainerClient[] = clients.map((client) => {
        const allSessions = sessionsByClient.get(client.id) || [];

        return {
            id: client.id,
            email: client.email,
            first_name: client.first_name,
            last_name: client.last_name,
            client_notes: notesByClient.get(client.id) || [],
            upcoming_sessions: allSessions
                .filter((s) => new Date(s.start_time) >= now)
                .sort(
                    (a, b) =>
                        new Date(a.start_time).getTime() -
                        new Date(b.start_time).getTime()
                ),
            past_sessions: allSessions
                .filter((s) => new Date(s.start_time) < now)
                .sort(
                    (a, b) =>
                        new Date(b.start_time).getTime() -
                        new Date(a.start_time).getTime()
                ),
        };
    });

    return result;
}

export async function getTrainerClients(trainerId: string){
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select("id, email, first_name, last_name")
        .eq("trainer_id", trainerId);

    if (error) {
        console.error("Error fetching clients:", error);
        return [];
    }

    return data || [];
}