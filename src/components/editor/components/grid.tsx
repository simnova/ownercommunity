import {useEditor, useNode} from "@craftjs/core";
import { Row, Col, Input, Form } from 'antd';

interface GridProp {
    numOfCols: number;
    bgColor: string;
}

let Grid: any;

Grid = ({ numOfCols, bgColor, ...props }: GridProp) => {
    const { connectors: {connect, drag}, selected, actions } = useNode((state) =>(
        {
            selected: state.events.selected,
        }
    ));

    const buildColumns = (numOfCols: number) => {
        let grid = [];
        for(let i = 0; i < numOfCols; i++) {
            grid.push(<Col span={24 / numOfCols} key={`col-${i}`}>col-{24 / numOfCols}</Col>);
        }
        return grid;
    }

    return (
        <div
            className="px-4 py-2"
            ref={ref => connect(drag(ref as HTMLDivElement))}
            {...props}
            style={{
              backgroundColor: bgColor
            }}
        >
            <Row>
              {buildColumns(numOfCols)}
            </Row>
        </div>
    )
}

var GridSettings = () => {
    const { actions: { setProp}, numOfCols, bgColor } = useNode((node) => ({  
      numOfCols: node.data.props.numOfCols,
      bgColor: node.data.props.bgColor
  
    }));
    return (
      <div>
        <Form layout="vertical">
          <Form.Item label="Number of Columns">
            <Input placeholder="1" value={numOfCols} onChange={(inputElement) => setProp((props:any) => props.numOfCols = parseInt(inputElement.target.value))}  />
          </Form.Item>  
          <Form.Item label="Background Color">
            <Input placeholder="#fff" value={bgColor} onChange={(inputElement) => setProp((props:any) => props.bgColor = inputElement.target.value)}  />
          </Form.Item>  
        </Form>
      </div>
    )
  }
  
  Grid.craft = {
    props: {
      rowNum: 1,
      colNum: 1,
      span: 0
    },
    related: {
      settings: GridSettings
    }
  
  }
  
  export {
    Grid
  }