"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import Loading from "./Loading";
import { Button } from "../ui/button";

interface DeleteDealButtonProps {
    text: string;
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function SubmitButton({
    text,
    handleClick
}: DeleteDealButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="default"
            type="submit"
            className="mt-2 rounded-full w-full bg-teal-500 hover:bg-teal-400 transition-colors text-gray-900 disabled:bg-teal-600/30 py-7 text-2xl"
            onClick={handleClick}
            size="lg"
        >
            {pending ? (
                <span className=" text-black">
                    <Loading />
                </span>
            ) : (
                text
            )}
        </Button>
    );
}
