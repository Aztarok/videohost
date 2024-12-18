import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "@/store/user-slice";
import { Store } from "@/types/store";
import { createPaginationSlice } from "./pagination-slice";
import { createVideoSlice } from "./video-slice";

export const useStore = create<Store>()(
    immer((...a) => ({
        ...createUserSlice(...a),
        ...createVideoSlice(...a),
        ...createPaginationSlice(...a),
    }))
)