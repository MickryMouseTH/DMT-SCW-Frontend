/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table, Button, Modal, Row, Col, Form, Select, Input } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { getTSBList_API, getShiftList_API, getPaymentmethodListAPI, getAuditAdjustReasonAPI } from "../../../service/api/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import {
  GET_DATA_INFO_M060000013B, POST_SAVE_M060000013B
} from "../../../service/api/report";
import {
  _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai
} from "../../../tools/util";

const dateFormat = "DD/MM/YYYY";
const { Option } = Select;

const AuditPassingTransactionSodAmount = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);
  const [form] = Form.useForm();
  const [vehicleClassList, setVehicleClassList] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [auditAdjustReasonList, setAuditAdjustReasonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operatorDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.operatorDate,
      },
    },
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: [...tsbList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : 1,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "รหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: true, message: "กรุณาป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
      },
    },
    {
      type: "select",
      option: {
        name: "shiftNo",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftNo",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกผลัด!",
          },
        ],
        initialValue: initialValue.shiftNo ? initialValue.shiftNo : "ทั้งหมด",
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "order",
      key: "order",
      width: 70,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ปฏิบัติงาน",
      dataIndex: "operationDate",
      key: "operationDate",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
      ),
    },
    {
      title: "ผลัด",
      dataIndex: "shiftName",
      key: "shiftName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ด่าน",
      key: "tsbName",
      dataIndex: "tsbName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ชื่อพนักงาน",
      dataIndex: "staffName",
      key: "staffName",
      width: 160,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getTSBList();
    getShiftList();
    getPaymentMethodList();
    getAuditAdjustReasonList();
    setVehicleClassList(["4 ล้อ", "มากกว่า 4 ล้อ"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTSBList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setTsbList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getShiftList = async () => {
    setScroll({ x: 1500 });
    try {
      setLoading(true);
      const res = await getShiftList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setShiftList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list, prefixText: 'Total', secondText: 'rows', count: list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000013B(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentMethodList = async () => {
    try {
      setLoading(true);
      const res = await getPaymentmethodListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setPaymentMethodList(res.list);
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAuditAdjustReasonList = async () => {
    try {
      setLoading(true);
      const res = await getAuditAdjustReasonAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setAuditAdjustReasonList(res.list);
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      operationDate: _timeZoneThai(value.operatorDate),
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      shiftId: value.shiftNo === "ทั้งหมด" ? null : value.shiftNo,
    };
    getDataInfo(dataOutput);
  };

  const action = [{}];

  const save = async (data) => {
    try {
      const body = {
        operationDate: selectRecord.operationDate,
        staffId: selectRecord.staffId,
        tsbId: selectRecord.tsbId,
        shiftId: selectRecord.shiftId,
        paymentmethodId: data.paymentmethodId ? data.paymentmethodId : null,
        amount: data.amount ? data.amount : null,
        auditAdjustReasonId: data.auditAdjustReasonId ? data.auditAdjustReasonId : null,
        remark: data.remark ? data.remark : null,
      };
      const res = await POST_SAVE_M060000013B(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ! ",
        });
        setLoading(false);
        handleOnFinish(initialValue);
        form.resetFields();
        setVisiblePopup(false);
        setSelectRecord(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ!",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((data) => {
        save(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => { }}
          />
        </div>
        <Modal
          maskClosable={false}
          centered
          footer={false}
          visible={visiblePopup}
          onCancel={() => {
            form.resetFields();
            setVisiblePopup(false);
            setSelectRecord(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={form}
          >
            {selectRecord ? (
              <Row>
                <Col span={5}>
                  <div className="mb-3 ant-form-item-label">
                    <label>วันที่ปฏิบัติงาน</label>
                    {` : ${!_isEmpty(selectRecord.operationDate) &&
                      _setYearThai(selectRecord.operationDate,dateFormat)
                      }`}
                  </div>
                </Col>
                <Col span={5}>
                  <div className="mb-3 ant-form-item-label">
                    <label>ผลัด</label>
                    {` : ${_isNull(selectRecord.shiftName)}`}
                  </div>
                </Col>
                <Col span={5}>
                  <div className="mb-3 ant-form-item-label">
                    <label>ด่าน</label>
                    {` : ${_isNull(selectRecord.tsbName)}`}
                  </div>
                </Col>
                <Col span={5}>
                  <div className="mb-3 ant-form-item-label">
                    <label>รหัสพนักงาน</label>
                    {` : ${_isNull(selectRecord.staffId)}`}
                  </div>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"ประเภทการชำระ"}
                    name={"paymentmethodId"}
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุประเภทการชำระ!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      size={60}
                      placeholder="ประเภทการชำระ..."
                      className="rounded-pill max-WS "
                    >
                      {paymentMethodList.map((val) => (
                        <Option value={val.paymentmethodId} key={val.paymentmethodId}>
                          {val.paymentmethodDescriptionTh}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"จำนวนเงิน(บาท)"}
                    name={"amount"}
                    rules={[{
                      required: true,
                      message: "กรุณาใส่จำนวนเงิน(บาท)!",
                    }]}
                  >
                    <Input
                      size={60}
                      placeholder="จำนวนเงิน(บาท)..."
                      className="rounded-pill max-WS "
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"ปรับปรุง"}
                    name={"auditAdjustReasonId"}
                    rules={[
                      {
                        required: false,
                        message: "กรุณาระบุปรับปรุง!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      size={60}
                      placeholder="ปรับปรุง..."
                      className="rounded-pill max-WS "
                    >
                      {auditAdjustReasonList.map((val) => (
                        <Option value={val.auditAdjustReasonId} key={val.auditAdjustReasonId}>
                          {val.description}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"หมายเหตุ"}
                    name={"remark"}
                    rules={[{ required: false }]}
                  >
                    <Input
                      size={60}
                      placeholder="หมายเหตุ..."
                      className="rounded-pill max-WS "
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={<div></div>}>
                    <Button
                      style={{ marginTop: -30 }}
                      htmlType="submit"
                      size="middle"
                      type="primary"
                      onClick={handleSubmit}
                    >
                      บันทึก
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

            </Row>
          </Form>
        </Modal>

      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditPassingTransactionSodAmount);
