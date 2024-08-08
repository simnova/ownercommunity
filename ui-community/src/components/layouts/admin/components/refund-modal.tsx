import { useState } from 'react';

import { Button, Card, Form, Input, InputNumber, Modal } from 'antd';

import useRefundModal from '../../../../hooks/useRefundModal';

type FormFieldTypes = {
  amount: number;
  reason: string;
};

enum Steps {
  FORM = 0,
  REVIEW = 1
}

export const RefundModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(Steps.FORM);

  const { id, isOpen, onClose } = useRefundModal();
  const [form] = Form.useForm();

  const next = () => {
    if (step === Steps.FORM) {
      form.validateFields().then(() => setStep((prev) => prev + 1));
    }
  };

  const back = () => {
    if (step === Steps.REVIEW) {
      setStep((prev) => prev - 1);
    }
  };

  let footer = (
    <div className="w-full flex justify-end">
      <Button type="primary" onClick={next}>
        Next
      </Button>
    </div>
  );

  if (step === Steps.REVIEW) {
    footer = (
      <div className="w-full flex justify-end gap-2">
        <Button onClick={back}>Back</Button>
        <Button type="primary" onClick={onSubmit} loading={isSubmitting}>
          Submit
        </Button>
      </div>
    );
  }

  async function onSubmit() {
    setIsSubmitting(true);
    console.log('values', form.getFieldsValue(true));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  }

  return (
    <Modal open={isOpen} onCancel={onClose} title="Initiate Refund" centered footer={footer}>
      {step === Steps.FORM && (
        <Form form={form}>
          <Form.Item<FormFieldTypes>
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Refund amount is required.' }]}
          >
            <InputNumber
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
              className="w-fit"
            />
          </Form.Item>
          <Form.Item<FormFieldTypes>
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'The reason for initiating the refund is required.' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      )}

      {step === Steps.REVIEW && (
        <Card className="flex flex-col gap-1">
          <h3>Review refund information</h3>
          <div>
            <b>Amount:</b> {form.getFieldValue('amount')}
          </div>
          <div>
            <b>Reason:</b> {form.getFieldValue('reason')}
          </div>
        </Card>
      )}
    </Modal>
  );
};
