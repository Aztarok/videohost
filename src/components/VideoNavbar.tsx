"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Play, Search, User } from "lucide-react";
import Link from "next/link";

export function VideoNavbar() {
    return (
        <div className="border-b">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
