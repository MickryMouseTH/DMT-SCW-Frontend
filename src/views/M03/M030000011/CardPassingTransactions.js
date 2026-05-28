/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table, Button, Modal, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M030000011 } from "../../../service/api/report";
import {
  getPlazaListAPI,
} from "../../../service/api/util";
import {
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header311 } from "../../../tools/excel/header";
import { footer311 } from "../../../tools/excel/footer";
// import NoImage from '../../../assets/img/no-image.jpg'

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const CardPassingTransactions = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([]);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [PagintaionSize, setPaginationSize] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [dataSearch, setDataSearch] = useState({})
  const [totalPage, setTotalPage] = useState(0)
  const [dataPDF, setDataPDF] = useState({ list: [] })
  const [renderFact, setRenderFact] = useState(false)
  const [disableExportBtn,setDisableExportBtn] = useState(false)
  const [disablePDFtBtn,setDisablePDFBtn] = useState(false)

  const fields = [
    
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
      type: "input",
      option: {
        name: "carNo",
        label: "หมายเลขข้างรถ",
        childrenProps: { placeholder: "หมายเลขข้างรถ...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนข้อมูลหมายเลขข้างรถ!" },
        ],
        initialValue: initialValue.carNo,
      },
    },
    {
      type: "input",
      option: {
        name: "licensePlate",
        label: "ทะเบียนรถ",
        childrenProps: { placeholder: "ทะเบียนรถ...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนทะเบียนรถ!" },
        ],
        initialValue: initialValue.licensePlate,
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
      width: 150,
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
              <div className="text-center">{_isNull(text)}</div>
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
      width: 150,
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
      title: "หมายเลขข้างรถ",
      dataIndex: "carNo",
      key: "carNo",
      width: 120,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ทะเบียนรถ",
      dataIndex: "licensePlate",
      key: "licensePlate",
      width: 120,
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
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
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
      name: "หมายเลขข้างรถ",
      value: dataToPrint.DataList ? dataToPrint.DataList.carNo : "",
    },
    {
      name: "ทะเบียนรถ",
      value: dataToPrint.DataList ? dataToPrint.DataList.licensePlate : "",
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
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo",data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000011(data, props.auth.token);
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

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);
    setPaginationSize({
      ...PagintaionSize,pageNumber: 1,
    })
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: _isEmpty(value.lane) ? null : value.lane,
      carNo: _isEmpty(value.carNo) ? null : value.carNo,
      licensePlate: _isEmpty(value.licensePlate) ? null : value.licensePlate,
      pageRequest: {
        maxRowSize: PagintaionSize.pageSize,
        // pageIndex: PagintaionSize.pageNumber
        pageIndex: 1
      }
    };
    setDataSearch(dataOutput) //set data to change pagination for new fetch API
    getDataInfo(dataOutput);
  };

  const handlePrintFile = async () => {
    setDisablePDFBtn(true)
    await HandlePrintPDF();
    setRenderFact(true)
    setTimeout(function () { handlePrint(); setRenderFact(false) }, 1000);
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.11 รายงานการผ่านทางบัตรอนุญาตผ่านทาง DMT"],
    onAfterPrint: ()=>setDisablePDFBtn(false)
  });

  const handleExportExcel = async () => {
    setDisableExportBtn(true)
    const resultexcel = await HandlePrintPDF();

      exportExcelJs({
        reportType: "311",
        fileName: "3.11 รายงานการผ่านทางบัตรอนุญาตผ่านทาง DMT",
        data: resultexcel,
      })
      
    setDisableExportBtn(false)
  }

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        disabled: disablePDFtBtn
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: handleExportExcel,
        disabled: disableExportBtn
      },
    },
  ];

  const HandlePrintPDF = async () => {
    try {
      const dataOutput = {
        startDate: dataSearch.startDate,
        endDate: dataSearch.endDate,
        plazaId: dataSearch.plazaId,
        laneId: dataSearch.laneId,
        carNo: dataSearch.carNo,
        licensePlate: dataSearch.licensePlate,
        pageRequest: {
          maxRowSize: PagintaionSize.pageSize,
          pageIndex: PagintaionSize.pageNumber
        }
      }

      const res = await GET_DATA_INFO_M030000011(!_isEmpty(dataOutput) ? dataOutput : null, props.auth.token);
      if (res.status.code === "S200") {
        setDataPDF(addIndex(res, dataOutput));
        console.log("3.11 data => ",res);
        return addIndex(res, dataOutput)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            pagination={{
              defaultPageSize: 10,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
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
            header={header311}
            footer={footer311}
            propsHeader={{
              headerText,
              TopicText: "3.11 รายงานการผ่านทางบัตรอนุญาตผ่านทาง DMT",
            }}
            columnPerPage={header311.length}
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
)(CardPassingTransactions);
