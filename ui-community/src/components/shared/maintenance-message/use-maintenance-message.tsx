import { useContext } from 'react'
import MaintenanceMessageContext, { MaintenanceMessageInterface } from './maintenance-message-context'

const useMaintenanceMessage = (): MaintenanceMessageInterface =>
  useContext(MaintenanceMessageContext)

export default useMaintenanceMessage
