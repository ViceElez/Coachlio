import { getProfile, getUserRole } from "@/lib/getProfile";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";
import SettingsClient from "./SettingsClient";
import SettingsTrainer from "./SettingsTrainer";

export default async function SettingsPage() {
    const profile = await getProfile();
    if (!profile) redirect(routes.LOGIN);

    const role = await getUserRole(profile.id);

    if (role !== "client") {
        return <SettingsTrainer profile={profile} />;
    }

    return <SettingsClient />;
}