"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildSeed } from "@/lib/seed";
import type {
  Booking,
  Customer,
  Dish,
  Expense,
  FoodCategory,
  FoodPackage,
  HallManager,
  Payment,
  Quotation,
  SubscriptionPayment,
  Venue,
} from "@/lib/types";

export interface Data {
  bookings: Booking[];
  customers: Customer[];
  venues: Venue[];
  payments: Payment[];
  dishes: Dish[];
  foodPackages: FoodPackage[];
  foodCategories: FoodCategory[];
  expenses: Expense[];
  quotations: Quotation[];
  hallManagers: HallManager[];
  subscriptionPayments: SubscriptionPayment[];
}

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface ModalState {
  open: boolean;
  title: string;
  body: React.ReactNode;
  confirmText: string;
  showConfirm: boolean;
  onConfirm: () => void;
}

interface UseStore extends Data {
  setData: <K extends keyof Data>(key: K, value: Data[K]) => void;

  modal: ModalState;
  openModal: (m: Partial<Omit<ModalState, "open">>) => void;
  closeModal: () => void;

  toasts: ToastItem[];
  toast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

let toastSeed = 0;
const genId = (): string =>
  Date.now().toString(36) +
  (toastSeed++).toString(36) +
  Math.random().toString(36).substring(2, 7);

export const useStore = create<UseStore>()(
  persist(
    (set) => ({
      ...buildSeed(),
      setData: (key, value) =>
        set({ [key]: value } as Pick<UseStore, typeof key>),

      modal: {
        open: false,
        title: "Modal",
        body: null,
        confirmText: "Confirm",
        showConfirm: true,
        onConfirm: () => {},
      },
      openModal: (m) =>
        set({
          modal: {
            open: true,
            title: "Modal",
            body: null,
            confirmText: "Confirm",
            showConfirm: true,
            onConfirm: closeModalRef,
            ...m,
          },
        }),
      closeModal: () => set((s) => ({ modal: { ...s.modal, open: false } })),

      toasts: [],
      toast: (message, type = "success") => {
        const id = genId();
        set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
        setTimeout(() => useStore.getState().dismissToast(id), 3500);
      },
      dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "hall-mgmt-data",
      partialize: (s) => ({
        bookings: s.bookings,
        customers: s.customers,
        venues: s.venues,
        payments: s.payments,
        dishes: s.dishes,
        foodPackages: s.foodPackages,
        foodCategories: s.foodCategories,
        expenses: s.expenses,
        quotations: s.quotations,
        hallManagers: s.hallManagers,
        subscriptionPayments: s.subscriptionPayments,
      }),
    },
  ),
);

function closeModalRef() {
  useStore.getState().closeModal();
}
