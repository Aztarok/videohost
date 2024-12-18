import { Store } from "@/types/store";
import { StateCreator } from 'zustand';

export type PaginationState = {
    currentPage: number;
    itemsPerPage: number;
    indexOfLastItem: number;
    indexOfFirstItem: number;
    currentItem: number;
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

const initialState: PaginationState = {
    currentPage: 1,
    itemsPerPage: 2,
    indexOfLastItem: 2,
    indexOfFirstItem: 1,
    currentItem: 1
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
            state.currentItem = state.indexOfLastItem;
        }),
        calculateIndices: () =>
            set((state) => {
                state.indexOfLastItem = state.currentPage * state.itemsPerPage;
                state.indexOfFirstItem = state.indexOfLastItem - state.itemsPerPage;
            })
    });