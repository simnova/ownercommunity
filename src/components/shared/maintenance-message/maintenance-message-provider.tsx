import axios from 'axios';
import dayjs from 'dayjs';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'; // useState
import { useAuth } from 'react-oidc-context';
import { FormatTimeCounter, HandleLogout, IsInStorybookEnv } from '../../../constants';
import { useFeatureFlags } from '../feature-flag-react-lite';
import { MaintenanceKickoutMessage } from './maintenance-kickout-message';
import MaintenanceMessageContext from './maintenance-message-context';

export interface MaintenanceMessageConfig {}
export type MaintenanceMessageProps = {
  children: ReactNode;
};

const MaintenanceMessageProvider: FC<MaintenanceMessageProps> = (props: MaintenanceMessageProps): React.JSX.Element => {
  const timeoutBeforeMaintenance = import.meta.env.VITE_TIMEOUT_BEFORE_MAINTENANCE ?? 120; //in seconds
  const [isImpending, setIsImpending] = useState<boolean | undefined>(undefined);
  const [isMaintenance, setIsMaintenance] = useState<boolean | undefined>(undefined);
  const [isApproachingMaintenance, setIsApproachingMaintenance] = useState(false);
  const [maintenanceCountdown, setMaintenanceCountdown] = useState<number>(timeoutBeforeMaintenance); //in seconds
  const auth = useAuth();
  const timerInstance = React.useRef(undefined);
  const { GetFeatureFlagByName } = useFeatureFlags();

  let impendingMaintenanceStartTimestamp = GetFeatureFlagByName('MAINTENANCE_TIMESTAMP_IMPENDING_UIPORTAL');
  let maintenanceStartTimestamp = GetFeatureFlagByName('MAINTENANCE_START_TIMESTAMP_UIPORTAL');
  let maintenanceEndTimestamp = GetFeatureFlagByName('MAINTENANCE_END_TIMESTAMP_UIPORTAL');
  let upcomingMaintenance = GetFeatureFlagByName('MAINTENANCE_UPCOMING_UIPORTAL');

  useEffect(() => {
    // auto logout when maintenance countdown reaches 0
    if (maintenanceCountdown === 0) {
      setIsApproachingMaintenance(false);
      HandleLogout(auth, window.location.origin);
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
  }, [impendingMaintenanceStartTimestamp, maintenanceEndTimestamp, maintenanceStartTimestamp, upcomingMaintenance]);

  const setIntervalImmediately = async (func: any, interval: number, params: any) => {
    await func(params);
    return setInterval(func, interval, params);
  };

  const handleStorybookEnv = () => {
    // do not get serverDate from server and use local feature flag when in storybook
    if (upcomingMaintenance !== 'true') {
      setIsMaintenance(false);
      setIsImpending(false);
      setIsApproachingMaintenance(false);
      return;
    }
    const serverDate = new Date();
    const serverTime = dayjs(serverDate);
    if (serverTime > dayjs(impendingMaintenanceStartTimestamp) && serverTime < dayjs(maintenanceStartTimestamp)) {
      setIsMaintenance(false);
      setIsImpending(true);
      return;
    }
    if (serverTime > dayjs(maintenanceStartTimestamp) && serverTime < dayjs(maintenanceEndTimestamp)) {
      setIsMaintenance(true);
      setIsImpending(false);
      return;
    }
    if (serverTime > dayjs(maintenanceEndTimestamp)) {
      setIsMaintenance(false);
      setIsImpending(false);
      return;
    }
  };

  const handleMaintenanceStatus = () => {
    const intervalParams = {
      maintenanceStartTimestamp: maintenanceStartTimestamp,
      maintenanceEndTimestamp: maintenanceEndTimestamp,
      impendingMaintenanceStartTimestamp: impendingMaintenanceStartTimestamp,
      upcomingMaintenance: upcomingMaintenance
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
    if (upcomingMaintenance == '') {
      return;
    }

    if (upcomingMaintenance !== 'true') {
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
      const impendingTime = dayjs(impendingMaintenanceStartTimestamp);
      const maintenanceStartTime = dayjs(maintenanceStartTimestamp);
      const maintenanceEndTime = dayjs(maintenanceEndTimestamp);
      if (serverTime < impendingTime) {
        setIsMaintenance(false);
        setIsImpending(false);
        setIsApproachingMaintenance(false);
      } else if (serverTime > impendingTime && serverTime < maintenanceStartTime) {
        setIsMaintenance(false);
        setIsImpending(true);

        // within 1 minute before maintenance start
        if (maintenanceStartTime.diff(serverTime, 'seconds') <= timeoutBeforeMaintenance) {
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
      isMaintenance: isMaintenance
    }),
    [isImpending, isMaintenance]
  );
  console.log(contextValues);
  return (
    <MaintenanceMessageContext.Provider value={contextValues}>
      {isApproachingMaintenance && auth.isAuthenticated && (
        <MaintenanceKickoutMessage timer={FormatTimeCounter(maintenanceCountdown)} />
      )}
      {props.children}
    </MaintenanceMessageContext.Provider>
  );
};

export default MaintenanceMessageProvider;
