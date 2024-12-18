import { Store } from "@/types/store";
import { StateCreator } from "zustand";

export type UserState = {
    id: number;
    userName: string;
    fullName: string;
    email: string;
};

export type UserActions = {
    setUserName: (userName: string) => void;
};

export type userSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    userSlice
> = (set) => ({
    id: 0,
    userName: "",
    fullName: "",
    email: "",
    setUserName: (userName: string) =>
        set((state) => {
            state.userName = userName;
        })
});
