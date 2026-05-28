/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table,  Button, Modal, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M050000003 } from "../../../service/api/report";
import {
  getPlazaListAPI,
  getSignalCodeListAPI,
  getPaymentmethodListAPI,
} from "../../../service/api/util";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai } from "../../../tools/util";
import { header34 } from "../../../tools/excel/header";
import { footer34 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const PassingTransactions = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [signalCodeList, setsSignalCodeList] = useState([]);
  const [paymentmethodList, setsPaymentmethodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([]);

  const [fullscreenImg, setFullscreenImg] = useState(null);
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
          showTime: true,
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
          showTime: true,
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
        name: "jobNo",
        label: "Job no.",
        childrenProps: { placeholder: "เลขที่ใบงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนข้อมูลเลขที่ใบงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.jobNo,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "รหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
      },
    },
    {
      type: "select",
      option: {
        name: "signalCode",
        label: "สัญญาณการผ่านทาง ETC",
        childrenProps: {
          placeholder: "สัญญาณการผ่านทาง...",
          optionValue: {
            values: ["ทั้งหมด", ...signalCodeList],
            keyName: "descriptionTh",
            keyValue: "signalCodeId",
          },
        },
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.signalCode
      },
    },
    {
      type: "select",
      option: {
        name: "paymentmethod",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "ประเภทการชำระ...",
          optionValue: {
            values: ["ทั้งหมด", ...paymentmethodList],
            keyName: "paymentmethodDescriptionTh",
            keyValue: "paymentmethodId",
          },
        },
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.paymentmethod
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 70,
      align: "center",
      fixed: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              {text}
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
              {_isNull(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 70,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "Ntrx",
      dataIndex: "nTrx",
      key: "nTrx",
      width: 70,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "วันที่ผ่านด่าน",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 200,
      align: "center",
      // render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      render: (text) =>
        !_isEmpty(text) && (_setYearThai(text,dateFormat)),
    },
    {
      title: "พนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "TC/OBU",
      dataIndex: "tcObuClass",
      key: "tcObuClass",
      width: 150,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_isZero(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 90,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_isZero(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "ล้อ",
      dataIndex: "wheel",
      key: "wheel",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "เพลา",
      dataIndex: "shaft",
      key: "shaft",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ล้อคู่",
      dataIndex: "twinWheels",
      key: "twinWheels",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "toll",
      key: "toll",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ประเภทการชำระ",
      dataIndex: "paymentTypeName",
      key: "paymentTypeName",
      width: 130,
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
        _isNull(text)
    },
    {
      title: "สัญญาณการผ่านทาง",
      dataIndex: "signalCode",
      key: "signalCode",
      width: 150,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_PlusZero(text)}
            </Text>
          ),
        };
      },
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
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
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
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.DataList ? dataToPrint.paymentmethodName : "",
    },
    {
      name: "Job no.",
      value: dataToPrint.DataList ? dataToPrint.DataList.jobNo : "",
    },
    {
      name: "สัญญาณการผ่านทาง ETC",
      value: dataToPrint.DataList ? dataToPrint.signalCodeName : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    getSignalCodeList();
    getPaymentmethodList();
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

  const getSignalCodeList = async () => {
    try {
      setLoading(true);
      const res = await getSignalCodeListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsSignalCodeList(res.list);
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

  const getPaymentmethodList = async () => {
    try {
      setLoading(true);
      const res = await getPaymentmethodListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPaymentmethodList(res.list);
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

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M050000003(data, props.auth.token);
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

  const previewImage = (data) => {
    setPreviewImg(data.images)
    setVisible(true)
  }

  const previewVideo = (data) => {
    window.open(data.videoUrl, '_blank', 'width=800,height=600', 'resizable=true');
    // setPreviewVdo(data.videoUrl)
    // setVisibleVdo(true)
  }

  const previewImageNewPage = (url) => {
    setFullscreenImg(url);
  }

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    const paymentmethod = paymentmethodList.find(
      (e) => e.paymentmethodId === DataList.paymentmethod
    );
    const signalCode = signalCodeList.find(
      (e) => e.signalCodeId === DataList.signalCode
    );
    setDataToPrint({
      DataList,
      signalCodeName: signalCode ? signalCode.descriptionTh : "ทั้งหมด",
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      paymentmethodName: paymentmethod
        ? paymentmethod.paymentmethodDescriptionTh
        : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
      jobNo: value.jobNo,
      staffId: value.staffId,
      signalCodeId: value.signalCode === "ทั้งหมด" ? null : value.signalCode,
      paymentmethodId:
        value.paymentmethod === "ทั้งหมด" ? null : value.paymentmethod,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["5.3 Maintenance Passing Transaction"],
  });

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // disabled: dataSource.list.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            dataSource: {
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            },
            fileName: "5.3 Maintenance Passing Transaction",
            header: header34,
            footer: footer34,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];

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
            pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={2}>
                      <Text>rows</Text>
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
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            }}
            header={header34}
            footer={footer34}
            propsHeader={{
              headerText,
              TopicText: "5.3 รายการผ่านทางโหมดบำรุงรักษา",
            }}
            columnPerPage={header34.length}
            propsClass="print-border-footer"
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
)(PassingTransactions);
