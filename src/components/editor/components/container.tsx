import PropTypes from "prop-types";
import { useNode } from "@craftjs/core";
import { Form, Input } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const ContainerProps = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
}

interface ContainerProp {
  children: any;
}

export type ContainerPropTypes = PropTypes.InferProps<typeof ContainerProps> & ContainerProp;


const Container: any = ({ children }: ContainerProp) => {
  const { connectors: { connect, drag } } = useNode((state) =>(
    {
        selected: state.events.selected,
    }
  ));
  
  const {
    currentTokens
  }=useContext(ThemeContext)
  const backGColor = currentTokens.hardCodedTokens.backgroundColor
  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
      style={{
        backgroundColor: backGColor,
      }}
    >
      {children}
    </div>
  )
}

const ContainerSettings = () => {
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