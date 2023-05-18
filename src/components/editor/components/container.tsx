import PropTypes from "prop-types"
import { useNode } from "@craftjs/core";
import { Form, Input, theme } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

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
  const {
    token: { colorTextBase, colorBgContainer }
  }=theme.useToken();
  const {
    themeType
  }=useContext(ThemeContext)
  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
      style={themeType==="dark"?{
         backgroundColor: "#000"
      }:{
        backgroundColor: "#fff"

      }}
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
            placeholder={bgColor}
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