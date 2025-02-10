import { Button } from "@/components/ui/button";
import { FaTimes } from "react-icons/fa";

interface TagProps {
    text: string;
    handleDelete?: (text: string) => void;
}
export default function Tag({ text, handleDelete }: TagProps) {
    return (
        <span className="border-1 flex items-center gap-x-1 rounded-2xl bg-gray-700 text-white px-3 py-2">
            <span className="">{text}</span>
            {handleDelete && (
                <Button
                    onClick={() => handleDelete(text)}
                    type="button"
                    aria-label="Close"
                    variant="ghost"
                    size="sm"
                    className="px-1"
                >
                    <FaTimes className="h-4" />
                </Button>
            )}
        </span>
    );
}
