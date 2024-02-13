import { createContext } from 'react'

export interface MaintenanceMessage {

}

export interface MaintenanceMessageInterface {
  isMaintenance: boolean|undefined,
  isImpending: boolean|undefined,
}

const initialContext = {
  isMaintenance: undefined,
  isImpending: undefined,
}

const MaintenanceMessageContext = createContext<MaintenanceMessageInterface>(initialContext)

export default MaintenanceMessageContext
