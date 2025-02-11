"use client";

import { signout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/store/store";
import { createClient } from "@/utils/supabase/client";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function AuthMenu() {
    const { user, setUser, isSignedIn, setIsSignedIn } = useStore(
        useShallow((state) => ({
            user: state.user,
            setUser: state.setUser,
            isSignedIn: state.isSignedIn,
            setIsSignedIn: state.setIsSignedIn
        }))
    );
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const unsubHydrate = useStore.persist.onHydrate(() =>
            setIsHydrated(true)
        );
        if (useStore.persist.hasHydrated()) setIsHydrated(true);
        return () => unsubHydrate();
    }, []);

    useEffect(() => {
        if (!isHydrated || (!isSignedIn && !user)) {
            handleSignOut();
            return;
        }

        if (!user && isSignedIn) {
            const fetchUser = async () => {
                try {
                    const supabase = createClient();
                    const { data } = await supabase.auth.getUser();
                    if (!data.user) return;

                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", data.user.id)
                        .single();

                    if (profileData) {
                        const transformedUser = {
                            id: profileData.id,
                            createdAt: new Date(profileData.created_at),
                            userName: profileData.user_name,
                            email: profileData.email,
                            imageUrl: profileData.image_url,
                            isActive: profileData.is_active
                        };
                        setIsSignedIn(true);
                        setUser(transformedUser);
                    }
                } catch (error) {
                    console.error("Error fetching user from Supabase:", error);
                }
            };

            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated, isSignedIn, user]);

    const handleSignOut = async () => {
        setUser(null);
        setIsSignedIn(false);
        useStore.persist.clearStorage();
        await signout();
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {isSignedIn ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/upload">Upload Video</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}>
                            Sign Out
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/sign-in">Sign In</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/sign-up">Sign Up</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
