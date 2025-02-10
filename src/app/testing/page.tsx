"use client";

import Form from "@/components/EnhancedSearch/Form";
import { VideoFilters } from "@/components/Navbar/VideoFilters";
import { useFilterVideo } from "@/services/mutations";
import { useVideoFetch } from "@/services/queries";
import { headers } from "next/headers";
import React, { useState } from "react";

const TestingPage = () => {
    const [tag, setTag] = useState<string>("");

    // Fetch the initial video list
    const { data, isLoading, isError, error } = useVideoFetch();

    // Mutation for filtering videos by tag
    const filterVideosMutation = useFilterVideo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <main className="container mx-auto">
            <VideoFilters />
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter a tag"
                    className="border p-2 rounded mr-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Filter
                </button>
            </form>
            <Form filterVideosMutation={filterVideosMutation} />
            {/* Display filtered videos or original videos */}
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error: {(error as Error).message}</p>
            ) : (
                <div className="videos-list">
                    {(filterVideosMutation.data ?? data)?.map((video) => (
                        <div
                            key={video.id}
                            className="video-card border p-4 rounded-lg shadow mb-4"
                        >
                            <h2 className="text-xl font-bold">{video.title}</h2>
                            <p className="text-gray-600">{video.description}</p>
                            <div className="text-sm text-gray-500">
                                <span>Duration: {video.duration}</span> |{" "}
                                <span>Views: {video.views}</span>
                            </div>
                            <div className="text-sm text-gray-400">
                                Tags: {video.tags?.join(", ") || "None"}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default TestingPage;
