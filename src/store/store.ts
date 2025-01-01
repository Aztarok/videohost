import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "@/store/user-slice";
import { Store } from "@/types/store";
import { createFileSlice } from "./file-slice";
import { createPaginationSlice } from "./pagination-slice";
import { createVideoSlice } from "./video-slice";

export const useStore = create<Store>()(
    persist(
        immer((...a) => ({
            ...createUserSlice(...a),
            ...createVideoSlice(...a),
            ...createPaginationSlice(...a),
            ...createFileSlice(...a)
        })),
        {
            name: "zustand-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                Videos: state.Videos,
                isSignedIn: state.isSignedIn
            })
        }
    )
);
