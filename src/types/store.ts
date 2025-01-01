import { fileSlice } from "@/store/file-slice";
import { paginationSlice } from "@/store/pagination-slice";
import { userSlice } from "@/store/user-slice";
import { videoSlice } from "@/store/video-slice";

export type Store = userSlice & videoSlice & paginationSlice & fileSlice;
