import {createClient} from "@/utils/supabase/server";

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
    const { data:bookings,error } = await supabase.from('bookings').select(`id,sessions(id,start_time,end_time,price,capacity_available,status,session_type,trainer:users (first_name,last_name))`)
        .eq('client_id', clientId)
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