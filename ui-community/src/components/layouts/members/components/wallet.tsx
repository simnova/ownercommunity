import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker, Input, Select, Checkbox, Modal } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { PlusOutlined } from '@ant-design/icons';

import AddPaymentMethodModal from './add-payment-method-modal';
import PaymentInstrumentList from './payment-instruments-list';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';

interface WalletProps {
  addPaymentMethodProps: AddPaymentMethodProps;
}

interface AddPaymentMethodProps {
  errorMessage: string;
  onSetErrorMessage: Function;
  cardNumberValidationHelpText: string;
  setCardNumberValidationHelpText: React.Dispatch<React.SetStateAction<string>>;
  securityCodeValidationHelpText: string;
  setSecurityCodeValidationHelpText: React.Dispatch<React.SetStateAction<string>>;
  onCardNumberContainerLoaded: () => void;
  createToken: (expirationMonth: string, expirationYear: string, callBack: any) => void;
}

interface CustomerInfoFormSchema {
  billToFirstName: string;
  billToLastName: string;
  billToEmail: string;
  billToAddressLine1: string;
  billToAddressCountry: string;
  billToAddressState: string;
  billToAddressCity: string;
}

const MonthPicker = DatePicker.MonthPicker;
dayjs.extend(customParseFormat);

type MicroformError = {
  correlationId: string;
  details: MicroformDetails[];
  informationLink: string;
  message: string;
  name: string;
  reason: string; //CREATE_TOKEN_VALIDATION_SERVERSIDE / CREATE_TOKEN_VALIDATION_FIELDS
};

type MicroformDetails = {
  location: string;
  message: string;
};

const cards = [
  {
    id: 1,
    cardNumber: '411111XXXXXX1111',
    default: true
  },
  {
    id: 2,
    cardNumber: '5295932778292174',
    default: false
  },
  {
    id: 3,
    cardNumber: 'XXXXXXXXXXXX5678',
    default: false
  }
];

const Wallet: React.FC<WalletProps> = ({ addPaymentMethodProps }) => {
  const useAddPaymentMethod = useAddPaymentMethodModal();
  return (
    <div>
      <PaymentInstrumentList cards={cards} />
      <Button type="primary" className="mt-4" onClick={useAddPaymentMethod.onOpen}>
        <div className="flex items-center">
          <PlusOutlined className="mr-1" /> Add Card
        </div>
      </Button>
      {/* <AddPaymentMethod {...addPaymentMethodProps} /> */}
      <AddPaymentMethodModal />
    </div>
  );
};

// const AddPaymentMethod: React.FC<AddPaymentMethodProps> = (props) => {
//   const [form] = Form.useForm();
//   const [expirationMonth, setExpirationMonth] = useState('');
//   const [expirationYear, setExpirationYear] = useState('');
//   const [paymentToken, setPaymentToken] = useState('');
//   let country = Country.getCountryByCode('US');
//   const initialFormState = {
//     billToFirstName: '',
//     billToLastName: '',
//     billToEmail: '',
//     billToAddressLine1: '',
//     billToAddressCountry: '',
//     billToAddressState: '',
//     billToAddressCity: ''
//   };
//   const [formValues, setFormValues] = useState<CustomerInfoFormSchema>(initialFormState);

//   const useAddPaymentMethod = useAddPaymentMethodModal();

//   useEffect(() => {
//     props.onCardNumberContainerLoaded();
//   }, []);

//   const resetErrorMessages = () => {
//     // reset any displayed errors
//     props.setCardNumberValidationHelpText('');
//     props.setSecurityCodeValidationHelpText('');
//   };

//   const onChangeExpYear = (date: dayjs.Dayjs | null) => {
//     if (date !== null) {
//       setExpirationMonth(date.format('M').padStart(2, '0'));
//       setExpirationYear(date.format('YYYY'));
//     } else {
//       setExpirationMonth('');
//       setExpirationYear('');
//     }
//   };

//   const processMicroformError = (error: MicroformError) => {
//     switch (error.reason) {
//       case 'CREATE_TOKEN_VALIDATION_SERVERSIDE': {
//         props.onSetErrorMessage('Payment failed due to expired token. Please refresh the screen and try again.');
//         break;
//       }
//       case 'CREATE_TOKEN_VALIDATION_FIELDS': {
//         // Credit Card and/or CVV is not valid
//         error.details.forEach((detail: MicroformDetails, _index: number) => {
//           if (detail.location === 'number') {
//             props.setCardNumberValidationHelpText('Please enter a valid card number.');
//           } else if (detail.location === 'securityCode') {
//             props.setSecurityCodeValidationHelpText('Please enter the security code as shown on the card.');
//           }
//         });
//         break;
//       }
//     }
//   };

//   const onCreateToken = () => {
//     // reset any displayed errors
//     resetErrorMessages();

