/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table, Button, Row, Col, Input, Typography, Popconfirm } from "antd";
import Skeleton from "../../../components/loading/Loading";
import { DeleteFilled } from "@ant-design/icons";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import {
  GET_DATA_INFO_M090000012
  , GET_PROMOTIONS_TYPE_LIST_M090000012
  , SAVE_M090000012
  , DELETE_M090000012
} from "../../../service/api/report";
import moment from "moment";
import { _isEmpty, _isNull, _timeZoneThai, _setYearThai } from "../../../tools/util";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ResetPasswordUsers = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promotionsTypeList, setPromotionsTypeList] = useState([]);
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({})
  const [messageLine01, setMessageLine01] = useState('');
  const [messageLine02, setMessageLine02] = useState('');
  const [messageLine03, setMessageLine03] = useState('');
  const [messageLine04, setMessageLine04] = useState('');
  const [qrCode, setQrCode] = useState('');



  const fields = [

    {
      type: "datePicker2",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.startDate,
      },
    },
    {
      type: "datePicker2",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') },
          disabledDate: false
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
    {
      type: "select",
      option: {
        name: "promotionsTypeId",
        label: "ประเภทโปรโมชัน",
        childrenProps: {
          placeholder: "โปรดเลือกประเภทโปรโมชัน . . .",
          optionValue: {
            values: [...promotionsTypeList],
            keyName: "description",
            keyValue: "promotionsTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทโปรโมชัน!",
          },
        ],
        initialValue: _isEmpty(initialValue) ? 1 : initialValue.promotionsTypeId,
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      key: "order",
      dataIndex: "order",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-center'>
          {_isNull(text)}
        </div>
    },
    {
      title: "วันเวลาเริ่มต้น",
      key: "effectiveFromDatetime",
      dataIndex: "effectiveFromDatetime",
      width: 80,
      align: "center",
      render: (text) =>
      _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "วันเวลาสิ้นสุด",
      key: "effectiveToDatetime",
      dataIndex: "effectiveToDatetime",
      width: 80,
      align: "center",
      render: (text) =>
      _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "ประเภทโปรโมชัน",
      key: "promotionType",
      dataIndex: "promotionType",
      width: 70,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ข้อความสำหรับใบรับค่าธรรมเนียมผ่านทางพิเศษ",
      key: "message",
      dataIndex: "message",
      width: 180,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ข้อความสำหรับสร้าง QR Code",
      key: "qrCode",
      dataIndex: "qrCode",
      width: 160,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "วันเวลาบันทึก",
      key: "createDatetime",
      dataIndex: "createDatetime",
      width: 80,
      align: "center",
      render: (text) =>
      _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "ผู้บันทึก",
      key: "createBy",
      dataIndex: "createBy",
      width: 100,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ลบ",
      fixed: "right",
      key: "delete",
      dataIndex: "",
      width: 60,
      align: "center",
      render: (text, record) => (
        <span>

          <Popconfirm
            title="Sure to delete?"
            placement="topRight"
            onConfirm={() => handleDeletePromotion(record)}
          >
            <Button
              size="small"
              type="primary"
              ghost="true"
              icon={<DeleteFilled />}
              className="del-button mr-5"
            >
              ลบ
            </Button>
          </Popconfirm>

        </span>
      ),
    },
  ];

  useEffect(() => {
    setScrollX({ x: 1300 })
    getDataPromotionsTypeList();
    getDataInfo();
  }, []);

  const getDataPromotionsTypeList = async () => {
    const data = {
      networkId: 10,
    };
    try {
      setLoading(true);
      const res = await GET_PROMOTIONS_TYPE_LIST_M090000012(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setPromotionsTypeList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch PromotionsTypeList . ",
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

  const getDataInfo = async (data = null) => {

    const dataOutput = {
      networkId: 10,
      staffGroupId: data ? data.staffGroupId : null,
      staffId: data ? data.staffId : null
    };
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M090000012(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res.list);
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

  const handleOnSearch = (value) => {
    const dataOutput = {
      effectiveFromDatetime: _timeZoneThai(value.startDate),
      effectiveToDatetime: _timeZoneThai(value.endDate),
      promotionTypeId: value.promotionsTypeId,
      messageLine01: messageLine01,
      messageLine02: messageLine02,
      messageLine03: messageLine03,
      messageLine04: messageLine04,
      qrCode: qrCode
    };
    handleSavePromotion(dataOutput);
    value.startDate = moment("00:00:00", "HH:mm:ss");
    value.endDate = moment("23:59:59", "HH:mm:ss");
    setInitialValue(value);
  };

  const handleDeletePromotion = async (record) => {
    const dataOutput = {
      dmtptId: record ? record.dmtptId : null
    };
    try {
      setLoading(true);
      const res = await DELETE_M090000012(
        dataOutput,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "ลบโปรโมชั่นสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
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


  const handleSavePromotion = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await SAVE_M090000012(
        dataOutput,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "บันทึกโปรโมชั่นสำเร็จ",
          text: res.status.message,
        });
        setMessageLine01('');
        setMessageLine02('');
        setMessageLine03('');
        setMessageLine04('');
        setQrCode('');
        getDataInfo();
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

  const actionBoutton = [{}];

  return (
    <Skeleton loading={loading} active>
      <div>
        
      <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="บันทึก"
          fields={fields}
          onFinish={handleOnSearch}
          action={actionBoutton}
        />
        <Row className="d-flex justify-content-around" style={{ marginTop: 0, marginLeft: 0 }}>
          <Col span={24}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ข้อความสำหลับใบรับค่าธรรมเนียมผ่านทางพิเศษ</Text>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around" style={{ marginTop: 6, marginLeft: 0 }}>
          <Col span={24}>
            <Input onChange={event => setMessageLine01(event.target.value)}
              type="text"
              size={1000}
              placeholder="บรรทัดที่ 1 ..."
              className="rounded-pill max-w-50">
            </Input>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around" style={{ marginTop: 6, marginLeft: 0 }}>
          <Col span={24}>
            <Input onChange={event => setMessageLine02(event.target.value)}
              type="text"
              size={1000}
              placeholder="บรรทัดที่ 2 ..."
              className="rounded-pill max-w-50">
            </Input>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around" style={{ marginTop: 6, marginLeft: 0 }}>
          <Col span={24}>
            <Input onChange={event => setMessageLine03(event.target.value)}
              type="text"
              size={1000}
              placeholder="บรรทัดที่ 3 ..."
              className="rounded-pill max-w-50">
            </Input>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around" style={{ marginTop: 6, marginLeft: 0 }}>
          <Col span={24}>
            <Input onChange={event => setMessageLine04(event.target.value)}
              type="text"
              size={1000}
              placeholder="บรรทัดที่ 4 ..."
              className="rounded-pill max-w-50">
            </Input>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around" style={{ marginTop: 6, marginLeft: 0 }}>
          <Col span={24}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ข้อความสำหลับสร้าง QR Code</Text>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around" style={{ marginTop: 6, marginLeft: 0 }}>
          <Col span={24}>
            <Input onChange={event => setQrCode(event.target.value)}
              type="text"
              size={1000}
              placeholder="QR Code ..."
              className="rounded-pill max-w-50">
            </Input>
          </Col>
        </Row>
        <div className="mt-10">
          <Table
            size="small"
            rowKey={(ind) => ind}
            scroll={scrollX}
            columns={columns}
            bordered
            dataSource={dataSource
            }
          />
        </div>
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordUsers);
