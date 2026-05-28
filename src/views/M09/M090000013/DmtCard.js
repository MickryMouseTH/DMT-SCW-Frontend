/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import {
  Table, Button, Row, Col,
  Input, Modal, Select,
  Form, Popconfirm
} from "antd";
import Skeleton from "../../../components/loading/Loading";
import { DeleteFilled } from "@ant-design/icons";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import {
  GET_DATA_INFO_M090000013
  , GET_PLAZA_LIST_M090000013
  , SAVE_M090000013
  , DELETE_M090000013
} from "../../../service/api/report";
import { _isNull, _setYearThai } from "../../../tools/util";

const { Option } = Select;

const ResetPasswordUsers = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carClassList, setCarClassList] = useState([]);
  const [plazaList, setPlazaList] = useState([]);
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({});
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [form] = Form.useForm();

  const fields = [
    {
      type: "input",
      option: {
        name: "carNo",
        label: "หมายเลขข้างรถ",
        childrenProps: { placeholder: "ป้อนหมายเลขข้างรถ..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขข้างรถ!" }],
        initialValue: initialValue.carNo,
      },
    }
  ];

  const columns = [
    {
      title: "ลำดับ",
      key: "order",
      dataIndex: "order",
      width: 25,
      align: "center",
      render: (text) =>
        <div className='text-center'>
          {_isNull(text)}
        </div>
    },
    {
      title: "หมายเลขข้างรถ",
      key: "carNo",
      dataIndex: "carNo",
      width: 50,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ทะเบียนรถ",
      key: "licensePlate",
      dataIndex: "licensePlate",
      width: 50,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "หน่วยงาน/แผนก",
      key: "department",
      dataIndex: "department",
      width: 80,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ฝ่าย/สังกัด",
      key: "affiliation",
      dataIndex: "affiliation",
      width: 80,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ประเภทรถ",
      key: "carClass",
      dataIndex: "carClass",
      width: 50,
      align: "center",
      render: (text) =>
        <div className='text-center'>
          {_isNull(text)}
        </div>
    },
    {
      title: "อนุญาตผ่านด่าน",
      key: "plazaAllow",
      dataIndex: "plazaAllow",
      width: 80,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "หมายเลขบัตร",
      key: "smartcardNo",
      dataIndex: "smartcardNo",
      width: 60,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "Update Date Time",
      key: "updateDatetime",
      dataIndex: "updateDatetime",
      width: 80,
      align: "center",
      render: (text) =>
      _setYearThai(text,"DD/MM/YYYY HH:mm"),
    },
    {
      title: "ยกเลิกบัตร",
      fixed: "right",
      key: "delete",
      dataIndex: "",
      width: 40,
      align: "center",
      render: (text, record) => (
        <span>

          <Popconfirm
            title="Sure to delete?"
            placement="topRight"
            onConfirm={() => handleDelete(record)}
          >
            <Button
              size="small"
              type="primary"
              ghost="true"
              icon={<DeleteFilled />}
              className="del-button mr-5"
            >
              ยกเลิก
            </Button>
          </Popconfirm>

        </span>
      ),
    },
  ];

  useEffect(() => {
    setScrollX({ x: 1300 })
    getDataPlazaList();
    getDataInfo();
    setCarClassList(["Class 1", "Class 2"]);
  }, []);

  const getDataPlazaList = async () => {
    const data = {
      networkId: 10,
    };
    try {
      setLoading(true);
      const res = await GET_PLAZA_LIST_M090000013(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setPlazaList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch PlazaList . ",
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
      carNo: data ? data.carNo : null
    };
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M090000013(dataOutput, props.auth.token);
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
      carNo: value.carNo,
    };
    getDataInfo(dataOutput);
    setInitialValue(value);
  };

  const handleOnSave = (value) => {
    setVisiblePopup(true);
  };

  const handleDelete = async (record) => {
    const dataOutput = {
      smartcardNo: record ? record.smartcardNo : null
    };
    try {
      setLoading(true);
      const res = await DELETE_M090000013(
        dataOutput,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
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

  const handleSave = async (dataOutput) => {
    try {
      setLoading(true);
      const dataReq = {
        carNo: dataOutput ? dataOutput.carNo : null,
        licensePlate: dataOutput ? dataOutput.licensePlate : null,
        carClass: dataOutput ? dataOutput.carClass : null,
        department: dataOutput ? dataOutput.department : null,
        affiliation: dataOutput ? dataOutput.affiliation : null,
        smartcardNo: dataOutput ? dataOutput.smartcardNo : null,
        plazaAllowList: plazaList
      };
      const res = await SAVE_M090000013(
        dataReq,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: res.status.message,
        });
        getDataInfo();
        form.resetFields();
        setVisiblePopup(false);
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


  const handleSubmit = () => {
    form
      .validateFields()
      .then((data) => {
        handleSave(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

  const handleInputCheckboxChange = (value) => {
    const target = value.target;
    console.log(target.name);
    console.log(target.checked);
    const newObj = [...plazaList];
    const _newObj = newObj.map(item => {
      let _item = { ...item }
      if (_item.abbreviation === target.name) {
        _item.checked = !_item.checked
        return _item
      } else if (target.name === 'plazaAll'){
        _item.checked = target.checked
        return _item
      } else{
        return _item
      }
    });
    setPlazaList([..._newObj])
  }

  const actionBoutton = [{
    name: "เพิ่มบัตร",
    props: {
      type: "primary",
      ghost: false,
      onClick: handleOnSave
    },
  }];

  return (
    <Skeleton loading={loading} active>
      <div>

        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnSearch}
          action={actionBoutton}
        />
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

      <Modal
        maskClosable={false}
        centered
        footer={false}
        visible={visiblePopup}
        onCancel={() => {
          setVisiblePopup(false);
        }}
        width={600}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          layout="vertical"
          className="custom-ant-form"
          size="large"
          form={form}
        >
          <Row gutter={24} justify="start" type="flex" className="w-100">
            <Col span={12}>
              <Form.Item
                className="mb-3"
                label={"หมายเลขข้างรถ : "}
                name={"carNo"}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกหมายเลขข้างรถ!",
                  },
                ]}
              >
                <Input
                  size={100}
                  placeholder="หมายเลขข้างรถ..."
                  className="rounded-pill max-WS "
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="mb-3"
                label={"ทะเบียนรถ : "}
                name={"licensePlate"}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกทะเบียนรถ!",
                  },
                ]}
              >
                <Input
                  size={100}
                  placeholder="ทะเบียนรถ..."
                  className="rounded-pill max-WS "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24} justify="start" type="flex" className="w-100">
            <Col span={12}>
              <Form.Item
                className="mb-3"
                label={"ประเภทรถ : "}
                name={"carClass"}
                rules={[
                  {
                    required: true,
                    message: "กรุณาใส่ประเภทรถ!",
                  },
                ]}
              >
                <Select
                  allowClear
                  size={60}
                  placeholder="ประเภทรถ..."
                  className="rounded-pill max-WS "
                >
                  {carClassList.map((val) => (
                    <Option value={val} key={val}>
                      {val}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="mb-3"
                label={"ฝ่าย/สังกัด : "}
                name={"department"}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกฝ่าย/สังกัด!",
                  },
                ]}
              >
                <Input
                  size={100}
                  placeholder="ฝ่าย/สังกัด..."
                  className="rounded-pill max-WS "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24} justify="start" type="flex" className="w-100">
            <Col span={24}>
              <Form.Item
                className="mb-3"
                label={"หน่วยงาน/แผนก : "}
                name={"affiliation"}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกหน่วยงาน/แผนก!",
                  },
                ]}
              >
                <Input
                  size={100}
                  placeholder="หน่วยงาน/แผนก..."
                  className="rounded-pill max-WS "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24} justify="start" type="flex" className="w-100">
            <Col span={24}>
              <Form.Item
                className="mb-3"
                label={"หมายเลขบัตร : "}
                name={"smartcardNo"}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกหมายเลขบัตร!",
                  },
                ]}
              >
                <Input
                  size={100}
                  placeholder="หมายเลขบัตร..."
                  className="rounded-pill max-WS "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24} justify="start" type="flex" className="w-100">
            <Col span={24}>
              <Form.Item
                className="mb-3"
                label={"อนุญาติผ่านด่าน : "}
                rules={[
                  {
                    required: false,
                    message: "กรุณากรอกอนุญาติผ่านด่าน!",
                  },
                ]}
              >
                <label>
                  <Input
                    name="plazaAll"
                    type="checkbox"
                    size={100}
                    className="rounded-pill max-WS "
                    onChange={handleInputCheckboxChange}
                  />
                  &nbsp;&nbsp;ทั้งหมด
                </label>
              </Form.Item>
            </Col>
          </Row>

          {plazaList.map((val) => (
            <Row gutter={24} justify="start" type="flex" className="w-100">
              <Col span={24}>
                <Form.Item
                  className="mb-3"
                >
                  <label text="">
                    <Input
                      name={val.abbreviation}
                      type="checkbox"
                      size={100}
                      className="rounded-pill max-WS "
                      checked={val.checked}
                      onChange={handleInputCheckboxChange}
                    />
                    &nbsp;&nbsp;{val.abbreviation}
                  </label>
                </Form.Item>
              </Col>
            </Row>
          ))}

          <Row gutter={24} justify="start" type="flex" className="w-100">
            <Col span={7}>
              <Form.Item label={<div></div>}>
                <Button
                  style={{ marginTop: -30 }}
                  htmlType="submit"
                  size="middle"
                  type="primary"
                  onClick={handleSubmit}
                >
                  ยืนยัน
                </Button>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label={<div></div>}>
                <Button
                  style={{ marginTop: -30 }}
                  htmlType="submit"
                  size="middle"
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                    setVisiblePopup(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>


    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordUsers);
