import { Alert, Row } from 'antd';
import { FC } from 'react';

interface MaintenanceKickoutMessageProps {
  timer: string;
}
export const MaintenanceKickoutMessage: FC<MaintenanceKickoutMessageProps> = (
  props
) => {
  return (
    <>
      <Row
        justify={'center'}
        style={{
          width: '100%',
          position: 'sticky',
          top: '0',
          zIndex: '1000',
          backgroundColor: 'white'
        }}
      >
        <Alert
          style={{ width: '100%', textAlign: 'center' }}
          message={`Maintenance will begin in ${props.timer}. Please save your work and log out.`}
          type="warning"
          showIcon
        />
      </Row>
    </>
  );
};