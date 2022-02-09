import React from "react";
import PropTypes from "prop-types"

const ContainerProps = {
  children: PropTypes.node
}

interface ContainerProp {
  children: any;
}

export type ContainerPropTypes = PropTypes.InferProps<typeof ContainerProps> & ContainerProp;

export const Container: React.FC = (props) => {
    return (
      <div style={{margin: "5px 0", minHeight:'500px', minWidth:'500px', backgroundColor:'gray'}}>
        {props.children}
      </div>
    )
}