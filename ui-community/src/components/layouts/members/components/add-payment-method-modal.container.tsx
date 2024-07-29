import { useMutation, useQuery } from '@apollo/client';
import AddPaymentMethodModal from './add-payment-method-modal';
import {
  AddPaymentInstrumentInput,
  MemberPaymentInstrumentsDocument,
  MutationMemberAddPaymentInstrumentDocument,
  SharedPaymentContainercybersourcePublicKeyIdDocument
} from '../../../../generated';

export interface TokenOptions {
  expirationMonth: string;
  expirationYear: string;
}

export type Callback = (err: any, token: string) => Promise<void>;

const AddPaymentMethodModalContainer = () => {
  const { data: cybersource } = useQuery(SharedPaymentContainercybersourcePublicKeyIdDocument);

  const [addPaymentInstrument] = useMutation(MutationMemberAddPaymentInstrumentDocument, {
    refetchQueries: [{ query: MemberPaymentInstrumentsDocument }],
    awaitRefetchQueries: true
  });

  const handleAddPaymentMethod = async (data: AddPaymentInstrumentInput) => {
    try {
      const response = await addPaymentInstrument({
        variables: {
          input: data
        }
      });
      return response;
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return <AddPaymentMethodModal cybersource={cybersource} onAddPaymentMethod={handleAddPaymentMethod} />;
};

export default AddPaymentMethodModalContainer;
