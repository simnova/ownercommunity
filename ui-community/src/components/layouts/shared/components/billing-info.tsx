import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { use } from 'chai';

interface BillingInfoProps {
  cardNumberValidationHelpText: string;
  securityCodeValidationHelpText: string;
  onCardNumberContainerLoaded: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

export const BillingInfo: React.FC<BillingInfoProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    props.onCardNumberContainerLoaded();
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form form={form} name="basic" onFinishFailed={onFinishFailed}>
      <Row>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <div>
                <span style={{ color: "red" }}>* </span>Card Number
              </div>
            }
            name="cardNumber"
            validateStatus="error" //error{red} validating{black} warning{yellow}
            help={props.cardNumberValidationHelpText}
            style={{ borderRadius: "6px" }}
          >
            <div id="card-number-container"></div>
          </Form.Item>
          <Form.Item
            label={
              <div>
                <span style={{ color: "red" }}>* </span> Card Security Code
              </div>
            }
            name="securityCode"
            validateStatus="error"
            help={props.securityCodeValidationHelpText}
          >
            <div id="securityCode-container"></div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}