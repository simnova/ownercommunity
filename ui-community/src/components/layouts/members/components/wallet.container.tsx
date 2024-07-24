import { useQuery } from '@apollo/client';
import { MemberPaymentInstrumentsDocument } from '../../../../generated';
import Wallet from './wallet';
import { Empty } from 'antd';

interface WalletContainerProps {
  data: any;
}

export const WalletContainer: React.FC<WalletContainerProps> = () => {
  // TODO: Add env var into vite env
  //const ownerCommunityUrl = import.meta.env.VITE_SELF_HOSTED_CYBERSOURCE_URL ?? 'missing-owner-community-url';

  const {
    data: paymentInstruments,
    error: paymentInstrumentsError,
    loading: paymentInstrumentsLoading
  } = useQuery(MemberPaymentInstrumentsDocument);

  return (
    <>
      {paymentInstrumentsError || !paymentInstruments || !paymentInstruments?.memberPaymentInstruments ? (
        <Empty />
      ) : (
        <Wallet paymentInstrumentsResult={paymentInstruments?.memberPaymentInstruments} />
      )}
    </>
  );
};
