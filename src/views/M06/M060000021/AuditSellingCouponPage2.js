/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table, Form, Modal, Row, Col, Input } from "antd";
import Skeleton from "../../../components/loading/Loading";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_COUPON_M060000021, SAVE_ADJUST_COUPON_M060000021 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
const { Text } = Typography;

const AuditSellingCouponPage2 = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);
  const [form] = Form.useForm();

  const fields = [];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "Plaza",
      fixed: true,
      key: "tsbName",
      dataIndex: "tsbName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ขาย",
      fixed: true,
      key: "trxDate",
      dataIndex: "trxDate",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "พนักงาน",
      key: "staffNo",
      dataIndex: "staffNo",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
        {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ประเภทคูปอง",
      dataIndex: "couponType",
      key: "couponType",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      width: 50,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "หมายเลขเล่ม",
      dataIndex: "couponSerialNo",
      key: "couponSerialNo",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 80,
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setSelectRecord(record);
              setVisiblePopup(true);
            }}
          >
            แก้ไขหมายเลขเล่ม
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setScroll({ x: 1500, y: 600 });    
    getDataInfo(props.location.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const handleAdjust = async () => {
    try {
      console.log("onclick handleAdjust ");
      form
      .validateFields()
      .then((data) => {
        saveAdjust(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveAdjust = async (data) => {
    try {
      setLoading(true);      
      const dataOutput = {
        couponSerialNo: data.couponSerialNo,
        id: selectRecord.id,
      };
      const res = await SAVE_ADJUST_COUPON_M060000021(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "แก้ไขหมายเลขเล่มสำเร็จ! ",
        });
        setLoading(false);
        setVisiblePopup(false);
        setSelectRecord(null);
        form.resetFields();
        getDataInfo(props.location.data);
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

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_COUPON_M060000021(data, props.auth.token);
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

  const goBack = () => {
    props.history.push({
      pathname: `/reports/audit-selling-coupon`,
      value: props.location.value
    });
  }

  const action = [{}];

  return (
    <Skeleton loading={loading} active>
      <div>

        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="Back"
          fields={fields}
          onFinish={goBack}
          action={action}
        />

        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            // scroll={scroll}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            // pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={1}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={4} className="text-left" index={1}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
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
          width={700}
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
                <Row gutter={24} justify="start" type="flex" className="w-100">
                  <Col span={8}>
                    <div className="mb-3 ant-form-item-label">
                      <label>ด่าน</label>
                      {` : ${_isNull(selectRecord.tsbName)}`}
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="mb-3 ant-form-item-label">
                      <label>วันที่ขาย</label>
                      {` : ${_isNull(selectRecord.trxDate)}`}
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="mb-3 ant-form-item-label">
                      <label>ประเภทคูปอง</label>
                      {` : ${_isNull(selectRecord.couponType)}`}
                    </div>
                  </Col>
                </Row>
              </Row>
            ) : (
              <></>
            )}
            <Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={14}>
                <Form.Item
                  className="mb-3"
                  label={"หมายเลขเล่ม"}
                  name={"couponSerialNo"}
                  rules={[{ required: true, message: "กรุณาระบุหมายเลขเล่ม!" }]}
                >
                  <Input
                    size={60}
                    placeholder="หมายเลขเล่ม..."
                    className="rounded-pill max-WS "
                  />
                </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label={<div></div>}>
                    <Button
                      style={{ marginTop: -30 }}
                      htmlType="submit"
                      size="middle"
                      type="primary"
                      onClick={handleAdjust}
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
)(AuditSellingCouponPage2);
