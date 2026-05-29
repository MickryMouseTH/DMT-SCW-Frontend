/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
// import { useHistory } from "react-router-dom";
import {
  Table,
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Select,
  Input,
} from "antd";
import Skeleton from "../../../components/loading/Loading"

import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import FullscreenVideoModal from "../../../components/imagePreview/FullscreenVideoModal";
import {
  GET_DATA_TOLL_AUDIT_MTC_SUB_ADJ_DETAIL_M060000006,
  POST_SUB_ADJUST_DETAIL_SAVE_M060000006,
  POST_SUB_ADJUST_DETAIL_SAVE_ALL_M060000006,
} from "../../../service/api/report";
import {
  getVehicleTypeList_API,
  getEventAbnormalListAPI,
} from "../../../service/api/util";

const { Text } = Typography;
const { Option } = Select;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const TollAuditMtcSupAdjustDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, 
    // setPreviewVdo
  ] = useState("");
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [fullscreenVdo, setFullscreenVdo] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [selectRecord, setSelectRecord] = useState(null);
  const [form] = Form.useForm();
  const [eventAbnormalList, setEventAbnormalList] = useState([]);

  const columnsSubAdjDetail = [
    {
      title: <b>ด่าน</b>,
      key: "plazaName",
      dataIndex: "plazaName",
      align: "center",
      width: 200,
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <div style={{ textAlign: "center" }}>
              <Text type="secondary" align="right">
                {_isNull(text)}
              </Text>
            </div>
          ),
        };
      },
    },
    {
      title: <b>ช่องทาง</b>,
      key: "laneName",
      dataIndex: "laneName",
      align: "center",
      width: 80,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
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
      title: <b>วันที่ เวลา</b>,
      key: "trxDateTime",
      dataIndex: "trxDateTime",
      align: "center",
      width: 200,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {!_isEmpty(text) && _setYearThai(text,dateFormat)}
        </div>
      ),
    },
    {
      title: <b>nTrx</b>,
      key: "nTrx",
      dataIndex: "nTrx",
      align: "center",
      width: 60,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
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
      title: <b>TC Class</b>,
      key: "tcClass",
      dataIndex: "tcClass",
      align: "center",
      width: 120,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
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
      title: <b>AVC Class</b>,
      key: "avcClass",
      dataIndex: "avcClass",
      align: "center",
      width: 120,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
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
      title: <b>เหตุการณ์</b>,
      key: "event",
      dataIndex: "event",
      align: "center",
      width: 120,
      render: (text, record) => (
        <div
          style={{ textAlign: "left", cursor: "pointer" }}
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
      title: <b>Sup.Adjust</b>,
      key: "supAdjust",
      dataIndex: "supAdjust",
      align: "center",
      width: 250,
      ellipsis: true,
      render: (text, record) => (
        <div
          style={{ textAlign: "left", cursor: "pointer" }}
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
      title: <b>Audit.Adjust</b>,
      key: "auditAdjust",
      dataIndex: "auditAdjust",
      align: "center",
      width: 250,
      ellipsis: true,
      render: (text) => (
        <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ราคาเดิม</b>,
      key: "price",
      dataIndex: "price",
      align: "center",
      width: 90,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ราคา Sup.</b>,
      key: "priceSup",
      dataIndex: "priceSup",
      align: "center",
      width: 90,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ราคา Audit</b>,
      key: "priceAudit",
      dataIndex: "priceAudit",
      align: "center",
      width: 90,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ราคาใหม่</b>,
      key: "priceNew",
      dataIndex: "priceNew",
      align: "center",
      width: 90,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>รหัสพนักงาน</b>,
      key: "staffId",
      dataIndex: "staffId",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>รหัส Sup.</b>,
      key: "supId",
      dataIndex: "supId",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ภาพนิ่ง</b>,
      dataIndex: "images",
      key: "images",
      width: 150,
      align: "center",
      render: (text) => (
        <span>
          <Button
            size="small"
            type="primary"
            onClick={() => previewImage(text)}
          >
            View
          </Button>
        </span>
      ),
    },
    {
      title: "วีดีโอ",
      dataIndex: "videoUrl",
      key: "videoUrl",
      width: 150,
      align: "center",
      render: (text) => (
        <span>
          <Button
            size="small"
            type="primary"
            onClick={() => previewVideo(text)}
          >
            View
          </Button>
        </span>
      ),
    },
  ];

  const getVehicleTypeList = async () => {
    try {
      setLoading(true);
      const res = await getVehicleTypeList_API(
        { networkId: 10 },
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        setVehicleTypeList(res.list);
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

  const subAdjDetailSave = async (data) => {
    try {
      const body = {
        seckey: selectRecord.seckey,
        auditAdjust: data.auditAdjust ? data.auditAdjust : null,
        auditDetail: data.auditDetail ? data.auditDetail : null,
        auditRemark: data.auditRemark ? data.auditRemark : null,
        amount: data.amount ? data.amount : null,
      };
      const res = await POST_SUB_ADJUST_DETAIL_SAVE_M060000006(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ! ",
        });
        setLoading(false);
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

  const subAdjDetailSaveAll = async (data) => {
    try {
      const body = {
        staffId: dataSource.staffId,
        operationDate: dataSource.operationDate,
        shiftId: dataSource.shiftId,
        bagNo: dataSource.bagNo,
        tsbId: dataSource.tsbId,
      };
      const res = await POST_SUB_ADJUST_DETAIL_SAVE_ALL_M060000006(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "ตรวจสอบทั้งหมดสำเร็จ! ",
        });
        getDataTollAuditMTCSubAdj();
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

  useEffect(() => {
    getVehicleTypeList();
    getDataTollAuditMTCSubAdj();
    getEventAbnormalList();
  }, []);

  const getDataTollAuditMTCSubAdj = async (data) => {
    try {
      setLoading(true);
      const body = {
        seckey: `${props.match.params.id + '-' + (data ? data.eventId : 1)}`,
      };
      const res = await GET_DATA_TOLL_AUDIT_MTC_SUB_ADJ_DETAIL_M060000006(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
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

  const getEventAbnormalList = async () => {
    try {
      setLoading(true);
      const res = await getEventAbnormalListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setEventAbnormalList(res.list);
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

  const previewImage = (images) => {
    setPreviewImg(images);
    setVisible(true);
  };

  const previewVideo = (videoUrl) => {
    setFullscreenVdo(videoUrl);
    // setPreviewVdo(videoUrl);
    // setVisibleVdo(true);
  };

  const previewImageNewPage = (url) => {
    setFullscreenImg(url);
  }

  const handleOnCheckFinish = () => {
    subAdjDetailSaveAll();
  };

  const handleOnClickBack = () => {
    props.history.push({
      pathname: `/reports/toll-audit-mtc/sup-adj/${props.location.value.seckey}`,
      value: props.location.value
    });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((data) => {
        subAdjDetailSave(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

  const handleOnChangeEvent = () => {
    form
      .validateFields()
      .then((data) => {
        getDataTollAuditMTCSubAdj(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

  return (
    <Skeleton loading={loading} active>
      <Row gutter={24}>
        <Col xs={13} md={13} lg={13}>
          <h3>{`รายการผ่านทางผิดปรกติ ที่แก้ไขโดยพนักงานควบคุม (Supervisor adjustment)`}</h3>
          <h3>
            {" "}
            {`${dataSource.header1 ? dataSource.header1 : ""}`}{" "}
            {`${dataSource.header2 ? dataSource.header2 : ""}`}{" "}
            <br />
            {`${dataSource.header3 ? dataSource.header3 : ""}`}
          </h3>
        </Col>
        <Col xs={5} md={5} lg={5}>
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={form}
          >
            <Form.Item
              className="mb-3"
              label={"เหตุการณ์"}
              name={"eventId"}
              rules={[
                {
                  required: false,
                  message: "กรุณาเลือกเหตุการณ์!",
                },
              ]}
            >
              <Select
                allowClear
                size={60}
                placeholder="เลือกเหตุการณ์..."
                className="rounded-pill max-WS "
                onChange={() => handleOnChangeEvent()}
                defaultValue={1}
              >
                {eventAbnormalList.map((val) => (
                  <Option value={val.eventId} key={val.eventId}>
                    {val.descriptionTh}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={3} md={3} lg={3}>
          <Button className="mt-20"
            style={{ float: "right" }}
            size="large"
            type="default"
            onClick={() => handleOnClickBack()}
          >
            ย้อนกลับ
          </Button>
        </Col>
        <Col xs={3} md={3} lg={3}>
          <Button className="mt-20"
            style={{ float: "right" }}
            size="large"
            type="primary"
            onClick={() => handleOnCheckFinish()}
          >
            ตรวจสอบทั้งหมด
          </Button>
        </Col>
      </Row>
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          scroll={{ x: 1500 }}
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsSubAdjDetail}
          bordered
          dataSource={dataSource.list}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: _isEmpty(dataSource.list) ? false : true,
            position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
          }}
        />
      </div>
      <Modal
        title="Image Preview"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1300}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Row className="d-flex justify-content-around">
          {previewImg.map((item, idx) => (
            <Col span={8} key={idx}>
              <Col className="d-flex justify-content-center" span={24}>
                <img style={{cursor: 'pointer'}} src={item} alt={idx} width="100%" height="100%" onClick={() => previewImageNewPage(item)} />
              </Col>
              <Col
                className="text-center"
                style={{ padding: "0 30px" }}
                span={24}
              >
                {item}
              </Col>
            </Col>
          ))}
        </Row>
      </Modal>
      <Modal
        title="Video Preview"
        centered
        visible={visibleVdo}
        onOk={() => setVisibleVdo(false)}
        onCancel={() => setVisibleVdo(false)}
        width={1300}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Row className="d-flex justify-content-around">
          {
            <Col span={8}>
              <Col className="d-flex justify-content-center" span={24}>
                <img
                  src={previewVdo}
                  alt={previewVdo}
                  width="100%"
                  height="100%"
                />
              </Col>
            </Col>
          }
        </Row>
      </Modal>
      <Modal
        maskClosable={false}
        centered
        footer={false}
        visible={visiblePopup}
        onCancel={() => {
          form.resetFields();
          setVisiblePopup(false);
          setSelectRecord(null);
          getDataTollAuditMTCSubAdj();
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
                <div className="mb-3">
                  {`วันที่-เวลา : ${!_isEmpty(selectRecord.trxDateTime) &&
                    _setYearThai(selectRecord.trxDateTime,dateFormat)
                    }`}
                </div>
              </Col>
              <Col span={2}>
                <div className="mb-3">
                  {`No.Trx : ${_isNull(selectRecord.nTrx)}`}
                </div>
              </Col>
              <Col span={13}>
                <div className="mb-3">
                  {`การแก้ไขโดยพนักงานควบคุม : ${_isNull(
                    selectRecord.supAdjust
                  )} ${_isNull(selectRecord.supAdjDetail)
                    ? `(${_isNull(selectRecord.supAdjDetail)})`
                    : _isNull(selectRecord.supAdjDetail)
                    }`}
                </div>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          <Row>
            <Row gutter={24} justify="start" type="flex" className="w-100">
              <Col span={7}>
                <Form.Item
                  className="mb-3"
                  label={"ฝ่ายตรวจสอบแก้ไขเป็น"}
                  name={"auditAdjust"}
                  rules={[
                    {
                      required: false,
                      message: "กรุณาใส่ฝ่ายตรวจสอบแก้ไขเป็น!",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    size={60}
                    placeholder="ฝ่ายตรวจสอบแก้ไขเป็น..."
                    className="rounded-pill max-WS "
                  >
                    {vehicleTypeList.map((val) => (
                      <Option value={val.vehicleTypeId} key={val.vehicleTypeId}>
                        {val.descriptionTh}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  className="mb-3"
                  label={"จำนวนเงิน"}
                  name={"amount"}
                  rules={[{ required: false }]}
                >
                  <Input
                    size={60}
                    placeholder="จำนวนเงิน..."
                    className="rounded-pill max-WS "
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  className="mb-3"
                  label={"หมายเหตุ"}
                  name={"auditRemark"}
                  rules={[{ required: false }]}
                >
                  <Input
                    size={60}
                    placeholder="หมายเหตุ..."
                    className="rounded-pill max-WS "
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
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
            {/* v1.5.13 — fullscreen image popup (replaces window.open) */}
        <FullscreenImageModal
          src={fullscreenImg}
          onClose={() => setFullscreenImg(null)}
        />
        {/* v1.5.16 — fullscreen video popup (MJPEG via <img>); replaces window.open */}
        <FullscreenVideoModal
          src={fullscreenVdo}
          onClose={() => setFullscreenVdo(null)}
        />
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
)(TollAuditMtcSupAdjustDetail);
