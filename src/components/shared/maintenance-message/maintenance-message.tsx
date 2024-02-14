import { Col, Result, Row } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FC } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface MaintenanceMessageProps {
  maintenanceStartTimestamp: string;
  maintenanceEndTimestamp: string;
  maintenanceMessage: string;
}

const MaintenanceMessage: FC<MaintenanceMessageProps> = (props) => {
  const replaceTokens = (str: string, mapObj: any) => {
    let re = new RegExp(Object.keys(mapObj).join('|'), 'g');

    return str.replace(re, function (matched) {
      return mapObj[matched];
    });
  };

  const getMessage = () => {
    let startTimestampStr = dayjs(props.maintenanceStartTimestamp)
      .tz('America/New_York')
      .format('h:mm a on dddd, MMMM DD, YYYY');
    let endTimestampStr = dayjs(props.maintenanceEndTimestamp)
      .tz('America/New_York')
      .format('h:mm a on dddd, MMMM DD, YYYY');
    let startDateStr = dayjs(props.maintenanceStartTimestamp).tz('America/New_York').format('MMMM DD');
    let endDateStr = dayjs(props.maintenanceEndTimestamp).tz('America/New_York').format('MMMM DD');
    let timeRangeStr = startDateStr === endDateStr ? startDateStr : `${startDateStr} - ${endDateStr}`;
    let mapObj = {
      '##startTimestampStr##': startTimestampStr,
      '##endTimestampStr##': endTimestampStr,
      '##timeRangeStr##': timeRangeStr
    };
    return replaceTokens(props.maintenanceMessage, mapObj);
  };

  return (
    <div data-testid="maintenance-message">
      <Row>
        <Col span={24}>
          <Result status="warning" title={''}></Result>
        </Col>
      </Row>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ maxWidth: '400px', display: 'inline-block' }}
          dangerouslySetInnerHTML={{
            __html: getMessage() ?? ''
          }}
        ></div>
      </div>
    </div>
  );
};

export default MaintenanceMessage;
