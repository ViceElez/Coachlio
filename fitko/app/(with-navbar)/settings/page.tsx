import {getProfile, getTrainerClientsAndSessions, getUserRole} from "@/lib/getProfile";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";
import SettingsClient from "./SettingsClient";
import SettingsTrainer from "./SettingsTrainer";

export default async function SettingsPage() {
    const profile = await getProfile();
    if (!profile) redirect(routes.LOGIN);

    const role = await getUserRole(profile.id);

    if (role !== "client") {
        const trainersClients=await getTrainerClientsAndSessions(profile.id)
        return <SettingsTrainer profile={profile} />;
    }

    return <SettingsClient />;
}