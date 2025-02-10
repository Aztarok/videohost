"use client";

import { useState } from "react";
import CommaSeparatedInput from "./CommaSeparatedInput";
import SubmitButton from "./SubmitButton";
import { UseMutationResult } from "@tanstack/react-query";
import { Video } from "@/types/video";

interface FormProps {
    filterVideosMutation: UseMutationResult<Video[], Error, string[]>;
}

const Form = ({ filterVideosMutation }: FormProps) => {
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        filterVideosMutation.mutate(tags, {
            onSuccess: (filteredVideos) => {
                console.log("Filtered videos:", filteredVideos);
            },
            onError: (error) => {
                console.error("Error filtering videos:", error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} method="post">
            <CommaSeparatedInput tags={tags} setTags={setTags} />
            <SubmitButton text="Submit" />
        </form>
    );
};

export default Form;
