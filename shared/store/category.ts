import { create } from "zustand";

interface IState {
  currentId: number;
  setCurrentId: (currentId: number) => void;
}

export const useCategoryStore = create<IState>()((set) => ({
  currentId: 1,
  setCurrentId: (currentId: number) => set({ currentId }),
}));
