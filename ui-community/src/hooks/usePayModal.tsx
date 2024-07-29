import { create } from 'zustand';

interface PayModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePayModal = create<PayModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default usePayModal;
