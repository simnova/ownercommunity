import { Alert } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FC } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface MaintenanceMessageProps {
  impendingStartTimestamp: string;
  maintenanceEndTimestamp: string;
  impendingMessage: string;
}

const ImpendingMessage: FC<MaintenanceMessageProps> = (props) => {
  const replaceTokens = (str: string, mapObj: any) => {
    let re = new RegExp(Object.keys(mapObj).join('|'), 'g');

    return str.replace(re, function (matched) {
      return mapObj[matched];
    });
  };

  const formatMessage = () => {
    let startTimestampStr = dayjs(props.impendingStartTimestamp)
      .tz('America/New_York')
      .format('h:mm a on dddd, MMMM DD, YYYY');
    let endTimestampStr = dayjs(props.maintenanceEndTimestamp)
      .tz('America/New_York')
      .format('h:mm a on dddd, MMMM DD, YYYY');
    let startDateStr = dayjs(props.impendingStartTimestamp).tz('America/New_York').format('MMMM DD');
    let endDateStr = dayjs(props.maintenanceEndTimestamp).tz('America/New_York').format('MMMM DD');
    let timeRangeStr = startDateStr === endDateStr ? startDateStr : `${startDateStr} - ${endDateStr}`;
    let mapObj = {
      '##startTimestampStr##': startTimestampStr,
      '##endTimestampStr##': endTimestampStr,
      '##timeRangeStr##': timeRangeStr
    };
    return replaceTokens(props.impendingMessage, mapObj);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }} data-testid="impending-message">
        <Alert message={<div dangerouslySetInnerHTML={{ __html: formatMessage() }}></div>} />
      </div>
    </>
  );
};

export default ImpendingMessage;
