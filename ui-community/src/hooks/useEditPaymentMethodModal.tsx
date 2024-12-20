import { create } from 'zustand';
import { PaymentInstrument } from '../generated';

interface EditPaymentMethodModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  paymentInstrument?: PaymentInstrument;
  setPaymentInstrument: (paymentInstrument: PaymentInstrument) => void;
}

export const useEditPaymentMethodModal = create<EditPaymentMethodModalStore>((set: any) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),

  paymentInstrument: undefined,
  setPaymentInstrument: (paymentInstrument: PaymentInstrument) => set({ paymentInstrument })
}));

