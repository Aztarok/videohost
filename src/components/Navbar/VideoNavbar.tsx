"use client";

import { signout } from "@/app/(auth)/actions";
import { useStore } from "@/store/store";
import { createClient } from "@/utils/supabase/client";
import { Play } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import NavbarButtons from "./NavbarButton";

export function VideoNavbar({ serverSignedIn }: { serverSignedIn: boolean }) {
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

    useEffect(() => {
        const unsubHydrage = useStore.persist.onHydrate(() =>
            setIsHydrated(true)
        );
        if (useStore.persist.hasHydrated()) setIsHydrated(true);
        return () => unsubHydrage();
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        if (serverSignedIn || isSignedIn) {
        } else {
            handleSignOut();
            return;
        }
        if ((!user && isSignedIn) || (serverSignedIn && !user)) {
            const fetchUser = async () => {
                try {
                    const supabase = createClient();
                    const { data } = await supabase.auth.getUser();
                    if (!data.user) {
                        return;
                    }
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
                        setIsSignedIn(true);
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
                <NavbarButtons
                    isSignedIn={isSignedIn}
                    handleSignOut={handleSignOut}
                />
            </div>
        </div>
    );
}
