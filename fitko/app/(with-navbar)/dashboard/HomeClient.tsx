"use client";

import {ClientProfile} from "@/constants/interface/clientProfile";

export default function HomeClient({ profile }: { profile: ClientProfile }) {

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <h3>How are you today {profile.first_name}{profile.last_name}</h3>
        </div>
    );
}