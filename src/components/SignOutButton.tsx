"use client";

import { signout } from "@/app/(auth)/actions";

export default function SignOutButton() {
    return <button onClick={async () => await signout()}>Sign out</button>;
}
