import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { headers } from "next/headers";
import React from "react";
import { SignInForm, SignUpForm } from "./components/AuthForms";

export default async function AuthLayout() {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname");

    return (
        <div className="flex flex-col items-center justify-center bg-blue-950 h-screen">
            <MaxWidthWrapper>
                <div>
                    {pathname === "/sign-in" ? <SignInForm /> : <SignUpForm />}
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
