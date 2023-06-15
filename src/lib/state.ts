import { create } from "zustand";

type State = {
  apples: number;
  increaseApples: () => void;
};

export const useStore = create<State>((set) => ({
  apples: 0,
  increaseApples: () => set((state) => ({ apples: state.apples + 1 })),
}));
