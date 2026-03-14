import {getProfile,getUserRole} from "@/lib/getProfile";
import {redirect} from "next/navigation";
import {routes} from "@/constants/routes";
import DashboardClient from "./DashboardClient";
import {
    getClientUpcomingSessions,
    getTrainerTodaySessions,
    getTrainerStats,
    calculateMonthlySessionsProfit
} from "@/lib/session";
import DashboardTrainer from "./DashboardTrainer";

const MOTIVATIONAL_MESSAGES = [
    "You're doing great! Keep up the momentum 🔥",
    "Every rep counts. Stay consistent and trust the process 💪",
    "Small steps every day lead to big results. You've got this! ⚡",
    "Your only competition is who you were yesterday. Keep pushing! 🚀",
    "Showing up is half the battle — and you're already here. Let's go! 🎯",
    "Progress, not perfection. You're on the right track 🌟",
    "Champions are made on the days they don't feel like it. Be a champion! 🏆",
    "One session at a time. You're building something amazing 💥",
    "Your future self will thank you for the work you put in today 🙌",
    "Consistency beats intensity every time. Keep going! 🔑",
];

function pickMessage() {
    return MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
}

export default async function DashboardPage() {
    const profile = await getProfile();
    if (!profile) redirect(routes.LOGIN);
    const role= await getUserRole(profile.id);

    if(role !== "client") {
        const [todaySessions, trainerStats,monthlyProfit] = await Promise.all([
            getTrainerTodaySessions(profile.id),
            getTrainerStats(profile.id),
            calculateMonthlySessionsProfit(profile.id)
        ]);
        return <DashboardTrainer profile={profile} todaySessions={todaySessions ?? []} stats={trainerStats} monthlyProfit={monthlyProfit} />;
    }

    const motivationalMessage = pickMessage();
    const upcomingSessions = await getClientUpcomingSessions(profile.id);

    return <DashboardClient profile={profile} motivationalMessage={motivationalMessage} upcomingSessions={upcomingSessions ?? []}
    />;
} //triba fixat da se booking za group session ne broji zasebno