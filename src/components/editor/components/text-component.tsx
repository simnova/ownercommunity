import {useNode} from "@craftjs/core";
import {Form, Input, Typography } from "antd";
import ContentEditable from "react-contenteditable";

const { Text } = Typography;

interface TextComponentProp {
    text: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
  }

let TextComponent: any;

TextComponent = ({text, fontSize, fontWeight, ...props }:TextComponentProp) => {
  const { actions, connectors: {connect, drag} } = useNode();

  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
    >
        <Text style={{ fontSize: fontSize ? fontSize : 14, fontWeight: fontWeight ? fontWeight : 400}}>{text}</Text>
    </div>
  )
}

var TextComponentSettings = () => {
  const { actions: { setProp}, text, fontSize } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Text">
          <Input
          placeholder="Text"
          value={text}
          onChange={(inputElement) => setProp((props: any) => props.text = inputElement.target.value)}
          />
        </Form.Item>
        <Form.Item label="Font Size">
          <Input
            placeholder="14"
            value={fontSize}
            onChange={(inputElement) => setProp((props: any) => props.fontSize = parseInt(inputElement.target.value))}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

TextComponent.craft = {
  props: {
    text: 'Text goes here',
    fontSize: 14,
  },
  related: {
    settings: TextComponentSettings
  }
}

export {
  TextComponent
}