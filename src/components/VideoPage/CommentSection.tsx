"use client";

import { User } from "lucide-react";
import React, { useState } from "react";

type Comment = {
    id: number;
    author: string;
    content: string;
    timestamp: string;
};

const CommentSection = () => {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "John Doe",
            content: "Great video! Very informative.",
            timestamp: "2 hours ago"
        },
        {
            id: 2,
            author: "Jane Smith",
            content: "Thanks for sharing this!",
            timestamp: "1 hour ago"
        }
    ]);
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: comments.length + 1,
            author: "Current User",
            content: newComment,
            timestamp: "Just now"
        };

        setComments([comment, ...comments]);
        setNewComment("");
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a comment..."
                    rows={3}
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Comment
                </button>
            </form>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <div className="flex-shrink-0">
                            <User className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                    {comment.author}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {comment.timestamp}
                                </span>
                            </div>
                            <p className="mt-1 text-gray-200">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
