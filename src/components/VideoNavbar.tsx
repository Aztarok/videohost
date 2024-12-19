"use client";

import { signout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import { Session } from "@/types/session";
import { createClient } from "@/utils/supabase/client";
import { Play, Search, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function VideoNavbar({ session }: { session: Session }) {
    const { user, setUser } = useStore()
    const [isHydrated, setIsHydrated] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(session.session !== null);
    useEffect(() => {
        const unsubHydrate = useStore.persist.onHydrate?.(() =>
            setIsHydrated(true)
        );
        return () => unsubHydrate?.(); // Cleanup on unmount
    }, []);

    useEffect(() => {
        // Step 1: Check if there's a user in localStorage or Zustand store
        const storedUser = localStorage.getItem("user"); // Assuming the user is stored in localStorage

        if (storedUser || user) {
            // If user exists, do not call getUser
            console.log("User found in localStorage or Zustand:", storedUser || user);
            return;
        }
        console.log(1)
        // Step 2: Wait until Zustand is hydrated
        if (isHydrated) return;

        console.log("No user found, fetching user from Supabase...");
        if (session.session !== null) {
            const supabase = createClient();

            console.log(2)

            const getUser = async () => {
                const { data, error } = await supabase.auth.getUser();
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", data?.user?.id)
                    .single();

                if (profileData) {
                    const transformedUser = {
                        id: profileData.id,
                        createdAt: new Date(profileData.created_at),
                        userName: profileData.user_name,
                        email: profileData.email,
                        imageUrl: profileData.image_url,
                        isActive: profileData.is_active,
                    };

                    // Step 3: Store the user in Zustand and localStorage
                    setUser(transformedUser);
                    localStorage.setItem("user", JSON.stringify(transformedUser));
                }
            };

            getUser();
        }
    }, [isHydrated, user, setUser]);


    // useEffect(() => {
    //     const supabase = createClient()
    //     const [isHydrated, setIsHydrated] = useState(false)

    //     const getUser = async () => {
    //         const { data, error } = await supabase.auth.getUser()
    //         const { data: profileData } = await supabase.from("profiles").select("*").eq("id", data?.user?.id).single()
    //         if (data) {
    //             console.log(data)
    //             console.log(user)
    //             console.log(error)
    //             const transformedUser = {
    //                 id: profileData.id,
    //                 createdAt: new Date(profileData.created_at),
    //                 userName: profileData.user_name,
    //                 email: profileData.email,
    //                 imageUrl: profileData.image_url,
    //                 isActive: profileData.is_active,
    //             };
    //             setUser(
    //                 transformedUser
    //             )
    //         }
    //     }
    //     getUser()
    //     console.log("Zustand User: ", user)
    // }, [setUser])
    const handleSignOut = () => {
        setUser(null)
        signout()
        localStorage.removeItem("user")
        localStorage.removeItem("zustand-store")
    }
    console.log("Zustand User: ", user)
    return (
        <div className="border-b w-full">
            <div className="flex h-16 items-center px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <Play className="h-6 w-6" />
                    <span>VideoHub</span>
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <div className="relative w-96">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search videos..."
                            className="pl-8"
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <SlidersHorizontal className="h-5 w-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Search Filters</DialogTitle>
                                <DialogDescription>
                                    Use the fields below to refine your search.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium"
                                    >
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        placeholder="Enter video title"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="artist"
                                        className="block text-sm font-medium"
                                    >
                                        Artist
                                    </label>
                                    <Input
                                        id="artist"
                                        placeholder="Enter artist name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="tags"
                                        className="block text-sm font-medium"
                                    >
                                        Tags
                                    </label>
                                    <Input
                                        id="tags"
                                        placeholder="Enter tags"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end font-black">
                                <Button>
                                    <Search className="h-4 w-4" />
                                    <p className="text-[0.95rem] font-bold tracking-wide">
                                        Search
                                    </p>
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {
                                isLoggedIn ? (
                                    <>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Settings</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem className="hover:cursor-pointer">
                                            <Link href="/sign-in">Sign In</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:cursor-pointer">
                                            <Link href="/sign-up">Sign Up</Link>
                                        </DropdownMenuItem>
                                    </>
                                )
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
