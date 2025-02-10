"use client";

import { Moon, Search, SlidersHorizontal, Sun, User } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

type Props = { isSignedIn: boolean; handleSignOut: () => void };

const NavbarButtons = ({ isSignedIn, handleSignOut }: Props) => {
    const { setTheme } = useTheme();
    const { user } = useStore(useShallow((state) => ({ user: state.user })));
    return (
        <div className="ml-auto flex items-center space-x-4">
            <div className="relative w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search videos..." className="pl-8" />
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
                    <DropdownMenuItem onClick={() => setTheme("system")}>
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
                                {isSignedIn ? "Signed In" : "Signed Out"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
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
    );
};

export default NavbarButtons;
