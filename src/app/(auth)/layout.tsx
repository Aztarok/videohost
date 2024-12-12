import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { headers } from "next/headers";
import React from "react";
import { SignInForm, SignUpForm } from "./components/AuthForms";

export default async function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const header_url = headersList.get("x-url") || "";
    const pathname = headersList.get("x-pathname");
    const origin_url = headersList.get("x-origin");
    return (
        <div className="flex flex-col items-center justify-center bg-blue-950 h-screen">
            <MaxWidthWrapper>
                <div>
                    {pathname === "/sign-in" ? <SignInForm /> : <SignUpForm />}
                </div>
                {children}
            </MaxWidthWrapper>
        </div>
    );
}
