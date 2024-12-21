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
import { createClient } from "@/utils/supabase/client";
import { Play, Search, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function VideoNavbar() {
    const router = useRouter()
    const { user, setUser } = useStore(useShallow((state) => ({ user: state.user, setUser: state.setUser })))
    const [isHydrated, setIsHydrated] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user));
    const [logoutInProgress, setLogoutInProgress] = useState(false);


    useEffect(() => {
        const unsubHydrage = useStore.persist.onHydrate(() => setIsHydrated(true))
        if (useStore.persist.hasHydrated()) setIsHydrated(true);
        return () => unsubHydrage();
    }, []);

    useEffect(() => {
        if (!isHydrated || logoutInProgress) {
            console.log("Fetching user from Zustand...")
            console.log("User: ", user)
            console.log("Logged In: ", isLoggedIn)
            console.log("Is Hydrated: ", isHydrated)
            return
        };

        if (user) {
            console.log("User already set from Zustand...")
            setIsLoggedIn(true)
            return
        }
        console.log("Fetching user from Supabase...")
        console.log("Signed In: ", isLoggedIn)
        const fetchUser = async () => {
            try {
                const supabase = createClient()
                const { data: session } = await supabase.auth.getSession()
                if (!session.session) {
                    setUser(null);
                    setIsLoggedIn(false);
                    console.log("User not signed in...")
                } else {
                    const { data } = await supabase.auth.getUser()
                    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", data.user?.id).single()
                    if (profileData) {
                        const transformeduser = {
                            id: profileData.id,
                            createdAt: new Date(profileData.created_at),
                            userName: profileData.user_name,
                            email: profileData.email,
                            imageUrl: profileData.image_url,
                            isActive: profileData.is_active
                        }
                        setUser(transformeduser)
                        setIsLoggedIn(true)
                    }
                }
            } catch (error) {
                console.error("Error fetching user from Supabase: ", error)
            }
        }

        fetchUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated, logoutInProgress]);

    const handleSignOut = async () => {
        setLogoutInProgress(true); // Prevent fetchUser from running
        setUser(null);
        setIsLoggedIn(false);
        await useStore.persist.clearStorage();
        await signout();
        setLogoutInProgress(false); // Reset after sign-out
        router.refresh();
    };

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
                                        <DropdownMenuItem>{JSON.stringify(user)}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut} className="hover:cursor-pointer" asChild>
                                            <span className="">
                                                Sign out
                                            </span>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem className="hover:cursor-pointer" asChild>
                                            <Link href="/sign-in">Sign In</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:cursor-pointer" asChild>
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
