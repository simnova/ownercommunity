import { useMutation } from '@apollo/client';
import {
  MemberPaymentInstrumentsDocument,
  MutationUpdatePaymentInstrumentDocument,
  UpdatePaymentInstrumentInput
} from '../../../../generated';

import { EditPaymentMethodModal } from './edit-payment-method-modal';

export const EditPaymentMethodModalContianer = () => {
  const [updatePaymentInstrument] = useMutation(MutationUpdatePaymentInstrumentDocument, {
    refetchQueries: [{ query: MemberPaymentInstrumentsDocument }],
    awaitRefetchQueries: true
  });

  const handleUpdatePaymentInstrument = async (data: UpdatePaymentInstrumentInput) => {
    return await updatePaymentInstrument({
      variables: {
        input: data
      }
    });
  };

  return <EditPaymentMethodModal onUpdate={handleUpdatePaymentInstrument} />;
};
