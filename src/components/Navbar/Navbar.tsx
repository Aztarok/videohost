"use client";

import { signout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ signedIn }: { signedIn: string }) {
    // Mock authentication state (replace with real authentication logic)
    const [isLoggedIn, setIsLoggedIn] = useState(signedIn !== "");

    const handleSignOut = async () => {
        signout();
        setIsLoggedIn(false);
    };
    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shadow-md rounded-xl">
            {/* Left: Logo/Home Button */}
            <div className="flex items-center">
                <Link href="/">Logo</Link>
            </div>

            {/* Middle: Search Bar */}
            <div className="w-[50rem] mx-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
            </div>

            {/* Right: Authentication Buttons */}
            <div className="flex items-center space-x-2">
                {isLoggedIn ? (
                    <>
                        <Link href="/profile">
                            <Button
                                variant="outline"
                                className="text-white border-gray-600"
                            >
                                Profile
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="text-white border-gray-600"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/sign-in">
                            <Button
                                variant="outline"
                                className="text-white border-gray-600"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button
                                variant="outline"
                                className="text-white border-gray-600"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
