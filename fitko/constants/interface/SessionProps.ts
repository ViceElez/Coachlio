export interface SessionProps {
    id: number;
    capacity_available: number;
    price: number;
    start_time: string;
    end_time: string;
    status: string;
    session_type: "group" | "1on1";
    trainer?: {
        first_name: string
        last_name: string
    }|null
}