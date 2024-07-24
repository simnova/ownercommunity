import { useMutation, useQuery } from '@apollo/client';
import AddPaymentMethodModal from './add-payment-method-modal';
import {
  AddPaymentInstrumentInput,
  MutationMemberAddPaymentInstrumentDocument,
  SharedPaymentContainercybersourcePublicKeyIdDocument
} from '../../../../generated';
import { message } from 'antd';

export interface TokenOptions {
  expirationMonth: string;
  expirationYear: string;
}

export type Callback = (err: any, token: string) => void;

const AddPaymentMethodModalContainer = () => {
  const { data: cybersource } = useQuery(SharedPaymentContainercybersourcePublicKeyIdDocument);

  const [addPaymentInstrument] = useMutation(MutationMemberAddPaymentInstrumentDocument);

  const handleAddPaymentMethod = async (data: AddPaymentInstrumentInput) => {
    try {
      const response = await addPaymentInstrument({
        variables: {
          input: data
        }
      });
      message.success(response.data?.memberAddPaymentInstrument.status.success);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return <AddPaymentMethodModal cybersource={cybersource} onAddPaymentMethod={handleAddPaymentMethod} />;
};

export default AddPaymentMethodModalContainer;
