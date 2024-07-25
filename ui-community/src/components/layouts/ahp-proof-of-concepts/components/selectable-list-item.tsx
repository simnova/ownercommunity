import { Col, Row, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { SelectableListDataType } from './selectable-list';

const ContentHeight = '70px';
interface SelectableListItemProps {
  data: SelectableListDataType;
}
export const SelectableListItem: FC<SelectableListItemProps> = (props) => {
  return (
    <Row style={{ width: '100%', cursor:"pointer" }}>
      <Col span={7}>
        <div
          style={{
            height: ContentHeight,
            width: ContentHeight,
            border: '1px solid black',
            textAlign: 'center',
            lineHeight: ContentHeight
          }}
        >
          <Typography.Text>{props.data.initials.toUpperCase()}</Typography.Text>
        </div>
      </Col>

      <Col>
        <div
          style={{
            height: ContentHeight
          }}
        >
          <Typography.Text strong>{props.data.title}</Typography.Text>
          <br />
          <Typography.Text>{dayjs(props.data.timestamp).format('DD-MMM-YY h:mma z')}</Typography.Text>
          <br />
          <Tag style={{ border: '1px solid black'}}>{props.data.progress}</Tag>
        </div>
      </Col>
    </Row>
  );
};
