"use client";

import {ClientProfile} from "@/interface/clientProfile";

export default function BookClient({ profile }: { profile: ClientProfile }) {

    return (
        <div>
            <h1>Welcome to the Book Page</h1>
            <h3>How are you today {profile.first_name}{profile.last_name}</h3>
        </div>
    );
}