//     // create token for customer card
//     props.createToken(expirationMonth, expirationYear, async function (error: any, token: any) {
//       if (error) {
//         const microformError: MicroformError = error;
//         processMicroformError(microformError);
//       }

//       form.validateFields().then((_values) => {
//         console.log('Token_Values===>', _values);
//         if (token) {
//           console.log('Payment Token', token);
//           setPaymentToken(token);
//         }
//       });
//       setFormValues(initialFormState);
//     });
//   };

//   const onCreateCustomer = async () => {
//     if (paymentToken !== '') {
//       await axios
//         .post('http://localhost:7071/api/cybersource/create-customer', {
//           paymentToken: paymentToken
//         })
//         .then((response) => {
//           console.log('CREATE CUSTOMER RESPONSE', response);
//         })
//         .catch((error) => {
//           console.log('CREATE CUSTOMER ERROR', error);
//         });
//     }
//   };

//   const onGetCustomerPaymentInstruments = async () => {
//     await axios
//       .post('http://localhost:7071/api/cybersource/get-customer-payment-instruments', {
//         customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6'
//       })
//       .then((response) => {
//         console.log('GET PAYMENT INSTRUMENTS RESPONSE', response);
//       })
//       .catch((error) => {
//         console.log('GET PAYMENT INSTRUMENTS ERROR', error);
//       });
//   };

//   const onAddCustomerPaymentInstrument = async () => {
//     await axios
//       .post('http://localhost:7071/api/cybersource/add-customer-payment-instrument', {
//         customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
//         paymentToken: paymentToken
//       })
//       .then((response) => {
//         console.log('ADD PAYMENT INSTRUMENT RESPONSE', response);
//       })
//       .catch((error) => {
//         console.log('ADD PAYMENT INSTRUMENT ERROR', error);
//       });
//   };

//   const onDeleteCustomerPaymentInstrument = async () => {
//     await axios
//       .post('http://localhost:7071/api/cybersource/delete-customer-payment-instrument', {
//         customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
//         paymentInstrumentId: '1CE627A481F7E175E063AF598E0AF73D'
//       })
//       .then((response) => {
//         console.log('DELETE PAYMENT INSTRUMENT RESPONSE', response);
//       })
//       .catch((error) => {
//         console.log('DELETE PAYMENT INSTRUMENT ERROR', error);
//       });
//   };

//   const onProcessPaymentWithPaymentInstrument = async () => {
//     await axios
//       .post('http://localhost:7071/api/cybersource/process-payment-with-payment-instrument', {
//         paymentInstrumentId: '1CC3816AF671FCC3E063AF598E0A5FA7'
//       })
//       .then((response) => {
//         console.log('PROCESS PAYMENT RESPONSE', response);
//       })
//       .catch((error) => {
//         console.log('PROCESS PAYMENT ERROR', error);
//       });
//   };

//   const onUpdateCustomerDefaultPaymentInstrument = async () => {
//     await axios
//       .post('http://localhost:7071/api/cybersource/update-customer-default-payment-instrument', {
//         customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
//         paymentInstrumentId: '1CD4BF677E8742EAE063AF598E0AEF98'
//       })
//       .then((response) => {
//         console.log('UPDATE DEFAULT PAYMENT INSTRUMENT RESPONSE', response);
//       })
//       .catch((error) => {
//         console.log('UPDATE DEFAULT PAYMENT INSTRUMENT ERROR', error);
//       });
//   };

//   const ErrorMessage = () => {
//     return props.errorMessage ? (
//       <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}>{props.errorMessage}</div>
//     ) : (
//       <></>
//     );
//   };
//   const onValuesChange = (changedValue: CustomerInfoFormSchema) => {
//     setFormValues({ ...formValues, [Object.keys(changedValue)[0]]: Object.values(changedValue)[0] });
//   };

//   const onFinish = () => {
//     onCreateToken();
//   };
//   return (
//     <Modal
//       open={useAddPaymentMethod.isOpen}
//       onCancel={useAddPaymentMethod.onClose}
//       centered
//       title="Add a new payment method"
//     >
//       <ErrorMessage />
//       <Form
//         form={form}
//         onValuesChange={onValuesChange}
//         onFinish={onFinish}
//         layout="vertical"
//         name="basic"
//         initialValues={{ remember: true }}
//       >
//         <h3>Add Payment Method</h3>
//         <div className="flex gap-4">
//           <Form.Item name={'billToForename'} className="w-full" label="First Name:" required>
//             <Input placeholder="Enter first name" />
//           </Form.Item>
//           <Form.Item name="billToSurname" className="w-full" label="Last Name:" required>
//             <Input placeholder="Enter last name" />
//           </Form.Item>
//         </div>
//         <Form.Item
//           className="ant-form-item-control-input-content"
//           label="Card Number:"
//           name="cardNumber"
//           validateStatus="error" //error{red} validating{black} warning{yellow}
//           help={props.cardNumberValidationHelpText}
//           required
//         >
//           <div id="card-number-container"></div>
//         </Form.Item>
//         <div className="flex gap-1">
//           <Form.Item
//             label={'Card Expiration Date:'}
//             required={true}
//             name="expirationMonthPicker"
//             rules={[{ required: true, message: 'Please enter the expiration date as shown on the card.' }]}
//           >
//             <MonthPicker
//               id="expirationMonthPicker"
//               name="expirationMonthPicker"
//               placeholder="Month-Year"
//               format="MM-YYYY"
//               onChange={(date: any) => onChangeExpYear(date)}
//               disabledDate={(current: any) => {
//                 return current && current < dayjs().endOf('day').subtract(1, 'day');
//               }}
//             ></MonthPicker>
//           </Form.Item>

