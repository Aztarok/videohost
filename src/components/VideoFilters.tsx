"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export function VideoFilters() {
    return (
        <div className="flex gap-4 py-4">
            <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="trending">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="week">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
