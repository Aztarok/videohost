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
    itemsPerPage: 1,
    indexOfLastItem: 0,
    indexOfFirstItem: 0,
    currentItem: 0
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
        }),
        calculateIndices: () =>
            set((state) => {
                state.indexOfLastItem = state.currentPage * state.itemsPerPage;
                state.indexOfFirstItem = state.indexOfLastItem - state.itemsPerPage;
            })
    });