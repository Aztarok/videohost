import { videos } from "@/testing/constants";
import { Store } from "@/types/store";
import { Video } from "@/types/video";
import { StateCreator } from 'zustand';

export type PaginationState = {
    currentPage: number;
    itemsPerPage: number;
    indexOfLastItem: number;
    indexOfFirstItem: number;
    currentItem: Video[];
};

export type PaginationActions = {
    setCurrentPage: (page: number) => void;
    calculateIndices: () => void;
}

// export const usePaginationSlice = create<PaginationState>((set) => ({
//     currentPage: 1,
//     setCurrentPage: (page) => set({ currentPage: page }),
// }));

export type paginationSlice = PaginationState & PaginationActions;

const initialNumber = 15

const initialState: PaginationState = {
    currentPage: 1,
    itemsPerPage: initialNumber,
    indexOfLastItem: 2,
    indexOfFirstItem: 1,
    currentItem: videos.slice(0, initialNumber),
};

export const createPaginationSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    paginationSlice> = (set) => ({
        ...initialState,
        setCurrentPage: (page: number) => set((state) => {
            state.currentPage = page;
            state.indexOfLastItem = page * state.itemsPerPage;
            state.indexOfFirstItem = state.indexOfLastItem - state.itemsPerPage;
            state.currentItem = videos.slice(state.indexOfFirstItem, state.indexOfLastItem);
        }),
        calculateIndices: () =>
            set((state) => {
                state.indexOfLastItem = state.currentPage * state.itemsPerPage;
                state.indexOfFirstItem = state.indexOfLastItem - state.itemsPerPage;
            })
    });