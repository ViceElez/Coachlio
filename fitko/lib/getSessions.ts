import {createClient} from "@/utils/supabase/server";

const supabase=await createClient()
export async function getClientSessions(trainerId:string) {
    if(!trainerId) return null

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