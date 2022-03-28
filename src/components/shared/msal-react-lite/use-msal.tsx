import { useContext } from 'react';
import MsalContext, { MsalContextInterface } from './msal-context';

const useMsal = (): MsalContextInterface => useContext(MsalContext);

export default useMsal;