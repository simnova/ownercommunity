import { useMutation, useQuery } from '@apollo/client';
import {
  MemberDeletePaymentInstrumentDocument,
  MemberPaymentInstrumentsDocument,
  MemberSetDefaultPaymentInstrumentDocument
} from '../../../../generated';
import Wallet from './wallet';
import { Empty, Skeleton, message } from 'antd';

interface WalletContainerProps {
  data: any;
}

export const WalletContainer: React.FC<WalletContainerProps> = () => {
  // TODO: Add env var into vite env

  const {
    data: paymentInstruments,
    error: paymentInstrumentsError,
    loading: paymentInstrumentsLoading
  } = useQuery(MemberPaymentInstrumentsDocument);

  /* SET DEFAULT PAYMENT METHOD */
  const [setDefaultPaymentInstrument] = useMutation(MemberSetDefaultPaymentInstrumentDocument, {
    update(cache, _, { variables }) {
      const defaultPaymentMethodId = variables?.input;
      const paymentInstruments = cache.readQuery({
        query: MemberPaymentInstrumentsDocument
      })?.memberPaymentInstruments;

      if (defaultPaymentMethodId && paymentInstruments && paymentInstruments?.paymentInstruments) {
        cache.writeQuery({
          query: MemberPaymentInstrumentsDocument,
          data: {
            memberPaymentInstruments: {
              ...paymentInstruments,
              paymentInstruments: paymentInstruments.paymentInstruments.map((paymentInstrument) =>
                paymentInstrument?.paymentInstrumentId === defaultPaymentMethodId
                  ? { ...paymentInstrument, isDefault: true }
                  : { ...paymentInstrument, isDefault: false }
              )
            }
          }
        });
      }
    }
  });

  const handleSetDefaultPaymentMethod = async (paymentInstrumentId: string) => {
    try {
      await setDefaultPaymentInstrument({
        variables: {
          input: paymentInstrumentId
        }
      });
      message.success('Default payment method set to default successfully');
    } catch (error) {
      console.log('Error setting payment method to default : ', JSON.stringify(error));
    }
  };

  /* DELETE PAYMENT METHOD */
  const [deletePaymentInstrument] = useMutation(MemberDeletePaymentInstrumentDocument, {
    update(cache, _, { variables }) {
      const deletedPaymentInstrumentId = variables?.input;
      const paymentInstruments = cache.readQuery({
        query: MemberPaymentInstrumentsDocument
      })?.memberPaymentInstruments;

      if (deletedPaymentInstrumentId && paymentInstruments && paymentInstruments?.paymentInstruments) {
        cache.writeQuery({
          query: MemberPaymentInstrumentsDocument,
          data: {
            memberPaymentInstruments: {
              ...paymentInstruments,
              paymentInstruments: paymentInstruments.paymentInstruments.filter(
                (paymentInstrument) => paymentInstrument?.paymentInstrumentId !== deletedPaymentInstrumentId
              )
            }
          }
        });
      }
    }
  });

  const handleDeletePaymentMethod = async (paymentInstrumentId: string) => {
    try {
      await deletePaymentInstrument({
        variables: {
          input: paymentInstrumentId
        }
      });
      message.success('Payment method deleted successfully');
    } catch (error) {
      message.error('Error deleting a payment method.');
      console.log('Error deleting a payment method.', error);
    }
  };

  if (paymentInstrumentsLoading) {
    return <Skeleton active />;
  }

  return (
    <>
      {paymentInstrumentsError || !paymentInstruments || !paymentInstruments?.memberPaymentInstruments ? (
        <Empty />
      ) : (
        <Wallet
          paymentInstrumentsResult={paymentInstruments?.memberPaymentInstruments}
          onSetDefaultPaymentMethod={handleSetDefaultPaymentMethod}
          onDeletePaymentMethod={handleDeletePaymentMethod}
        />
      )}
    </>
  );
};
