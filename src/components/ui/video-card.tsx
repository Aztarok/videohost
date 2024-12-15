"use client";

import { Play } from "lucide-react";
import { Card, CardContent } from "./card";
import Image from "next/image";

interface VideoCardProps {
    title: string;
    thumbnail: string;
    views: string;
    duration: string;
    creator: string;
}

export function VideoCard({
    title,
    thumbnail,
    views,
    duration,
    creator
}: VideoCardProps) {
    return (
        <Card className="group cursor-pointer overflow-hidden transition-all hover:scale-105">
            <CardContent className="p-0">
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
                        {duration}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {creator}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {views} views
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
