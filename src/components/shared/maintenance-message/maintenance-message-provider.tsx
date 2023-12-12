import axios from 'axios';
import dayjs from 'dayjs';
import React, { FC, ReactNode, useEffect, useState } from 'react'; // useState
import { useFeatureFlags } from '../feature-flag-react-lite';
import MaintenanceMessageContext from './maintenance-message-context';

export interface MaintenanceMessageConfig {}
export type MaintenanceMessageProps = {
  children: ReactNode;
};

const MaintenanceMessageProvider: FC<MaintenanceMessageProps> = (props: MaintenanceMessageProps): JSX.Element => {
  const [isImpending, setIsImpending] = useState<boolean | undefined>(undefined);
  const [isMaintenance, setIsMaintenance] = useState<boolean | undefined>(undefined);
  const [maintainanceMessage, setMaintainanceMessage] = useState<string | undefined>(undefined);
  const [maintainanceMessageImpending, setMaintainanceMessageImpending] = useState<string | undefined>(undefined);
  const timerInstance = React.useRef(undefined);
  const { GetFeatureFlagByName } = useFeatureFlags();

  let impendingMaintenanceStartTimestamp = GetFeatureFlagByName('MAINTENANCE_TIMESTAMP_IMPENDING_UIPORTAL');
  let maintenanceStartTimestamp = GetFeatureFlagByName('MAINTENANCE_START_TIMESTAMP_UIPORTAL');
  let maintenanceEndTimestamp = GetFeatureFlagByName('MAINTENANCE_END_TIMESTAMP_UIPORTAL');
  let upcomingMaintenance = GetFeatureFlagByName('MAINTENANCE_UPCOMING_UIPORTAL');
  let maintenanceMessage = GetFeatureFlagByName('MAINTENANCE_MSG_SYSTEM_UIPORTAL');
  let maintenanceMessageImpending = GetFeatureFlagByName('MAINTENANCE_MSG_IMPENDING_UIPORTAL');
  let try_val=GetFeatureFlagByName('TRY')
  console.log("Checking feature falg")
  console.log(impendingMaintenanceStartTimestamp)
  console.log(maintenanceStartTimestamp)
  console.log(maintenanceEndTimestamp)
  console.log(upcomingMaintenance)
  console.log(maintenanceMessage)
  console.log(maintenanceMessageImpending)
  console.log("Printing try value",try_val)
  useEffect(() => {
    const setIntervalImmediately = async (func: any, interval: number, params: any) => {
      await func(params);
      return setInterval(func, interval, params);
    };

    const getMaintenanceMessageStatus = async (params: any) => {
      //If the GetFeatureFlag hasn't resolved it will be empty string
      if (params.upcomingMaintenance === '') return;

      if (params.upcomingMaintenance !== 'true') {
        setIsMaintenance(false);
        setIsImpending(false);
        return;
      }

      axios({
        url: import.meta.env.VITE_FUNCTION_ENDPOINT,
        method: 'post',
        data: {
          query: `
          query {serverDate}
          `
        }
      })
        .then((result: any) => {
          const serverDate = result?.data?.data?.serverDate;
          const serverTime = dayjs(serverDate);
          if (
            serverTime > dayjs(params.impendingMaintenanceStartTimestamp) &&
            serverTime < dayjs(params.maintenanceStartTimestamp)
          ) {
            setIsMaintenance(false);
            setIsImpending(true);
            setMaintainanceMessageImpending(params.maintenanceMessageImpending);
          } else if (
            serverTime > dayjs(params.maintenanceStartTimestamp) &&
            serverTime < dayjs(params.maintenanceEndTimestamp)
          ) {
            setIsMaintenance(true);
            setIsImpending(false);
            setMaintainanceMessage(params.maintenanceMessage);
            return;
          } else if (serverTime > dayjs(params.maintenanceEndTimestamp)) {
            setIsMaintenance(false);
            setIsImpending(false);
            return;
          }
        })
        .catch((exception: any) => {
          console.log('exception: ', exception);
        });
    };

    const intervalParams = {
      maintenanceStartTimestamp: maintenanceStartTimestamp,
      maintenanceEndTimestamp: maintenanceEndTimestamp,
      impendingMaintenanceStartTimestamp: impendingMaintenanceStartTimestamp,
      upcomingMaintenance: upcomingMaintenance,
      maintenanceMessage: maintenanceMessage,
      maintenanceMessageImpending: maintenanceMessageImpending
    };

    if (timerInstance.current) {
      //cancel timer
      clearInterval(timerInstance.current);
    }
    setIntervalImmediately(getMaintenanceMessageStatus, 1 * 60 * 1000, intervalParams) // 1 minute
      .then((interval: any) => {
        timerInstance.current = interval;
      })
      .catch((exception: any) => {
        console.log(exception);
      });
  }, [
    impendingMaintenanceStartTimestamp,
    maintenanceEndTimestamp,
    maintenanceStartTimestamp,
    upcomingMaintenance,

    maintenanceMessage,
    maintenanceMessageImpending
  ]);
  console.log('Printing maintainance message status');
  console.log(isImpending);
  console.log(isMaintenance);
  console.log(impendingMaintenanceStartTimestamp);
  console.log(maintenanceEndTimestamp);
  console.log(maintenanceStartTimestamp);
  console.log(upcomingMaintenance);
  console.log(maintenanceMessage);
  console.log(maintenanceMessageImpending);
  return (
    <MaintenanceMessageContext.Provider
      value={{
        isImpending: isImpending,
        isMaintenance: isMaintenance,
        maintainanceMessage: maintainanceMessage,
        maintainanceMessageImpending: maintainanceMessageImpending
      }}
    >
      {props.children}
    </MaintenanceMessageContext.Provider>
  );
};

export default MaintenanceMessageProvider;
