export interface ClientProfile{
    id: string;
    trainer_id: string | null;
    email: string;
    first_name: string;
    last_name: string;
    is_activated: boolean;
}