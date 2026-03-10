export interface TrainerStats {
    totalClients: number;
    weekSessionsCompleted: number;
    weeklySessionData: { day: string; sessions: number }[];
}