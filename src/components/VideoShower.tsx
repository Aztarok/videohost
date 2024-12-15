"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { VideoNavbar } from "./VideoNavbar";
import { VideoFilters } from "./VideoFilters";
import { VideoCard } from "./ui/video-card";
import Link from "next/link";

// Mock data for videos
const videos = Array(25)
    .fill(null)
    .map((_, i) => ({
        id: i + 1,
        title: `Amazing Video ${i + 1}`,
        thumbnail: `https://loremflickr.com/320/240/`, // Ensure unique thumbnail URLs
        views: `${(i + 1) * 100}K`, // Generate views based on a predictable formula
        duration: `${Math.floor((i % 10) + 1)}:${((i + 15) % 60)
            .toString()
            .padStart(2, "0")}`, // Unique but consistent durations
        creator: `Creator ${i + 1}`
    }));

export default function VideoShower() {
    return (
        <div className="bg-background">
            <VideoNavbar />
            <main className="container mx-auto">
                <VideoFilters />
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {videos.map((video) => (
                        <Link href={`/video/${video.id}`} key={video.id}>
                            <VideoCard
                                title={video.title}
                                thumbnail={video.thumbnail}
                                views={video.views}
                                duration={video.duration}
                                creator={video.creator}
                            />
                        </Link>
                    ))}
                </div>
                <div className="py-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
        </div>
    );
}
