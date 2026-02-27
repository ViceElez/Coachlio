export interface SessionProps {
    id: number;
    capacity_available: number;
    price: number;
    start_time: string;
    end_time: string;
    status: string;
    trainer: {
        first_name: string
        last_name: string
    }
}