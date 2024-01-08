import { createContext } from 'react'

export interface MaintenanceMessage {

}

export interface MaintenanceMessageInterface {
  isMaintenance: boolean|undefined,
  isImpending: boolean|undefined,
  maintainanceMessage: string|undefined,
  maintainanceMessageImpending: string|undefined,
}


const initialContext = {
  isMaintenance: undefined,
  isImpending: undefined,
  maintainanceMessage: undefined,
  maintainanceMessageImpending: undefined,
}

const MaintenanceMessageContext = createContext<MaintenanceMessageInterface>(initialContext)

export default MaintenanceMessageContext