//           <Form.Item
//             label="Security Code:"
//             name="securityCode"
//             validateStatus="error"
//             required
//             help={props.securityCodeValidationHelpText}
//           >
//             <div id="securityCode-container"></div>
//           </Form.Item>
//         </div>
//         <Form.Item name="billToAddressCountry" label="Country:" className="w-full" required>
//           <Select options={[country!]} fieldNames={{ value: 'isoCode', label: 'name' }} placeholder="Select country" />
//         </Form.Item>
//         {formValues.billToAddressCountry && (
//           <div>
//             <Form.Item name="billToAddressLine1" label="Address Line 1:" required>
//               <Input placeholder="Enter address line 1" />
//             </Form.Item>
//             <Form.Item name="billToAddressLine2" label="Address Line 2: (optional)">
//               <Input placeholder="Enter address line 2" />
//             </Form.Item>
//             <div className="flex gap-4">
//               <Form.Item name="billToAddressState" label="State / Province:" className="w-full" required>
//                 <Select
//                   placeholder="Select state / province"
//                   options={State.getStatesOfCountry(formValues.billToAddressCountry)}
//                   fieldNames={{ value: 'isoCode', label: 'name' }}
//                 />
//               </Form.Item>
//               <Form.Item name="billToAddressCity" label="City:" className="w-full" required>
//                 <Select
//                   placeholder="Select city"
//                   options={City.getCitiesOfState(formValues.billToAddressCountry, formValues.billToAddressState)}
//                   fieldNames={{ value: 'name', label: 'name' }}
//                 />
//               </Form.Item>
//               <Form.Item name="postalCode" label="Zip / Postal Code:" className="w-full" required>
//                 <Input placeholder="Enter zip / postal code" />
//               </Form.Item>
//             </div>
//             <div className="flex gap-4">
//               <Form.Item
//                 className="w-full"
//                 name="billToEmail"
//                 label="Email:"
//                 rules={[
//                   {
//                     type: 'email',
//                     message: 'The input is not valid E-mail!'
//                   },
//                   {
//                     required: true,
//                     message: 'Please input your E-mail!'
//                   }
//                 ]}
//               >
//                 <Input placeholder="Enter email" />
//               </Form.Item>
//               <Form.Item
//                 className="w-full"
//                 name="phone"
//                 label="Phone Number:"
//                 rules={[{ required: true, message: 'Please input your phone number!' }]}
//               >
//                 <Input
//                   placeholder="Enter phone number"
//                   addonBefore={
//                     <Select disabled={Boolean(country?.phonecode)} value={country?.phonecode} style={{ width: 70 }}>
//                       <Select.Option value={country?.phonecode}>+{country?.phonecode}</Select.Option>
//                     </Select>
//                   }
//                   maxLength={10}
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>
//             </div>
//             <Form.Item label="Set as a primary card for:" name="agreement" valuePropName="checked">
//               <Checkbox>Payment</Checkbox>
//             </Form.Item>
//           </div>
//         )}
//         <Button type="primary" htmlType="submit" onClick={() => onCreateToken()}>
//           {'Save Card'}
//         </Button>
//         {/* <br /> <br />
//         <Button onClick={() => onCreateCustomer()}>{'Create Customer'}</Button> <br /> <br />
//         <Button onClick={() => onGetCustomerPaymentInstruments()}>
//           {'Get Customer Payment Instruments'}
//         </Button> <br /> <br />
//         <Button onClick={() => onAddCustomerPaymentInstrument()}>
//           {'Add Customer Payment Instrument'}
//         </Button> <br /> <br />
//         <Button onClick={() => onDeleteCustomerPaymentInstrument()}>{'Delete Customer Payment Instrument'}</Button>{' '}
//         <br /> <br />
//         <Button onClick={() => onProcessPaymentWithPaymentInstrument()}>{'Process Payment'}</Button> <br /> <br />
//         <Button onClick={() => onUpdateCustomerDefaultPaymentInstrument()}>
//           {'Update Customer Default Payment Instrument'}
//         </Button> */}
//       </Form>
//     </Modal>
//   );
// };

export default Wallet;
