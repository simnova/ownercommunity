import { useMutation, useQuery } from '@apollo/client';
import { AddPaymentMethodModal } from './add-payment-method-modal';
import {
  AddPaymentInstrumentInput,
  MemberPaymentInstrumentsDocument,
  MutationMemberAddPaymentInstrumentDocument,
  SharedPaymentContainercybersourcePublicKeyIdDocument
} from '../../../../generated';
import { Skeleton, message } from 'antd';

export interface TokenOptions {
  expirationMonth: string;
  expirationYear: string;
}

export type Callback = (err: any, token: string) => Promise<void>;

export const AddPaymentMethodModalContainer = () => {
  const { data: cybersource } = useQuery(SharedPaymentContainercybersourcePublicKeyIdDocument);

  const {
    data: paymentInstruments,
    error: paymentInstrumentsError,
    loading: paymentInstrumentsLoading
  } = useQuery(MemberPaymentInstrumentsDocument);

  const [addPaymentInstrument] = useMutation(MutationMemberAddPaymentInstrumentDocument, {
    refetchQueries: [{ query: MemberPaymentInstrumentsDocument }],
    awaitRefetchQueries: true
  });

  const handleAddPaymentMethod = async (data: AddPaymentInstrumentInput) => {
    return await addPaymentInstrument({
      variables: {
        input: data
      }
    });
  };

  if (paymentInstrumentsLoading) {
    return <Skeleton active />;
  } else if (paymentInstrumentsError) {
    message.error('There was an error loading your payment methods!');
    return null;
  }

  return (
    <AddPaymentMethodModal
      memberHasPaymentMethods={
        !!paymentInstruments?.memberPaymentInstruments?.paymentInstruments &&
        paymentInstruments?.memberPaymentInstruments?.paymentInstruments?.length > 0
      }
      cybersource={cybersource}
      onAddPaymentMethod={handleAddPaymentMethod}
    />
  );
};
