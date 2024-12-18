"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./card";

interface VideoCardProps {
    title: string;
    thumbnail: string;
    views: number;
    duration: number;
    artists: string;
}

export function VideoCard({
    title,
    thumbnail,
    views,
    duration,
    artists
}: VideoCardProps) {
    return (
        <Card className="group cursor-pointer h-[300px] overflow-hidden transition-all hover:scale-105">
            <CardContent className="p-0 flex flex-col flex-1">
                <div className="relative aspect-video">
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover transition-all"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                        {Math.floor(duration / 60)} : {duration % 60 < 10 ? "0" : ""}{duration % 60}
                    </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                    <h3 className="line-clamp-3 font-semibold min-h-[4.5rem]">{title}</h3>
                    <div className="flex flex-col">
                        <p className="mt-1 text-sm text-muted-foreground">
                            {artists}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {views} views
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
