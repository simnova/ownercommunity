import { useNode, Element } from '@craftjs/core';
import { Row, Col, Input, Form, Select } from 'antd';
import { Container } from './container';

const { Option } = Select;
interface GridProp {
  numOfCols: number;
  bgColor: string;
}

const Grid: any = ({ numOfCols, bgColor, ...props }: GridProp) => {
  const {
    connectors: { connect, drag }
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const buildColumns = (numOfCols: number) => {
    let grid = [];
    for (let i = 0; i < numOfCols; i++) {
      grid.push(
        <Col span={24 / numOfCols} key={`col-${i}`}>
          <Element id={`col-${i + 1}`} is={Container} canvas></Element>
        </Col>
      );
    }
    return grid;
  };

  return (
    <div
      className="px-4 py-2"
      ref={(ref) => connect(drag(ref as HTMLDivElement))}
      {...props}
    >
      <div
        role="listitem"
        className="bg-white cursor-pointer shadow rounded-lg p-8 relative "
        style={{ backgroundColor: bgColor }}
      >
        <Row>{buildColumns(numOfCols)}</Row>
      </div>
    </div>
  );
};

const GridSettings = () => {
  const {
    actions: { setProp },
    numOfCols,
    bgColor,
  } = useNode((node) => ({
    numOfCols: node.data.props.numOfCols,
    bgColor: node.data.props.bgColor,
  }));

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Number of Columns">
          <Select
            placeholder={numOfCols}
            onChange={(value) =>
              setProp((props: any) => (props.numOfCols = value))
            }
          >
            <Option key={1}>1</Option>
            <Option key={2}>2</Option>
            <Option key={3}>3</Option>
            <Option key={4}>4</Option>
            <Option key={6}>6</Option>
            <Option key={8}>8</Option>
            <Option key={12}>12</Option>
          </Select>
          {/* <Input placeholder="1" value={numOfCols} onChange={(inputElement) => setProp((props:any) => props.numOfCols = parseInt(inputElement.target.value))}  /> */}
        </Form.Item>
        <Form.Item label="Background Color">
          <Input
            placeholder="#ffffff"
            value={bgColor}
            onChange={(inputElement) =>
              setProp(
                (props: any) => (props.bgColor = inputElement.target.value)
              )
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};

Grid.craft = {
  props: {
    numOfCols: 1,
    bgColor: '#ffffff',
  },
  related: {
    settings: GridSettings,
  },
};

export { Grid };
