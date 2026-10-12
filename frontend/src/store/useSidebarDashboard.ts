import { create } from "zustand";

export type DashboardToogleState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useDashboardToogle = create<DashboardToogleState>()((set) => ({
  open: true,
  setOpen: (open) =>
    set({
      open,
    }),
}));
