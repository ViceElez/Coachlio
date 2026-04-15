export interface TrainerNote {
    id: number;
    note: string;
    created_at: string;
    updated_at: string;
}

export interface ClientSession {
    booking_id: number;
    booking_status: 'reserved' | 'paid' | 'expired' | 'cancelled';
    session_id: number;
    start_time: string;
    end_time: string;
    session_type: string | null;
    status: 'scheduled' | 'completed';
    price: number;
    session_notes: TrainerNote[];
}

export interface TrainerClient {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    client_notes: TrainerNote[];
    upcoming_sessions: ClientSession[];
    past_sessions: ClientSession[];
}