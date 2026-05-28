/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table, Button, Modal, Row, Col, Pagination, Input, Form } from "antd";
import Skeleton from "../../../components/loading/Loading"

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M080000018_Page_Search, GET_DATA_INFO_M080000018_SEND_CS, GET_DATA_INFO_M080000018_CHANGE_SIGNAL_CODE } from "../../../service/api/report";
import {
  getPlazaListAPI,
} from "../../../service/api/util";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai } from "../../../tools/util";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const PassingTransactions = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([])
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([])
  const [visibleSendCs, setVisibleSendCs] = useState(false);
  const [visibleChangeSignalCode, setVisibleChangeSignalCode] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);
  const [pan, setPan] = useState(null);
  const [remark, setRemark] = useState(null);
  const [form] = Form.useForm();


  const [PagintaionSize, setPaginationSize] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [dataSearch, setDataSearch] = useState({})
  const [totalPage, setTotalPage] = useState(0)

  const fields = [
    {
      type: "select",
      option: {
        name: "plaza",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "plazaNameTh",
            keyValue: "plazaId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.plaza
        // initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "lane",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.lane,
      },
    },
    {
      type: "datePicker",
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
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
    {
      type: "input",
      option: {
        name: "nTrx",
        label: "nTrx",
        childrenProps: { placeholder: "nTrx..." },
        rules: [{ required: false, message: "กรุณาป้อน nTrx!" }],
        initialValue: initialValue.nTrx,
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      fixed: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ด่าน",
      fixed: true,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 60,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ช่องทาง",
      fixed: true,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "Ntrx",
      dataIndex: "nTrx",
      key: "nTrx",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "วันที่ผ่านทาง",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 150,
      align: "center",
      // render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      render: (text) =>
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 40,
      align: "center",
      render(text) {
        return {
          children: (
            <div className='text-right'>
              {_isZero(text)}
            </div>
          ),
        };
      },
    },
    {
      title: "สัญญาณการผ่านทาง",
      dataIndex: "signalCode",
      key: "signalCode",
      width: 100,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_PlusZero(text)}
        </div>
      )
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "toll",
      key: "toll",
      width: 70,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "PAN",
      dataIndex: "ref1Pan",
      key: "ref1Pan",
      width: 160,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ภาพนิ่ง",
      dataIndex: "percentClose",
      key: "percentClose",
      width: 120,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => previewImage(record)}>
            View
          </Button>
        </span>
      ),
    },
    {
      title: "วีดีโอ",
      dataIndex: "percentClose",
      key: "percentClose",
      width: 120,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => previewVideo(record)}>
            View
          </Button>
        </span>
      ),
    },
    {
      title: "ส่งตัดเงิน",
      dataIndex: "xxx",
      key: "xxx",
      width: 120,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => {
            console.log("record.ref1Pan", record.ref1Pan)
            console.log("record.nTrx", record.nTrx)
            setPan(record.ref1Pan);
            setSelectRecord(record);
            setVisibleSendCs(true);
          }}>
            ส่งตัดเงิน
          </Button>
        </span>
      ),
    },
    {
      title: "เปลี่ยน Code",
      dataIndex: "xxx",
      key: "xxx",
      width: 120,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => {
            setSelectRecord(record);
            setVisibleChangeSignalCode(true);
          }}>
            เปลี่ยน Code
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPlazaList(res.list);
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

  const addIndex = (res, dataOutput) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: (dataOutput.pageRequest.pageIndex - 1) * dataOutput.pageRequest.maxRowSize + (index + 1) }
    })
    return {
      ...res, list: list,
      totalRow: !_isEmpty(res.pageResponse) ? res.pageResponse.totalSize : list.length,
      prefixText: 'Total',
      secondText: 'row',
      totalAmountBth: `${res.totalAmount} บาท`,
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000018_Page_Search(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res, data));
        setTotalPage(res.pageResponse.totalSize)
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

  const sendCs = async (data = null) => {
    console.log("getSendCs", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000018_SEND_CS(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        const dataOutput = {
          startDate: _timeZoneThai(dataSearch.startDate),
          endDate: _timeZoneThai(dataSearch.endDate),
          plazaId: dataSearch.plaza === "ทั้งหมด" ? null : dataSearch.plaza,
          laneId: _isEmpty(dataSearch.lane) ? null : dataSearch.lane,
          nTrx: _isEmpty(dataSearch.nTrx) ? null : dataSearch.nTrx,
          pageRequest: {
            maxRowSize: PagintaionSize.pageSize,
            pageIndex: PagintaionSize.pageNumber
          }
        };
        getDataInfo(dataOutput);
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

  const changeSignalCode = async (data = null) => {
    console.log("changeSignalCode", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000018_CHANGE_SIGNAL_CODE(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        const dataOutput = {
          startDate: _timeZoneThai(dataSearch.startDate),
          endDate: _timeZoneThai(dataSearch.endDate),
          plazaId: dataSearch.plaza === "ทั้งหมด" ? null : dataSearch.plaza,
          laneId: _isEmpty(dataSearch.lane) ? null : dataSearch.lane,
          nTrx: _isEmpty(dataSearch.nTrx) ? null : dataSearch.nTrx,
          pageRequest: {
            maxRowSize: PagintaionSize.pageSize,
            pageIndex: PagintaionSize.pageNumber
          }
        };
        getDataInfo(dataOutput);
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

  const previewImage = (data) => {
    setPreviewImg(data.images)
    setVisible(true)
  }

  const previewVideo = (data) => {
    window.open(data.videoUrl, '_blank', 'width=800,height=600', 'resizable=true');
    // setPreviewVdo(data.videoUrl);
    // setVisibleVdo(true);
  }

  const previewImageNewPage = (url) => {
    window.open(url, '_blank', 'width=800,height=600', 'resizable=true');
  }

  const handleOnFinish = (value) => {
    setInitialValue(value);
    setPaginationSize({
      ...PagintaionSize, pageNumber: 1,
    })
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: _isEmpty(value.lane) ? null : value.lane,
      nTrx: _isEmpty(value.nTrx) ? null : value.nTrx,
      pageRequest: {
        maxRowSize: PagintaionSize.pageSize,
        pageIndex: 1
      }
    };
    setDataSearch(dataOutput) //set data to change pagination for new fetch API
    getDataInfo(dataOutput);
  };

  const action = [{}];

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
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={false}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{!_isEmpty(dataSource.pageResponse) ? _isNull(Number(dataSource.pageResponse.totalSize)) : dataSource.list.length}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={2}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={3} className="text-center" index={3}>
                      <Text>{_isNull(Number(dataSource.totalAmount))}</Text>
                      <Text>&nbsp;บาท</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
          {!_isEmpty(dataSource.list) ?
            <Row justify='end' className="mt-10">
              <Pagination pageSizeOptions={["10", "20", "50", "70"]}
                current={PagintaionSize.pageNumber}
                defaultPageSize={PagintaionSize.pageSize}
                onChange={(page, size) => {
                  setPaginationSize({
                    pageNumber: page,
                    pageSize: size
                  })
                  const dataOutput = {
                    startDate: dataSearch.startDate,
                    endDate: dataSearch.endDate,
                    plazaId: dataSearch.plazaId,
                    laneId: dataSearch.laneId,
                    nTrx: dataSearch.nTrx,
                    pageRequest: {
                      maxRowSize: size,
                      pageIndex: page
                    }
                  }
                  getDataInfo(dataOutput)
                }}
                onShowSizeChange={(current, size) => {
                  setPaginationSize({
                    pageNumber: current,
                    pageSize: size
                  })

                  const dataOutput = {
                    startDate: dataSearch.startDate,
                    endDate: dataSearch.endDate,
                    plazaId: dataSearch.plazaId,
                    laneId: dataSearch.laneId,
                    nTrx: dataSearch.nTrx,
                    pageRequest: {
                      maxRowSize: size,
                      pageIndex: current
                    }
                  }
                  getDataInfo(dataOutput)
                }}
                size="small" total={totalPage} showSizeChanger />
              {/* size="small" total={totalPage} showTotal={total => `Total ${total} items`} showSizeChanger /> */}
            </Row> : null}
        </div>
        <Modal
          title="Image Preview"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1300}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Row className="d-flex justify-content-around">
            {previewImg.map((item, idx) =>
              <Col span={8} key={idx} >
                <Col className="d-flex justify-content-center" span={24}>
                  <img style={{ cursor: 'pointer' }} src={item} alt={idx} width="100%" height="100%" onClick={() => previewImageNewPage(item)} />
                </Col>
                <Col className="text-center" style={{ padding: '0 30px' }} span={24}>{item}</Col>
              </Col>
            )}
          </Row>
        </Modal>
        <Modal
          title="Video Preview"
          centered
          visible={visibleVdo}
          onOk={() => setVisibleVdo(false)}
          onCancel={() => setVisibleVdo(false)}
          width={500}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Row className="d-flex justify-content-around">
            {
              <Col span={24}  >
                <Col className="d-flex justify-content-center" span={24}><img src={previewVdo} alt={previewVdo} width="100%" height="100%" /></Col>
              </Col>
            }
          </Row>
        </Modal>
        <Modal
          title="ยืนยันการส่งตัดเงิน"
          centered
          footer={false}
          visible={visibleSendCs}
          onCancel={() => {
            form.resetFields();
            setVisibleSendCs(false);
            setSelectRecord(null);
            setPan(null);
            setRemark(null);
          }
          }
          width={600}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={form}
          >
            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Ntrx : &nbsp;</Text>
                  <Text>{_isNull(Number(selectRecord.nTrx))}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>วันที่ผ่านทาง : &nbsp;</Text>
                  <Text>{!_isEmpty(selectRecord.trxDateTime) && (_setYearThai(selectRecord.trxDateTime,dateFormat))}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ด่าน : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.plazaNameTh)}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ช่องทาง : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.laneAbbreviation)}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>PAN : &nbsp;</Text>
                  <Input onChange={event => setPan(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="PAN..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.ref1Pan}>
                  </Input>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ค่าผ่านทาง : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.toll)}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Singnal Code : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.signalCode)}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>หมายเหตุ : &nbsp;</Text>
                  <Input onChange={event => setRemark(event.target.value)}
                    type="text"
                    size={1000}
                    placeholder="หมายเหตุ..."
                    className="rounded-pill max-WS ">
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
                      const data = {
                        direction: selectRecord.direction,
                        plazaId: selectRecord.plazaId,
                        laneId: selectRecord.laneId,
                        nTrx: selectRecord.nTrx,
                        trxDatetime: selectRecord.trxDateTime,
                        pan: pan,
                        remark: remark
                      }
                      sendCs(data);
                      form.resetFields();
                      setVisibleSendCs(false);
                      setSelectRecord(null);
                      setPan(null);
                      setRemark(null);
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
                      form.resetFields();
                      setVisibleSendCs(false);
                      setSelectRecord(null);
                      setPan(null);
                      setRemark(null);
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Col>
              </Row>
            ) : (<></>)}

          </Form>
        </Modal>
        <Modal
          title="ยืนยันการเปลี่ยน Code"
          centered
          footer={false}
          visible={visibleChangeSignalCode}
          onCancel={() => {
            setVisibleChangeSignalCode(false);
            setSelectRecord(null);
            setRemark(null);
          }
          }
          width={600}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={form}
          >
            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Ntrx : &nbsp;</Text>
                  <Text>{_isNull(Number(selectRecord.nTrx))}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>วันที่ผ่านทาง : &nbsp;</Text>
                  <Text>{!_isEmpty(selectRecord.trxDateTime) && (_setYearThai(selectRecord.trxDateTime,dateFormat))}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ด่าน : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.plazaNameTh)}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ช่องทาง : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.laneAbbreviation)}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>จาก : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.signalCode)}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>เป็น : &nbsp;</Text>
                  <Text>72</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>หมายเหตุ : &nbsp;</Text>
                  <Input onChange={event => setRemark(event.target.value)}
                    type="text"
                    size={1000}
                    placeholder="หมายเหตุ..."
                    className="rounded-pill max-WS ">
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
                      const data = {
                        direction: selectRecord.direction,
                        plazaId: selectRecord.plazaId,
                        laneId: selectRecord.laneId,
                        nTrx: selectRecord.nTrx,
                        trxDatetime: selectRecord.trxDateTime,
                        remark: remark
                      }
                      changeSignalCode(data);
                      setVisibleChangeSignalCode(false);
                      setSelectRecord(null);
                      setRemark(null);
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
                      setVisibleChangeSignalCode(false);
                      setSelectRecord(null);
                      setRemark(null);
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Col>
              </Row>
            ) : (<></>)}

          </Form>
        </Modal>
      </div>
    </Skeleton >
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassingTransactions);
