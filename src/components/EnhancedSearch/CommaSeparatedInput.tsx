"use client";

import { useState } from "react";
import TagsList from "./TagsList";

type CommaSeparatedInputProps = {
    tags: string[];
    setTags: (tags: string[]) => void;
};

const CommaSeparatedInput = ({ tags, setTags }: CommaSeparatedInputProps) => {
    const [tagInput, setTagInput] = useState("");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = e.target.value.trim().toLowerCase();
        setTagInput(currentInput);
        const lastLetter = currentInput.slice(-1);
        if (lastLetter === ",") {
            const tag = currentInput.slice(0, -1);
            if (tags.indexOf(tag) === -1) {
                setTags([...tags, tag]);
            }
            setTagInput("");
        }
    };

    const handleDelete = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <div>
            <label
                htmlFor="tags"
                className="font-extralight text-2xl block text-white"
            >
                Tags
            </label>
            <input
                type="text"
                name="tags"
                id="tags"
                value={tagInput}
                className="bg-white w-full text-gray-900 border-1 border-blue-600 rounded-md focus-visible:outline-none bg-transparent text-base p-2 md:text-xl focus-visible:ring-offset-4 focus-visible:ring-2  focus-visible:ring-offset-teal-500"
                onChange={handleInputChange}
            />
            {/* {tags.map((tag) => (
                <input type="hidden" name="tag" value={tag} key={tag} />
            ))} */}
            <div className="mt-4 mb-8">
                <TagsList tags={tags} handleDelete={handleDelete} />
            </div>
        </div>
    );
};

export default CommaSeparatedInput;
