"use server";

import {createClient} from "@/utils/supabase/server";
import { getEarliestSessionStart } from "@/lib/helper/getTime";

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

    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diffToMonday);
    weekStart.setHours(0,0,0,0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23,59,59,999);

    const { data: weekSessions, error: weekError } = await supabase
        .from('sessions')
        .select(`id, start_time,end_time, bookings(id, status)`)
        .eq('trainer_id', trainerId)
        .gte('start_time', weekStart.toISOString())
        .lte('start_time', weekEnd.toISOString());

    if (clientsError) console.error("Error fetching trainer clients:", clientsError);
    if (weekError) console.error("Error fetching week sessions:", weekError);

    const uniqueClients = clientsData
        ? new Set(clientsData.map((b: { client_id: string }) => b.client_id)).size
        : 0;

    const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCountMap: Record<string, number> = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0,
    };
    let weekSessionsCompleted = 0;

    if (weekSessions) {
        for (const s of weekSessions) {
            const paidExists = s.bookings?.some(
                (b: { status: string }) => b.status === "paid"
            );
            if (!paidExists) continue;
            const dayLabel = DAY_LABELS[new Date(s.start_time).getDay()];
            dayCountMap[dayLabel] += 1;
            if (new Date(s.end_time) < now) {
                weekSessionsCompleted += 1;
            }
        }
    }

    const weeklySessionData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
        day,
        sessions: dayCountMap[day],
    }));

    return {
        totalClients: uniqueClients,
        weekSessionsCompleted,
        weeklySessionData,
    };
}

export async function getClientSessions(trainerId:string,clientId:string) {
    if(!trainerId||!clientId) return null

    const supabase=await createClient()

    const {data,error}=await supabase.rpc("get_available_sessions_for_client",{
        p_trainer_id:trainerId,
        p_client_id:clientId
    })

    if(error){
        console.error("Error fetching client sessions:", error);
        return null;
    }
    return data
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

    if(!trainerId||!startTime||!endTime||!sessionType||!price||!capacity) return null

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) return null;

    const earliest = getEarliestSessionStart(new Date());
    const GRACE_MS = 90 * 1000;

    if (start.getTime() < earliest.getTime() - GRACE_MS) {
        console.error(
            `Start time too soon. start=${start.toISOString()} earliest=${earliest.toISOString()}`
        );
        return null;
    }

    if (end.getTime() <= start.getTime()) return null

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

export async function calculateMonthlySessionsProfit(trainerId: string) {
    if (!trainerId) return null;

    const supabase = await createClient();

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const { data, error } = await supabase
        .from("sessions")
        .select(`capacity_total, capacity_available, price`)
        .eq("trainer_id", trainerId)
        .gte("start_time", startOfMonth.toISOString())
        .lt("start_time", startOfNextMonth.toISOString());

    if (error) {
        console.error("Error calculating session profit:", error);
        return null;
    }

    let totalProfit = 0;

    data?.forEach((session) => {
        totalProfit += session.price * (session.capacity_total - session.capacity_available);
    });

    return totalProfit;
}

export async function getAllUpcomingSessions(trainerId:string) {
    if(!trainerId) return null

    const supabase=await createClient()

    const { data,error } = await supabase.from('sessions')
        .select(`id, start_time, end_time, session_type, price, capacity_available,capacity_total,status`)
        .eq('trainer_id', trainerId)
        .eq('status', 'scheduled')
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

    if(error) {
        console.error("Error fetching upcoming sessions:", error);
        return null;
    }

    return data
}

export async function deleteSession(sessionId:number,trainerId:string) {
    if(!sessionId || !trainerId) return null;

    const supabase=await createClient();

    const { data, error } = await supabase
        .from('sessions')
        .update({ status: 'cancelled' })
        .eq('id', sessionId)
        .eq('trainer_id', trainerId)
        .eq('status', 'scheduled')
        .select()
        .single();

    if (error) {
        console.error("Error deleting session:", error);
        return null;
    }
    return data;
}

export async function editSession(sessionId:number,trainerId:string, startTime: string, endTime: string, sessionType: string, price: string,capacity_total: string) {
    if (!sessionId || !trainerId) return null;

    const supabase=await createClient();
    const{data,error}=await supabase
        .from('sessions')
        .update({
            start_time: startTime,
            end_time: endTime,
            session_type: sessionType,
            price: parseFloat(price),
            capacity_total: parseInt(capacity_total),
            capacity_available: parseInt(capacity_total),
        })
        .eq('id',sessionId)
        .eq('trainer_id',trainerId)

    if(error){
        console.log("Error updating sessions",error)
        return null
    }

    return data
}

export async function checkIfSessionIsBooked(sessionId:number,trainerId:string) {
    if(!sessionId || !trainerId) return null

    const supabase=await createClient()
    const { count, error } = await supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('session_id', sessionId)
        .in('status', ['reserved', 'paid']);

    if (error) {
        console.error("Error checking if session is booked:", error);
        return null;
    }

    return (count ?? 0) > 0;
}