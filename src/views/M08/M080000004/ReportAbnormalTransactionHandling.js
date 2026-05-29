/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table, Modal, Row, Col, Pagination } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import FullscreenVideoModal from "../../../components/imagePreview/FullscreenVideoModal";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M080000004_Page_Search, GET_DATA_INFO_M080000004 } from "../../../service/api/report";
import {
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header84 } from "../../../tools/excel/header";
import { footer84 } from "../../../tools/excel/footer";
// import NoImage from '../../../assets/img/no-image.jpg'

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const ReportAbnormalTransactionHandling = (props) => {
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
  const [fullscreenVdo, setFullscreenVdo] = useState(null);
  const [PagintaionSize, setPaginationSize] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [dataSearch, setDataSearch] = useState({})
  const [totalPage, setTotalPage] = useState(0)
  const [dataPDF, setDataPDF] = useState({ list: [] })
  const [renderFact, setRenderFact] = useState(false)
  const [disableExportBtn, setDisableExportBtn] = useState(false)
  const [disablePDFtBtn, setDisablePDFBtn] = useState(false)

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
          ? moment("00:00:00", "HH:mm:ss").add(0, 'days')
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
    }
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDetail(record)}
            >
              <Text type="secondary">
                <div className="text-center">{text}</div>
              </Text>
            </div>
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDetail(record)}
            >
              <Text type="secondary" align="center">
                <div className="text-left">{_isNull(text)}</div>
              </Text>
            </div>
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDetail(record)}
            >
              <Text type="secondary" align="center">
                <div className="text-right">{_isNull(text)}</div>
              </Text>
            </div>
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
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <Text align="center">
            <div className="text-right">{_isNull(text)}</div>
          </Text>
        </div>
      )
    },
    {
      title: "Ntrx",
      dataIndex: "nTrx",
      key: "nTrx",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-right'>
            {_isNull(text)}
          </div>
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
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-left'>
            {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
          </div>
        </div>
    },
    {
      title: "พนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-right'>
            {_isNull(text)}
          </div>
        </div>
    },
    {
      title: "TC/OBU",
      dataIndex: "tcObuClass",
      key: "tcObuClass",
      width: 60,
      align: "center",
      render(text, record) {
        return {
          children: (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDetail(record)}
            >
              <div className='text-right'>
                {_isZero(text)}
              </div>
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
      render(text, record) {
        return {
          children: (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDetail(record)}
            >
              <div className='text-right'>
                {_isZero(text)}
              </div>
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
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-right'>
            {_isNull(text)}
          </div>
        </div>
    },
    {
      title: "เพลา",
      dataIndex: "shaft",
      key: "shaft",
      width: 40,
      align: "center",
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-right'>
            {_isNull(text)}
          </div>
        </div>
    },
    {
      title: "ล้อคู่",
      dataIndex: "twinWheels",
      key: "twinWheels",
      width: 40,
      align: "center",
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-left'>
            {_isNull(text)}
          </div>
        </div>
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "toll",
      key: "toll",
      width: 70,
      align: "center",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-right'>
            {_isNull(text)}
          </div>
        </div>
      )
    },
    {
      title: "ประเภทการชำระ",
      dataIndex: "paymentTypeName",
      key: "paymentTypeName",
      width: 120,
      align: "center",
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-left'>
            {_isNull(text)}
          </div>
        </div>
    },
    {
      title: "PAN/CardNo/CustName",
      dataIndex: "ref1Pan",
      key: "ref1Pan",
      width: 200,
      align: "center",
      render: (text, record) =>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-left'>
            {_isNull(text)}
          </div>
        </div>
    },
    {
      title: "สัญญาณการผ่านทาง",
      dataIndex: "signalCode",
      key: "signalCode",
      width: 180,
      align: "center",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDetail(record)}
        >
          <div className='text-center'>
            {_PlusZero(text)}
          </div>
        </div>
      )
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
    setScroll({ x: 1300 });
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        pageRequest: {
          maxRowSize: PagintaionSize.pageSize,
          // pageIndex: PagintaionSize.pageNumber
          pageIndex: 1
        }
      };
      getDataInfo(dataOutput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const res = await GET_DATA_INFO_M080000004_Page_Search(data, props.auth.token);
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
    setFullscreenVdo(data.videoUrl);
    // setPreviewVdo(data.videoUrl);
    // setVisibleVdo(true);
  }

  const previewImageNewPage = (url) => {
    setFullscreenImg(url);
  }

  const handleChangeIdToName = (DataList) => {
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);
    setPaginationSize({
      ...PagintaionSize, pageNumber: 1,
    })
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
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
    documentTitle: ["8.4 การจัดการรายการผ่านทางผิดปรกติ (Code 90, 22)"],
    onAfterPrint: () => setDisablePDFBtn(false)
  });

  const handleExportExcel = async () => {
    setDisableExportBtn(true)
    const resultexcel = await HandlePrintPDF();
    console.log(resultexcel);
    exportExcelJs({
      reportType: "84",
      fileName: "8.4 การจัดการรายการผ่านทางผิดปรกติ (Code 90, 22)",
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
        pageRequest: {
          maxRowSize: PagintaionSize.pageSize,
          pageIndex: PagintaionSize.pageNumber
        }
      }

      const res = await GET_DATA_INFO_M080000004(!_isEmpty(dataOutput) ? dataOutput : null, props.auth.token);
      if (res.status.code === "S200") {
        setDataPDF(addIndex(res, dataOutput));
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

  const handleDetail = async (item) => {
    if (item.seckey) {
      try {
        await props.history.push({
          pathname: `/report-abnormal-transaction-handling/page2/${item.seckey}`,
          value: initialValue,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have seckey",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

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
                    startDate: _timeZoneThai(initialValue.startDate),
                    endDate: _timeZoneThai(initialValue.endDate),
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
                    startDate: _timeZoneThai(initialValue.startDate),
                    endDate: _timeZoneThai(initialValue.endDate),
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
)(ReportAbnormalTransactionHandling);
