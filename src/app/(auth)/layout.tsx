import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

export default async function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center bg-blue-950 h-screen">
            <MaxWidthWrapper>
                <div>
                    {/* {pathname === "/sign-in" ? <SignInForm /> : <SignUpForm />} */}
                    {children}
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
