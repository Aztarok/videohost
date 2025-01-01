import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import FileManager from "./components/FileManager";

const UploadPage = () => {
    return (
        <>
            <div className="flex-1 flex flex-col items-center bg-blue-950">
                <MaxWidthWrapper className="flex-1 w-full">
                    <FileManager />
                </MaxWidthWrapper>
            </div>
        </>
    );
};

export default UploadPage;
