import PropTypes from "prop-types"
import { useNode, Element } from "@craftjs/core";
import { Form, Input } from "antd";

const ContainerProps = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
}

interface ContainerProp {
  children: any;
  bgColor: string;
}

export type ContainerPropTypes = PropTypes.InferProps<typeof ContainerProps> & ContainerProp;

let Container: any;

Container = ({bgColor, children }: ContainerProp) => {
  const { connectors: { connect, drag }, selected, actions } = useNode((state) =>(
    {
        selected: state.events.selected,
    }
  ));

  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  )
}

var ContainerSettings = () => {
  const { actions: { setProp }, bgColor } = useNode((node) => ({  
    bgColor: node.data.props.bgColor
  }));

  return (
    <div>
      <Form>
        <Form.Item label="Background Color">
          <Input
            placeholder="#ffffff"
            value={bgColor}
            onChange={(inputElement) => setProp((props: any) => props.bgColor = inputElement.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

Container.craft = {
  props: {
    bgColor: '#ffffff',
  },
  related: {
    settings: ContainerSettings,
  }
}

export {
  Container
}