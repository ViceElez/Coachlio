export interface TodaySession {
    id: number;
    start_time: string;
    end_time: string;
    session_type: string;
    status: string;
    price: number;
    bookings: { id: number; status: string; client: { first_name: string; last_name: string } | null }[];
}