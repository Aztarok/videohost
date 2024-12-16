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

type Video = {
    id: number;
    title: string;
    thumbnail: string;
    views: string;
    duration: string;
    creator: string;
};

export default function VideoShower({ videoArray }: { videoArray: Video[] }) {
    return (
        <div className="bg-background">
            <VideoNavbar />
            <main className="container mx-auto">
                <VideoFilters />
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {videoArray.map((video) => (
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
