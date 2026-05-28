/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col
} from "antd";
import Skeleton from "../../../components/loading/Loading"
import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import {
  GET_DATA_INFO_M080000004_Search_Next_Previous,
  GET_DATA_INFO_M080000004_SaveFlagSendCs,
  GET_DATA_INFO_M080000004_SaveFlagNormal,
  GET_DATA_INFO_M080000004_SaveFlag72
} from "../../../service/api/report";
import {
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import { header84 } from "../../../tools/excel/header";
import { footer84 } from "../../../tools/excel/footer";
// import NoImage from '../../../assets/img/no-image.jpg'

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const ReportAbnormalTransactionHandlingPage2 = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([])
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([])

  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [PagintaionSize, setPaginationSize] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [dataSearch, setDataSearch] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [dataPDF, setDataPDF] = useState({ list: [] });
  const [renderFact, setRenderFact] = useState(false);
  const [disableExportBtn, setDisableExportBtn] = useState(false);
  const [disablePDFtBtn, setDisablePDFBtn] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);

  const fields = [];

  const columns = [
    {
      title: "action",
      dataIndex: "index",
      key: "index",
      width: 150,
      align: "center",
      fixed: true,
      render: (text, record) => (
        <span>
          {record.showButton ? <Button size="small" type="primary" onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}>
            จัดการรายการ
          </Button> : ""}
        </span>
      ),
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
              <div className="text-right">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 60,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "Ntrx",
      dataIndex: "nTrx",
      key: "nTrx",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "วันที่ผ่านด่าน",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 200,
      align: "center",
      // render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      render: (text) =>
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: "พนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
    {
      title: "TC/OBU",
      dataIndex: "tcObuClass",
      key: "tcObuClass",
      width: 60,
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
      title: "ล้อ",
      dataIndex: "wheel",
      key: "wheel",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
    {
      title: "เพลา",
      dataIndex: "shaft",
      key: "shaft",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ล้อคู่",
      dataIndex: "twinWheels",
      key: "twinWheels",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
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
      title: "ประเภทการชำระ",
      dataIndex: "paymentTypeName",
      key: "paymentTypeName",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "PAN/CardNo/CustName",
      dataIndex: "ref1Pan",
      key: "ref1Pan",
      width: 200,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "สัญญาณการผ่านทาง",
      dataIndex: "signalCode",
      key: "signalCode",
      width: 180,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_PlusZero(text)}
        </div>
      )
    },
    {
      title: "ภาพนิ่ง",
      dataIndex: "percentClose",
      key: "percentClose",
      width: 150,
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
      width: 150,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => previewVideo(record)}>
            View
          </Button>
        </span>
      ),
    },
  ];

  const headerText = [
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dateFormat)
        : "",
    },
  ];

  useEffect(() => {
    getDataInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async () => {
    try {
      setScroll({ x: 1300, y: 500 });
      setLoading(true);
      const body = {
        seckey: `${props.match.params.id}`,
      };
      console.log("body", body)
      const res = await GET_DATA_INFO_M080000004_Search_Next_Previous(body, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
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

  const saveFlagSendCs = async (record) => {
    try {
      setScroll({ x: 1300, y: 500 });
      setLoading(true);
      const body = {
        seckey: `${record.seckey}`,
      };
      console.log("body", body)
      const res = await GET_DATA_INFO_M080000004_SaveFlagSendCs(body, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setVisiblePopup(false);
        setSelectRecord(null);
        Swal.fire({
          icon: "success",
          title: "success. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
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

  const saveFlagNormal = async (record) => {
    try {
      setScroll({ x: 1300, y: 500 });
      setLoading(true);
      const body = {
        seckey: `${record.seckey}`,
      };
      console.log("body", body)
      const res = await GET_DATA_INFO_M080000004_SaveFlagNormal(body, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setVisiblePopup(false);
        setSelectRecord(null);
        Swal.fire({
          icon: "success",
          title: "success. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
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

  const saveFlag72 = async (record) => {
    try {
      setScroll({ x: 1300, y: 500 });
      setLoading(true);
      const body = {
        seckey: `${record.seckey}`,
      };
      console.log("body", body)
      const res = await GET_DATA_INFO_M080000004_SaveFlag72(body, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setVisiblePopup(false);
        setSelectRecord(null);
        Swal.fire({
          icon: "success",
          title: "success. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
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

  const goBack = () => {
    props.history.push({
      pathname: `/report-abnormal-transaction-handling`,
      value: props.location.value
    });
  }


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
    setFullscreenImg(url);
  }

  const printReportRef = useRef();

  const action = [
    {}
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <Col>
          <Row className='d-flex mt-5'>
            <h3>
              {" "}
              {`${dataSource.header ? dataSource.header : ""}`}{" "}
            </h3>
          </Row>
          <Row className='d-flex mt-5'>
            <Button onClick={goBack}>
              Back
            </Button>
          </Row>
        </Col>

        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText=""
          fields={fields}
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
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={renderFact ? {
              ...dataPDF,
              rows: "rows",
              count: _isNull(Number(dataPDF.list.length)),
            } : { list: [] }}
            header={header84}
            footer={footer84}
            propsHeader={{
              headerText,
              TopicText: "8.4 การจัดการรายการผ่านทางผิดปรกติ (Code 90, 22)",
            }}
            columnPerPage={header84.length}
            propsClass="print-border-footer"
            rowPerPage={20}
          />
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
      </div>


      <Modal
        maskClosable={false}
        centered
        footer={false}
        visible={visiblePopup}
        onCancel={() => {
          setVisiblePopup(false);
          setSelectRecord(null);
        }}
        width={600}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          layout="vertical"
          className="custom-ant-form"
          size="large"
        >
          <Row>
            <Row gutter={24} justify="start" type="flex" className="w-100">
              <Col span={7}>
                <Form.Item label={<div></div>}>
                  {(selectRecord!==null && selectRecord.signalCode !== '22') ? <Button
                    style={{ marginTop: -30 }}
                    htmlType="submit"
                    size="middle"
                    type="primary"
                    onClick={() => saveFlagNormal(selectRecord)}
                  >
                    รายการปกติปิดเคส
                  </Button>
                    :
                    <Button
                      style={{ marginTop: -30 }}
                      htmlType="submit"
                      size="middle"
                      type="primary"
                      onClick={() => saveFlag72(selectRecord)}
                    >
                      เปลี่ยนเป็น code 72
                    </Button>
                  }

                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label={<div></div>}>
                  {(selectRecord!==null && selectRecord.signalCode !== '22') ? <Button
                    style={{ marginTop: -30 }}
                    htmlType="submit"
                    size="middle"
                    type="primary"
                    onClick={() => saveFlagSendCs(selectRecord)}
                  >
                    ส่ง pan ตัดเงิน
                  </Button>
                    : ""}
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
                      setVisiblePopup(false);
                      setSelectRecord(null);
                    }}
                  >
                    ปิดจอ
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
)(ReportAbnormalTransactionHandlingPage2);
