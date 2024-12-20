import { create } from 'zustand';

interface AddPaymentMethodModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddPaymentMethodModal = create<AddPaymentMethodModalStore>((set: any) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
