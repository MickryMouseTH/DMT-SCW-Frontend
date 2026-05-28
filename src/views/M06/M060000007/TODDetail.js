/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Typography, Button, Row, Modal, Form, Col, Input } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_TOD_DETAIL_M060000007 } from "../../../service/api/report";
import { GET_DATA_ADJUST_SAVE_M060000007 } from "../../../service/api/report";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const TODReports = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState({});
  const [selectRecord, setSelectRecord] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [form] = Form.useForm();

  const fields = [];

  const columns = [
    {
      title: "ด่าน",
      fixed: "left",
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              {_isNull(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "วันที่ของรายได้",
      key: "operationalDate",
      dataIndex: "operationalDate",
      width: 100,
      align: "center",
      render: (text) => _isEmpty(text) ? "" : _setYearThai(text,"DD/MM/YYYY"),
    },
    {
      title: "กะ",
      key: "shiftTypeName",
      dataIndex: "shiftTypeName",
      width: 50,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "รหัสพนักงาน",
      key: "staffId",
      dataIndex: "staffId",
      width: 100,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ชื่อพนักงาน",
      key: "staffNameTh",
      dataIndex: "staffNameTh",
      width: 150,
      align: "center",
      render: (text) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "ถุงเงิน",
      key: "moneyBagNo",
      dataIndex: "moneyBagNo",
      width: 70,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ประเภทการนำส่ง",
      key: "declareType",
      dataIndex: "declareType",
      width: 120,
      align: "center",
      render: (text) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "SOD",
      key: "sod ",
      dataIndex: "sod",
      width: 100,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "MCC",
      key: "mcc",
      dataIndex: "mcc",
      width: 100,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
  ];

  useEffect(() => {
    getDataTodDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataTodDetail = async () => {
    try {
      setScroll({ x: 1300 });
      setLoading(true);
      const body = {
        seckey: `${props.match.params.id}`,
      };
      const res = await GET_DATA_TOD_DETAIL_M060000007(
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

  const handleOnFinish = (value) => {

  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((data) => {
        adjustSave(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

  const goBack = () => {
    props.history.push({
      pathname: `/reports/compare-revenue-shipping-companies-with-system-finance`,
      value: props.location.value
    });
  }

  const adjustSave = async (data) => {
    try {
      const body = {
        seckey: selectRecord.seckey2,
        adjustAmount: data.adjustAmount ? data.adjustAmount : null,
        adjustRemark: data.adjustRemark ? data.adjustRemark : null,
      };
      const res = await GET_DATA_ADJUST_SAVE_M060000007(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ! ",
        });
        setLoading(false);
        getDataTodDetail();
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

  const action = [];

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
        <Row>
          <Col xs={18} md={18} lg={18}>
            <h3>{`การปรับปรุงรายการโดยฝ่ายการเงิน`}</h3>
            <h3>
              {" "}
              {`${dataSource.header ? dataSource.header : ""}`}{" "}
            </h3>
            <Button onClick={goBack} className="m-15 ml-0 back-button-custom">
              Back
        </Button>
          </Col>
        </Row>
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={columns.length > 12 ? scroll : false}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      <Text type="secondary" align="center">
                        {dataSource.list.length}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left">
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
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
            <Row style={{ marginBottom: 30 }}>
              <Col span={8}>
                <div className="mb-3">
                  {`ด่าน : ${_isNull(selectRecord.plazaAbbreviation2)}`}
                </div>
              </Col>
              <Col span={8}>
                <div className="mb-3">
                  {`วันที่ของรายได้ : ${!_isEmpty(selectRecord.operationalDate2) &&
                    _setYearThai(selectRecord.operationalDate2,dateFormat)
                    }`}
                </div>
              </Col>
              <Col span={8}>
                <div className="mb-3">
                  {`ประเภทการนำส่ง : ${_isNull(selectRecord.declareType)}`}
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
                  label={"จำนวน"}
                  name={"adjustAmount"}
                  rules={[{ required: true }]}
                >
                  <Input
                    size={60}
                    placeholder="จำนวน..."
                    className="rounded-pill max-WS "
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  className="mb-3"
                  label={"หมายเหตุ"}
                  name={"adjustRemark"}
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

    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TODReports);
