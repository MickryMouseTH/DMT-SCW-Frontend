/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Typography, Table, Button, Row, Col, Input, Modal } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { RedoOutlined } from "@ant-design/icons";

import FormDefault from "../../../components/form/FormDefault/FormDefault";

import {
  GET_DATA_INFO_ManageResetPasswordStaff,
  RESET_PASSWORD_ManageResetPasswordStaff,
  GET_DATA_LIST_UserGroup,
} from "../../../service/api/user";

import { _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
const { Text } = Typography;

const ResetPasswordUsers = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [staffSelete, setStaffSelete] = useState({});
  const [loading, setLoading] = useState(false);
  const [staffGroup, setStaffGroup] = useState([]);
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({})
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);
  const [notifiedBy, setNotifiedBy] = useState('');
  const [note, setNote] = useState('');

  const fieldsSearch = [
    {
      type: "select",
      option: {
        name: "staffGroupId",
        label: "กลุ่มพนักงาน",
        childrenProps: {
          placeholder: "โปรดเลือกกลุ่มพนักงาน . . .",
          optionValue: {
            values: ["ทั้งหมด", ...staffGroup],
            keyName: "descriptionTh",
            keyValue: "staffGroupId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกกลุ่มพนักงาน!",
          },
        ],
        initialValue: _isEmpty(initialValue) ? "ทั้งหมด" : initialValue.staffGroupId,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "ป้อนข้อมูลรหัสพนักงานเพื่อค้นหา" },
        rules: [
          { required: false, message: "ป้อนข้อมูลรหัสพนักงานเพื่อค้นหา!" },
        ],
        initialValue: _isEmpty(initialValue) ? "" : initialValue.staffId,
      },
    },
  ];

  const columns = [
    {
      title: "รหัสพนักงาน",
      key: "staffId",
      dataIndex: "staffId",
      width: 60,
      align: "center",
      render: (text) =>
        <div className='text-center'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ชื่อ - นามสกุล",
      key: "fullNameTh",
      dataIndex: "fullNameTh",
      width: 70,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "รหัสกลุ่มพนักงาน",
      key: "staffGroupId",
      dataIndex: "staffGroupId",
      width: 60,
      align: "center",
      render: (text) =>
        <div className='text-center'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ชื่อกลุ่มพนักงาน",
      key: "staffGroupName",
      dataIndex: "staffGroupName",
      width: 100,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "แก้ไขโดย",
      key: "lastUpdateBy",
      dataIndex: "lastUpdateBy",
      width: 90,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "แก้ไขเมื่อวันที่",
      key: "lastUpdateDatetime",
      dataIndex: "lastUpdateDatetime",
      width: 80,
      align: "center",
      render: (text) =>
      _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Reset Password",
      fixed: "right",
      key: "Edit",
      dataIndex: "",
      width: 120,
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            size="small"
            type="primary"
            ghost="true"
            icon={<RedoOutlined />}
            className="del-button"
            onClick={() => {
              setSelectRecord(record);
              setVisibleDialog(true);
            }}
          >
            Reset Password
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setScrollX({ x: 1300 })
    getDataStaffGroup();
    getDataInfo();
  }, []);

  const getDataStaffGroup = async () => {
    const data = {
      networkId: 10,
    };
    try {
      setLoading(true);
      const res = await GET_DATA_LIST_UserGroup(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setStaffGroup(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch StaffGroupList . ",
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
      const res = await GET_DATA_INFO_ManageResetPasswordStaff(dataOutput, props.auth.token);
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
    setInitialValue(value);
    const dataOutput = {
      networkId: 10,
      staffGroupId: value.staffGroupId === "ทั้งหมด" ? null : value.staffGroupId,
      staffId: value.staffId ? value.staffId : null
    };
    getDataInfo(dataOutput);
  };

  const handleShowResetPasswordForm = async (dataOutput) => {

    try {
      setLoading(true);
      const res = await RESET_PASSWORD_ManageResetPasswordStaff(
        dataOutput,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "รีเซ็ตรหัสผ่านสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
        if (isSearch === false) {
          handleSwitchForm();
        }
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

  const handleSwitchForm = () => {
    setStaffSelete({});
    setIsSearch(!isSearch);
  };

  const actionBoutton = [{}];

  const handleFields = () => {
    return fieldsSearch;
  };

  const handleOnFinish = () => {
    return handleOnSearch;
  };
  const handleOnSubmit = () => {
    return "ค้นหา";
  };
  const handleOnTypeButton = () => {
    return isSearch ? "ghost" : _isEmpty(staffSelete) ? "primary" : "primary";
  };
  const handleAction = () => {
    return actionBoutton;
  };

  const onValuesChange = (changedValues) => {
    for (const [key] of Object.entries(changedValues)) {
      if (key === "networkId") {
      }
    }
  };

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          fields={handleFields()}
          onFinish={handleOnFinish()}
          onValuesChange={onValuesChange}
          actionBoutton={handleAction()}
          submitText={handleOnSubmit()}
          typeButton={handleOnTypeButton()}
          formWrapper={{ md: 24, lg: 14 }}
          buttonWrapper={{ md: 24, lg: 10 }}
          buttonSpan={{ span: 10 }}
          textAlign={"text-right"}
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

        <Modal
          title="Reset Password"
          centered
          footer={false}
          visible={visibleDialog}
          onCancel={() => {
            setVisibleDialog(false);
            setSelectRecord(null);
            setNotifiedBy('');
            setNote('');
          }
          }
          width={600}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectRecord ? (
            <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
              <Col span={24}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>รหัสพนักงาน : &nbsp;</Text>
                <Text>{_isNull(selectRecord.staffId)}</Text>
              </Col>
            </Row>
          ) : (<></>)}

          {selectRecord ? (
            <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
              <Col span={24}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ชื่อพนักงาน : &nbsp;</Text>
                <Text>{_isNull(selectRecord.fullNameTh)}</Text>
              </Col>
            </Row>
          ) : (<></>)}

          {selectRecord ? (
            <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
              <Col span={24}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>กลุ่มพนักงาน : &nbsp;</Text>
                <Text>{_isNull(selectRecord.staffGroupName)}</Text>
              </Col>
            </Row>
          ) : (<></>)}

          {selectRecord ? (
            <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
              <Col span={24}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>แจ้งโดย : &nbsp;</Text>
                <Input onChange={event => setNotifiedBy(event.target.value)}
                  type="text"
                  size={500}
                  placeholder="แจ้งโดย..."
                  className="rounded-pill max-WS ">
                </Input>
              </Col>
            </Row>
          ) : (<></>)}

          {selectRecord ? (
            <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
              <Col span={24}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>หมายเหตุ : &nbsp;</Text>
                <Input onChange={event => setNote(event.target.value)}
                  type="text"
                  size={1000}
                  placeholder="หมายเหตุ..."
                  className="rounded-pill max-WS">
                </Input>
              </Col>
            </Row>
          ) : (<></>)}

          {selectRecord ? (
            <Row className="d-flex justify-content-around">
              <Col span={12} className="d-flex justify-content-center">
                <Button
                  style={{ marginTop: 30, marginLeft: 10 }}
                  htmlType="submit"
                  size="middle"
                  type="primary"
                  onClick={() => {
                    const dataOutput = {
                      networkId: 10,
                      plazaId: selectRecord.plazaId,
                      staffId: selectRecord.staffId,
                      notifiedBy: notifiedBy,
                      note: note
                    };
                    handleShowResetPasswordForm(dataOutput);
                    setVisibleDialog(false);
                    setSelectRecord(null);
                    setNotifiedBy('');
                    setNote('');
                  }}
                >
                  ยืนยัน
                </Button>
              </Col>
              <Col span={12} className="d-flex justify-content-center">
                <Button
                  style={{ marginTop: 30, marginLeft: 10 }}
                  htmlType="submit"
                  size="middle"
                  type="primary"
                  onClick={() => {
                    setVisibleDialog(false);
                    setSelectRecord(null);
                    setNotifiedBy('');
                    setNote('');
                  }}
                >
                  ยกเลิก
                </Button>
              </Col>
            </Row>
          ) : (<></>)}
        </Modal>

      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordUsers);
