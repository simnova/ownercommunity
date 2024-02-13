import { FC } from 'react';
import { Row, Col, Result } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useFeatureFlags } from '../feature-flag-react-lite';

dayjs.extend(utc);
dayjs.extend(timezone);
export interface MaintenanceMessageProps {}

const MaintenanceMessage: FC<MaintenanceMessageProps> = (props) => {
  const { GetFeatureFlagByName } = useFeatureFlags();

  const replaceTokens = (str: string, mapObj: any) => {
    let re = new RegExp(Object.keys(mapObj).join('|'), 'g');

    return str.replace(re, function (matched) {
      return mapObj[matched];
    });
  };

  const getMessage = () => {
    const startTimestamp = GetFeatureFlagByName('MAINTENANCE_START_TIMESTAMP_UIPORTAL');
    const endTimestamp = GetFeatureFlagByName('MAINTENANCE_END_TIMESTAMP_UIPORTAL');
    const systemMsg = GetFeatureFlagByName('MAINTENANCE_MSG_SYSTEM_UIPORTAL');

    let startTimestampStr = dayjs(startTimestamp).tz('America/New_York').format('h:mm a on dddd, MMMM DD, YYYY');
    let endTimestampStr = dayjs(endTimestamp).tz('America/New_York').format('h:mm a on dddd, MMMM DD, YYYY');
    let startDateStr = dayjs(startTimestamp).tz('America/New_York').format('MMMM DD');
    let endDateStr = dayjs(endTimestamp).tz('America/New_York').format('MMMM DD');
    let timeRangeStr = startDateStr === endDateStr ? startDateStr : `${startDateStr} - ${endDateStr}`;
    let mapObj = {
      '##startTimestampStr##': startTimestampStr,
      '##endTimestampStr##': endTimestampStr,
      '##timeRangeStr##': timeRangeStr
    };
    return replaceTokens(systemMsg, mapObj);
  };

  return (
    <>
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
    </>
  );
};

export default MaintenanceMessage;
