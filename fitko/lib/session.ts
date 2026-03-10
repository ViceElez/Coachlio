"use server";

import {createClient} from "@/utils/supabase/server";

export async function getTrainerTodaySessions(trainerId: string) {
    if (!trainerId) return null;

    const supabase = await createClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const { data: sessions, error } = await supabase
        .from('sessions')
        .select(`id, start_time, end_time, session_type, status, price, capacity_available, bookings(id, status, client:users(first_name, last_name))`)
        .eq('trainer_id', trainerId)
        .gte('start_time', todayStart.toISOString())
        .lte('start_time', todayEnd.toISOString())
        .order('start_time', { ascending: true });

    if (error) {
        console.error("Error fetching trainer today sessions:", error);
        return null;
    }

    const sessionsArr = sessions || [];

    return sessionsArr.map((session: any) => {
        const bookingsRaw = session.bookings == null
            ? []
            : Array.isArray(session.bookings)
                ? session.bookings
                : [session.bookings];

        const bookings = bookingsRaw.map((booking: any) => {
            let client = booking.client ?? null;
            if (Array.isArray(client)) client = client[0] ?? null;

            return {
                id: booking.id,
                status: booking.status,
                client,
            };
        });

        console.log("Processed session:", {
            ...session,
            bookings,
        })
        return {
            ...session,
            bookings,
        };
    });
}

export async function getTrainerStats(trainerId: string) {
    if (!trainerId) return null;

    const supabase = await createClient();

    const { data: clientsData, error: clientsError } = await supabase
        .from('bookings')
        .select(`client_id, sessions!inner(trainer_id)`)
        .eq('sessions.trainer_id', trainerId)
        .eq('status', 'paid');

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date();
    weekEnd.setHours(23, 59, 59, 999);

    const { data: weekSessions, error: weekError } = await supabase
        .from('sessions')
        .select(`id, start_time, bookings(id, status)`)
        .eq('trainer_id', trainerId)
        .gte('start_time', weekStart.toISOString())
        .lte('start_time', weekEnd.toISOString());

    if (clientsError) console.error("Error fetching trainer clients:", clientsError);
    if (weekError) console.error("Error fetching week sessions:", weekError);

    const uniqueClients = clientsData
        ? new Set(clientsData.map((b: { client_id: string }) => b.client_id)).size
        : 0;

    const weekSessionsCompleted = weekSessions
        ? weekSessions.reduce((acc, s) => {
            const bookings = Array.isArray(s.bookings) ? s.bookings : [];
            return acc + bookings.filter((b: { status: string }) => b.status === 'paid').length;
        }, 0)
        : 0;

    return {
        totalClients: uniqueClients,
        weekSessionsCompleted,
    };
}

export async function getClientSessions(trainerId:string) {
    if(!trainerId) return null

    const supabase=await createClient()
    const { data: sessions, error } = await supabase
        .from('sessions')
        .select(`id, capacity_available, price, start_time, end_time,status,session_type, trainer:users (first_name,last_name)`)
        .eq('trainer_id', trainerId)
        .eq('status', 'scheduled')
        .gt('capacity_available', 0)
        .gte('start_time', new Date().toISOString())

    if(error) {
        console.error("Error fetching sessions:", error);
        return null;
    }

    return sessions.map((session) => ({
        ...session,
        trainer: Array.isArray(session.trainer) ? session.trainer[0] : session.trainer,
    }));
}

export async function getClientUpcomingSessions(clientId:string) {
    if(!clientId) return null

    const supabase=await createClient()
    const { data:bookings,error } = await supabase.from('bookings').select(`id, sessions!inner(id,start_time,end_time,price,capacity_available,status,session_type,trainer:users (first_name,last_name))`)
        .eq('client_id', clientId)
        .eq('status', 'paid')
        .gte('sessions.start_time', new Date().toISOString())


    if(error) {
        console.error("Error fetching upcoming sessions:", error);
        return null;
    }

    return bookings.map((booking) => {
        const session = Array.isArray(booking.sessions) ? booking.sessions[0] : booking.sessions
        const trainer = Array.isArray(session?.trainer) ? session?.trainer[0] : session?.trainer

        return {
            ...booking,
            sessions: {
                ...session,
                trainer,
            }
        }
    })
}

export async function createSession(trainerId: string, startTime: string, endTime: string, sessionType: string, price: number,capacity: number) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('sessions')
        .insert({
            trainer_id: trainerId,
            start_time: startTime,
            end_time: endTime,
            session_type: sessionType,
            price,
            capacity_total: capacity,
            capacity_available: capacity,
        })
        .select()
        .single()

    if (error) {
        console.error("Error creating session:", error);
        return null;
    }
    return data;
}