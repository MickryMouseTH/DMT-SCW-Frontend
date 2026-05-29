import React, { useEffect } from 'react'
// import moment from 'moment';

import InputNumber from '../Input/number/InputNumber'
import { Form, Input, Row, Col, Button, ConfigProvider, TimePicker,Checkbox } from 'antd'
import moment from "moment";
import Select from "../select/SelectOption";
import { _isEmpty } from "../../../tools/util";
import DatePicker from "../../dataPicker";

import 'moment/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';

const disabledDate = (current) => {
  return current && current > moment().endOf("day");
};


const children = {
  select: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <Form.Item
        className="mb-3"
        label={option.label}
        name={option.name}
        rules={option.rules}
      >
        <Select size={60}  {...option.childrenProps} />
      </Form.Item>
    </Col>
  ),
  input: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <Form.Item
        className="mb-3"
        label={option.label}
        name={option.name}
        rules={option.rules}
      >
        <Input size={60} className="rounded-pill max-WS " {...option.childrenProps} />
      </Form.Item>
    </Col>
  ),
  checkbox: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <Form.Item
        className="mb-3 mt-3"
        label={""}
        name={option.name}
      >
       
        <Checkbox checked={option.checked} onChange={option.onChange}>{option.label}</Checkbox>
    
      </Form.Item>
    </Col>
  ),
  inputpassword: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <Form.Item
        className="mb-3"
        label={option.label}
        name={option.name}
        rules={option.rules}
      >
        <Input.Password size={60}
          className="rounded-pill max-WS "
          {...option.childrenProps}
        />
      </Form.Item>
    </Col>
  ),
  inputnumber: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <Form.Item
        className="mb-3"
        label={option.label}
        name={option.name}
        rules={option.rules}
      >
        <InputNumber size={60}
          className="rounded-pill max-WS "
          {...option.childrenProps}
        />
      </Form.Item>
    </Col>
  ),
  datePicker: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <ConfigProvider locale="th_TH">
        <Form.Item className="mb-3" label={option.label} name={option.name} rules={option.rules}>
          <DatePicker size={60} locale={locale} className="rounded-pill max-WS w-100"
            {...option.childrenProps}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </ConfigProvider>
    </Col>
  ),
  datePicker2: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <ConfigProvider locale="th_TH">
        <Form.Item className="mb-3" label={option.label} name={option.name} rules={option.rules}>
          <DatePicker size={60} locale={locale} className="rounded-pill max-WS w-100"
            {...option.childrenProps}
            disabledDate={false}
          />
        </Form.Item>
      </ConfigProvider>
    </Col>
  ),
  timePicker: (option, span = 10) => (
    <Col span={span} key={option.name}>
      <ConfigProvider locale="th_TH">
      <Form.Item
        className="mb-3"
        label={option.label}
        name={option.name}
        rules={option.rules}
      >
        <TimePicker size={60} locale={locale} className="rounded-pill max-WS" {...option.childrenProps} />
      </Form.Item>
      </ConfigProvider>
   </Col>
  ),
};

const FormDefault = ({
  formWrapper = { md: 24, lg: 18 },
  buttonWrapper = { md: 24, lg: 6 },
  buttonSpan = { span: 24 },
  action = [],
  actionBoutton = [],
  fields = [],
  colSpan = 10,
  submitButton = true,
  submitText = "ค้นหา",
  typeButton = "ghost",
  actionSearch = [],
  textAlign = "",
  setFieldsdefaultValues = {},
  disabledButton = false,
  onFinish = defaultFun,
  exportFile = defaultFun,
  printFile = defaultFun,
  ...props
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(handleInitalValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  // const onFormLayoutChange = (fields) => {
  //   console.log(fields);
  // };
  const getFields = () => {
    return fields.map((field) => children[field.type](field.option, colSpan));
  };

  const handleOnFinish = async (v) => {
    try {
      const values = await form.validateFields();
      onFinish(values);
    } catch (error) {
      console.log("onFinish", error);
    }
  };

  const handleInitalValues = () => {
    const initialValues = fields.reduce((acc, obj) => {
      acc[obj.option.name] = obj.option.initialValue;
      return acc;
    }, {});
    return initialValues;
  };

  return (
    <Form
      {...props}
      layout="vertical"
      // onValuesChange={onFormLayoutChange}
      className="custom-ant-form"
      size="large"
      form={form}
      onFinish={handleOnFinish}
    >
      <Row>
        <Col {...formWrapper}>
          <Row gutter={24} justify="start" type="flex" className="w-100">
            {getFields()}
          </Row>
        </Col>
        {!_isEmpty(action) && (
          <Col {...buttonWrapper} className="text-right">
            {submitButton ? (
              <Button disabled={disabledButton} htmlType="submit" type={typeButton} className="m-5 mt-10">
                {submitText}
              </Button>
            ) : null}
            {action.map((b, index) => (
              <Button {...b.props} key={index} className="m-5 mt-10">
                {b.name}
              </Button>
            ))}
          </Col>
        )}
        {!_isEmpty(actionBoutton) && (
          <Col {...buttonSpan} className={`mt-10 ${textAlign}`}>
            {submitButton ? (
              <Button type="primary" htmlType="submit" className="m-5">
                {submitText}
              </Button>
            ) : null}
            {actionBoutton.map((b, index) => (
              <Button {...b.props} key={index} className="m-5">
                {b.name}
              </Button>
            ))}
          </Col>
        )}
        {actionSearch && (
          <Col {...buttonSpan} className={`mt-10 ${textAlign}`}>
            {/* {submitButton ? (
              <Button type="primary" htmlType="submit" className="m-5">
                {submitText}
              </Button>
            ) : null} */}
            
            {actionSearch.map((b, index) => (
              <Button {...b.props} key={index} className="m-5">
                {b.name}
              </Button> 
            ))}
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default FormDefault;
const defaultFun = () => { };
