"use client";

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const LikeButtons = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userLiked, setUserLiked] = useState<'like' | 'dislike' | null>(null);

    const handleLike = () => {
        if (userLiked === 'like') {
            setLikes(prev => prev - 1);
            setUserLiked(null);
        } else {
            if (userLiked === 'dislike') {
                setDislikes(prev => prev - 1);
            }
            setLikes(prev => prev + 1);
            setUserLiked('like');
        }
    };

    const handleDislike = () => {
        if (userLiked === 'dislike') {
            setDislikes(prev => prev - 1);
            setUserLiked(null);
        } else {
            if (userLiked === 'like') {
                setLikes(prev => prev - 1);
            }
            setDislikes(prev => prev + 1);
            setUserLiked('dislike');
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-4 py-2 rounded-full ${userLiked === 'like' ? 'bg-blue-100 text-blue-600' : 'hover:bg-green-500'
                    }`}
            >
                <ThumbsUp className="w-5 h-5" />
                <span>{likes}</span>
            </button>
            <button
                onClick={handleDislike}
                className={`flex items-center gap-1 px-4 py-2 rounded-full ${userLiked === 'dislike' ? 'bg-blue-100 text-blue-600' : 'hover:bg-red-500'
                    }`}
            >
                <ThumbsDown className="w-5 h-5" />
                <span>{dislikes}</span>
            </button>
        </div>
    );
};

export default LikeButtons;