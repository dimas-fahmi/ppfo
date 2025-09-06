import { create } from "zustand";

export interface SidebarStore {
  open: boolean;
  setOpen: (new_value: boolean) => void;
  toggleOpen: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  setOpen: (new_value: boolean) => set(() => ({ open: new_value })),
  toggleOpen: () => set((state: SidebarStore) => ({ open: !state.open })),
}));
