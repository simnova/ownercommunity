import { create } from 'zustand';

interface AddPaymentMethodModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddPaymentMethodModal = create<AddPaymentMethodModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useAddPaymentMethodModal;
