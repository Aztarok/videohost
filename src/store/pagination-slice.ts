import { videos } from "@/testing/constants";
import { Store } from "@/types/store";
import { Video } from "@/types/video";
import { StateCreator } from "zustand";

export type PaginationState = {
    currentPage: number;
    itemsPerPage: number;
    indexOfLastItem: number;
    indexOfFirstItem: number;
    currentItem: Video[] | undefined;
};

export type PaginationActions = {
    setCurrentPage: (page: number) => void;
    setLastItem: (lastItem: number) => void;
    setFirstItem: (firstItem: number) => void;
    calculateIndices: () => void;
    setCurrentItem: (item: Video[]) => void; // Add setCurrentItem here
};

export type paginationSlice = PaginationState & PaginationActions;

const initialNumber = 15;

const initialState: PaginationState = {
    currentPage: 1,
    itemsPerPage: initialNumber,
    indexOfLastItem: initialNumber,
    indexOfFirstItem: 0,
    currentItem: videos.slice(0, initialNumber)
};

export const createPaginationSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    paginationSlice
> = (set) => ({
    ...initialState,
    setCurrentItem: (item: Video[]) =>
        set((state) => {
            state.currentItem = item; // This will set the currentItem
        }),
    setCurrentPage: (page: number) =>
        set((state) => {
            state.currentPage = page;
            state.indexOfLastItem = page * state.itemsPerPage;
            state.indexOfFirstItem = state.indexOfLastItem - state.itemsPerPage;
            state.currentItem = state.Videos.slice(
                state.indexOfFirstItem,
                state.indexOfLastItem
            );
        }),
    calculateIndices: () =>
        set((state) => {
            state.indexOfLastItem = state.currentPage * state.itemsPerPage;
            state.indexOfFirstItem = state.indexOfLastItem - state.itemsPerPage;
        }),
    setLastItem: (lastItem: number) =>
        set((state) => {
            state.indexOfLastItem = lastItem;
        }),
    setFirstItem: (firstItem: number) =>
        set((state) => {
            state.indexOfFirstItem = firstItem;
        })
});
