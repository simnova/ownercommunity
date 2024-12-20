import { useContext } from 'react'
import { MaintenanceMessageContext, MaintenanceMessageInterface } from './maintenance-message-context'

export const useMaintenanceMessage = (): MaintenanceMessageInterface =>
  useContext(MaintenanceMessageContext)

