import {createClient} from "@/utils/supabase/server";

export async function createBookingSession(sessionId:number, clientId:string) {
    if(!sessionId || !clientId) {
        throw new Error("Session ID and Client ID are required to create a booking session.");
    }

    const supabase=await createClient()
    const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
            session_id: sessionId,
            client_id: clientId,
            expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        })
        .select()
        .single();

    if(error) {
        console.error("Error creating booking session:", error);
        throw new Error("Failed to create booking session.");
    }

    return booking;
}

export async function deleteBookingSession(bookingId:number){
    if(!bookingId) {
        throw new Error("Booking ID is required to delete a booking session.");
    }

    const supabase=await createClient()
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if(error) {
        console.error("Error deleting booking session:", error);
        throw new Error("Failed to delete booking session.");
    }

    return true;
}