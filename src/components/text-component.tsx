import {useNode} from "@craftjs/core";

interface TextComponentProp {
    text: string;
  }

export const TextComponent = ({text}:TextComponentProp) => {
  const { connectors: {drag} } = useNode();

  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}
