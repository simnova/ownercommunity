import React  from "react";
import { Button } from "antd";
import { Container } from "./container";

export const Card = ({ padding = 20}) => {
  return (
    <Container >
      <div className="text-only">
      </div>
      <div className="buttons-only">
        <Button size="small">Learn more</Button>
      </div>
    </Container>
  )
}
