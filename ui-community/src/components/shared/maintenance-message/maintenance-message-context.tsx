import { createContext } from 'react';

export interface MaintenanceMessage {}

export interface MaintenanceMessageInterface {
  isMaintenance: boolean | undefined;
  isImpending: boolean | undefined;
  impendingMessage?: string;
  maintenanceMessage?: string;
  impendingStartTimestamp: string;
  maintenanceStartTimestamp: string;
  maintenanceEndTimestamp: string;
}

const initialContext = {
  isMaintenance: undefined,
  isImpending: undefined,
  impendingMessage: '',
  maintenanceMessage: '',
  impendingStartTimestamp: '',
  maintenanceStartTimestamp: '',
  maintenanceEndTimestamp: ''
};

const MaintenanceMessageContext = createContext<MaintenanceMessageInterface>(initialContext);

export default MaintenanceMessageContext;
