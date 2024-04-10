import axios from 'axios';
import dayjs from 'dayjs';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'; // useState
import { AuthContextProps } from 'react-oidc-context';
import { FormatTimeCounter, HandleLogout, IsInStorybookEnv } from '../../../constants';
import { MaintenanceKickoutMessage } from './maintenance-kickout-message';
import MaintenanceMessageContext from './maintenance-message-context';

export interface MaintenanceMessageInfo {
  impendingMaintenanceStartTimestamp: string;
  maintenanceStartTimestamp: string;
  maintenanceEndTimestamp: string;
  upcomingMaintenance: string;
  impendingMessage: string;
  maintenanceMessage: string;
  timeoutBeforeMaintenance: number;
}
export type MaintenanceMessageProps = {
  children: ReactNode;
  maintenanceInfo: MaintenanceMessageInfo;
  auth?: AuthContextProps;
};

const MaintenanceMessageProvider: FC<MaintenanceMessageProps> = (props: MaintenanceMessageProps): React.JSX.Element => {
  // const timeoutBeforeMaintenance = import.meta.env.VITE_TIMEOUT_BEFORE_MAINTENANCE ?? 120; //in seconds
  const [isImpending, setIsImpending] = useState<boolean | undefined>(undefined);
  const [isMaintenance, setIsMaintenance] = useState<boolean | undefined>(undefined);
  const [isApproachingMaintenance, setIsApproachingMaintenance] = useState(false);
  const [maintenanceCountdown, setMaintenanceCountdown] = useState<number>(props.maintenanceInfo.timeoutBeforeMaintenance); //in seconds

  const timerInstance = React.useRef(undefined);

  useEffect(() => {
    // auto logout when maintenance countdown reaches 0
    if (maintenanceCountdown === 0) {
      if (props.auth) {
        setIsApproachingMaintenance(false);
        console.log('Maintenance countdown reached 0, logging out');
        HandleLogout(props.auth, window.location.origin);
      }

      return;
    }

    let interval: any = null;
    if (isApproachingMaintenance) {
      interval = setInterval(() => {
        setMaintenanceCountdown(maintenanceCountdown - 1);
      }, 1000);
    }

    //Clearing the interval
    return () => clearInterval(interval);
  }, [maintenanceCountdown, isApproachingMaintenance]);

  useEffect(() => {
    const isInStorybookEnv = IsInStorybookEnv();
    if (isInStorybookEnv) {
      handleStorybookEnv();
    } else {
      handleMaintenanceStatus();
    }
  }, [
    props.maintenanceInfo.impendingMaintenanceStartTimestamp,
    props.maintenanceInfo.maintenanceEndTimestamp,
    props.maintenanceInfo.maintenanceStartTimestamp,
    props.maintenanceInfo.upcomingMaintenance
  ]);

  const setIntervalImmediately = async (func: any, interval: number, params: any) => {
    await func(params);
    return setInterval(func, interval, params);
  };

  const handleStorybookEnv = () => {
    // do not get serverDate from server and use local feature flag when in storybook
    if (props.maintenanceInfo.upcomingMaintenance !== 'true') {
      setIsMaintenance(false);
      setIsImpending(false);
      setIsApproachingMaintenance(false);
      return;
    }
    const serverDate = new Date();
    const serverTime = dayjs(serverDate);
    if (
      serverTime > dayjs(props.maintenanceInfo.impendingMaintenanceStartTimestamp) &&
      serverTime < dayjs(props.maintenanceInfo.maintenanceStartTimestamp)
    ) {
      setIsMaintenance(false);
      setIsImpending(true);
      return;
    }
    if (
      serverTime > dayjs(props.maintenanceInfo.maintenanceStartTimestamp) &&
      serverTime < dayjs(props.maintenanceInfo.maintenanceEndTimestamp)
    ) {
      setIsMaintenance(true);
      setIsImpending(false);
      return;
    }
    if (serverTime > dayjs(props.maintenanceInfo.maintenanceEndTimestamp)) {
      setIsMaintenance(false);
      setIsImpending(false);
    }
  };

  const handleMaintenanceStatus = () => {
    const intervalParams = {
      maintenanceStartTimestamp: props.maintenanceInfo.maintenanceStartTimestamp,
      maintenanceEndTimestamp: props.maintenanceInfo.maintenanceEndTimestamp,
      impendingMaintenanceStartTimestamp: props.maintenanceInfo.impendingMaintenanceStartTimestamp,
      upcomingMaintenance: props.maintenanceInfo.upcomingMaintenance
    };

    if (timerInstance.current) {
      //cancel timer
      clearInterval(timerInstance.current);
    }
    setIntervalImmediately(calculateStatus, 5000, intervalParams)
      .then((interval: any) => {
        timerInstance.current = interval;
      })
      .catch((exception: any) => {
        console.log(exception);
      });
  };

  const calculateStatus = async () => {
    if (props.maintenanceInfo.upcomingMaintenance == '') {
      return;
    }

    if (props.maintenanceInfo.upcomingMaintenance !== 'true') {
      setIsMaintenance(false);
      setIsImpending(false);
      setIsApproachingMaintenance(false);
      return;
    }
    try {
      const data = await axios({
        url: import.meta.env.VITE_FUNCTION_ENDPOINT,
        method: 'post',
        data: {
          query: `
          query {serverDate}
          `
        }
      });

      const serverDate = data?.data?.data?.serverDate;
      const serverTime = dayjs(serverDate);
      const impendingTime = dayjs(props.maintenanceInfo.impendingMaintenanceStartTimestamp);
      const maintenanceStartTime = dayjs(props.maintenanceInfo.maintenanceStartTimestamp);
      const maintenanceEndTime = dayjs(props.maintenanceInfo.maintenanceEndTimestamp);
      if (serverTime < impendingTime) {
        setIsMaintenance(false);
        setIsImpending(false);
        setIsApproachingMaintenance(false);
      } else if (serverTime > impendingTime && serverTime < maintenanceStartTime) {
        setIsMaintenance(false);
        setIsImpending(true);

        // within 1 minute before maintenance start
        if (maintenanceStartTime.diff(serverTime, 'seconds') <= props.maintenanceInfo.timeoutBeforeMaintenance) {
          setIsApproachingMaintenance(true);
          setMaintenanceCountdown(maintenanceStartTime.diff(serverTime, 'seconds'));
        }
      } else if (serverTime > maintenanceStartTime && serverTime < maintenanceEndTime) {
        setIsMaintenance(true);
        setIsImpending(false);
        setIsApproachingMaintenance(false);
        return;
      } else if (serverTime > maintenanceEndTime) {
        setIsMaintenance(false);
        setIsImpending(false);
        setIsApproachingMaintenance(false);
        return;
      }
    } catch (exception) {
      // handle error
      console.log(exception);
    }
  };

  const contextValues = useMemo(
    () => ({
      isImpending: isImpending,
      isMaintenance: isMaintenance,
      impendingMessage: props.maintenanceInfo.impendingMessage,
      maintenanceMessage: props.maintenanceInfo.maintenanceMessage,
      impendingStartTimestamp: props.maintenanceInfo.impendingMaintenanceStartTimestamp,
      maintenanceStartTimestamp: props.maintenanceInfo.maintenanceStartTimestamp,
      maintenanceEndTimestamp: props.maintenanceInfo.maintenanceEndTimestamp
    }),
    [isImpending, isMaintenance]
  );
  console.log(contextValues);
  return (
    <MaintenanceMessageContext.Provider value={contextValues}>
      {isApproachingMaintenance && props.auth?.isAuthenticated && (
        <MaintenanceKickoutMessage timer={FormatTimeCounter(maintenanceCountdown)} />
      )}
      {props.children}
    </MaintenanceMessageContext.Provider>
  );
};

export default MaintenanceMessageProvider;
