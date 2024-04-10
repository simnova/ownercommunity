import { useNode } from "@craftjs/core";
import { Form, Input, Typography } from "antd";

const { Text } = Typography;

interface TextComponentProp {
    text: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
  }

const TextComponent: any = ({text, fontSize, fontWeight }:TextComponentProp) => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
    >
        <Text style={{ fontSize: fontSize ? fontSize : 14, fontWeight: fontWeight ? fontWeight : 400}}>{text}</Text>
    </div>
  )
}

const TextComponentSettings = () => {
  const {actions: {setProp}, text, fontSize, fontWeight} = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
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
        <Form.Item label="Font Weight">
          <Input
            placeholder="400"
            value={fontWeight}
            onChange={(inputElement) => setProp((props: any) => props.fontWeight = parseInt(inputElement.target.value))}
          />
        </Form.Item>
      </Form>
    </div>
  )
};

TextComponent.craft = {
  props: {
    text: 'Text goes here',
    fontSize: 14,
    fontWeight: 400,
  },
  related: {
    settings: TextComponentSettings
  }
}

export {
  TextComponent
};
