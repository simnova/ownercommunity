import { create } from 'zustand';

interface RefundModalStore {
  isOpen: boolean;
  id: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useRefundModal = create<RefundModalStore>((set: any) => ({
  isOpen: false,
  id: null,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false })
}));

export default useRefundModal;
