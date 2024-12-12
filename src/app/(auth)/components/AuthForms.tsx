"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SignInForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        // Mock sign-in logic (replace with actual API call)
        console.log("Signing in with:", email, password);
        router.push("/");
    };

    const handleGoogleSignIn = () => {
        // Mock Google sign-in logic (replace with actual API call)
        console.log("Signing in with Google");
    };

    return (
        <div className="sm:w-[35rem] w-full h-1/3 flex flex-col gap-4 mx-auto mt-24 bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
            >
                <div className="mb-4 font-bold text-lg">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-6 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-6 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button
                        onClick={handleSignIn}
                        className="w-full py-6 bg-green-800 hover:bg-green-600 font-bold text-white"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full py-6 bg-blue-800 hover:bg-blue-600 font-bold text-white"
                    >
                        Sign In with Google
                    </Button>
                </div>
            </form>
            <p className="mt-auto text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link href="/sign-up" className="text-blue-400 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export function SignUpForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        // Mock sign-up logic (replace with actual API call)
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Signing up with:", email, password);
        router.push("/sign-in");
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                </div>
                <Button onClick={handleSignUp} className="w-full mb-2">
                    Sign Up
                </Button>
                <Button
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() =>
                        alert("Google Sign-Up is not supported yet.")
                    }
                >
                    Sign Up with Google
                </Button>
            </form>
            <p className="mt-4 text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-400 hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
