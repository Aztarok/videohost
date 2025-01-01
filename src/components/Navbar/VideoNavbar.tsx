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
import { Moon, Play, Search, SlidersHorizontal, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function VideoNavbar() {
    const { setTheme } = useTheme();
    const router = useRouter();
    const { user, setUser, isSignedIn, setIsSignedIn } = useStore(
        useShallow((state) => ({
            user: state.user,
            setUser: state.setUser,
            isSignedIn: state.isSignedIn,
            setIsSignedIn: state.setIsSignedIn
        }))
    );
    const [isHydrated, setIsHydrated] = useState(false);

    // useEffect(() => {
    //     const unsubHydrage = useStore.persist.onHydrate(() =>
    //         setIsHydrated(true)
    //     );
    //     if (useStore.persist.hasHydrated()) setIsHydrated(true);
    //     return () => unsubHydrage();
    // }, []);

    // useEffect(() => {
    //     console.log("lol");
    //     if (!isHydrated || logoutInProgress) {
    //         if (isSignedIn) {
    //             console.log("4");
    //         } else {
    //             return;
    //         }
    //     }
    //     console.log("1");
    //     if (user) {
    //         setIsSignedIn(true);
    //         return;
    //     }

    //     console.log("2");
    //     if (isSignedIn === user) {
    //         console.log("not signed in", isSignedIn);
    //         return;
    //     }
    //     console.log("3");

    //     console.log("Fetching user from Supabase...");
    //     const fetchUser = async () => {
    //         try {
    //             const supabase = createClient();
    //             const { data: session } = await supabase.auth.getSession();
    //             // if (!session.session) {
    //             //     setUser(null);
    //             //     setIsSignedIn(false);
    //             // } else {
    //             const { data } = await supabase.auth.getUser();
    //             const { data: profileData } = await supabase
    //                 .from("profiles")
    //                 .select("*")
    //                 .eq("id", data.user?.id)
    //                 .single();
    //             console.log(profileData);
    //             if (profileData) {
    //                 const transformeduser = {
    //                     id: profileData.id,
    //                     createdAt: new Date(profileData.created_at),
    //                     userName: profileData.user_name,
    //                     email: profileData.email,
    //                     imageUrl: profileData.image_url,
    //                     isActive: profileData.is_active
    //                 };
    //                 console.log(transformeduser);
    //                 setUser(transformeduser);
    //                 // }
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user from Supabase: ", error);
    //         }
    //     };

    //     fetchUser();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isHydrated, logoutInProgress, isSignedIn]);

    useEffect(() => {
        const unsubHydrage = useStore.persist.onHydrate(() =>
            setIsHydrated(true)
        );
        if (useStore.persist.hasHydrated()) setIsHydrated(true);
        return () => unsubHydrage();
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        if (!isSignedIn) {
            return;
        }
        if (!user && isSignedIn) {
            const fetchUser = async () => {
                try {
                    const supabase = createClient();
                    const { data } = await supabase.auth.getUser();
                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", data.user?.id)
                        .single();
                    if (profileData) {
                        const transformeduser = {
                            id: profileData.id,
                            createdAt: new Date(profileData.created_at),
                            userName: profileData.user_name,
                            email: profileData.email,
                            imageUrl: profileData.image_url,
                            isActive: profileData.is_active
                        };
                        setUser(transformeduser);
                    }
                } catch (error) {
                    console.error("Error fetching user from Supabase: ", error);
                }
            };

            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated, isSignedIn, router]);

    const handleSignOut = async () => {
        setUser(null);
        setIsSignedIn(false);
        useStore.persist.clearStorage();

        await signout();
        router.refresh();
    };

    return (
        <div className="border-b bg-slate-950 text-white w-full">
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
                    </Dialog>{" "}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setTheme("system")}
                            >
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {isSignedIn ? (
                                <>
                                    <DropdownMenuItem
                                        asChild
                                        className="hover:cursor-pointer"
                                    >
                                        <Link href="/upload">Upload Video</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        {isSignedIn
                                            ? "Signed In"
                                            : "Signed Out"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        {JSON.stringify(user)}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        className="hover:cursor-pointer"
                                        asChild
                                    >
                                        <span className="">Sign out</span>
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem
                                        className="hover:cursor-pointer"
                                        asChild
                                    >
                                        <Link href="/sign-in">Sign In</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="hover:cursor-pointer"
                                        asChild
                                    >
                                        <Link href="/sign-up">Sign Up</Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
