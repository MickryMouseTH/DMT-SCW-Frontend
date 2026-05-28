import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from 'moment'
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M07000005A } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { header75 } from "../../../tools/excel/header";
// import { exportExcelJs } from "../../../tools/exceljs";
import PrintPDF from "./PrintPDF"

const dateFormat = "DD/MM/YYYY";

const MorningTrafficBeforeAuditReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});

  useEffect(() => {
    getPlazaList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Column = [
    {
      title: <b>Plaza</b>,
      key: "tsbName",
      dataIndex: "tsbName",
      align: "center",
      width: 100,
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <div style={{
              textAlign: text === "Total" || text === "Percent" ? 'right' : 'left', color: text === "NorthBound" || text === "Sounthbound"
                || text === "Total" || text === "Percent" ? '#000000A6' : 'rgba(0, 0, 0, 0.45)'
            }}>
              {text === "NorthBound" || text === "Sounthbound"
                || text === "Total" || text === "Percent" ? <b>{text}</b>
                : text}
            </div>
          ),
        };
      },
    },
    {
      title: <b>Cash</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>Class 1</b>,
          key: "cashClass1",
          dataIndex: "cashClass1",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
        {
          title: <b>Class 2</b>,
          key: "cashClass2",
          dataIndex: "cashClass2",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
      ]
    },
    {
      title: <b>Coupon</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>Class 1</b>,
          key: "couponClass1",
          dataIndex: "couponClass1",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
        {
          title: <b>Class 2</b>,
          key: "couponClass2",
          dataIndex: "couponClass2",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
      ]
    },
    {
      title: <b>EMV</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>Class 1</b>,
          key: "emvClass1",
          dataIndex: "emvClass1",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
        {
          title: <b>Class 2</b>,
          key: "emvClass2",
          dataIndex: "emvClass2",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
      ]
    },
    {
      title: <b>QR-Code</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>Class 1</b>,
          key: "qrClass1",
          dataIndex: "qrClass1",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
        {
          title: <b>Class 2</b>,
          key: "qrClass2",
          dataIndex: "qrClass2",
          align: 'center',
          width: 60,
          render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
        },
      ]
    },
    {
      title: <b>M-Pass</b>,
      key: "mpass",
      dataIndex: "mpass",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
    },
    {
      title: <b>EasyPass</b>,
      key: "easypass",
      dataIndex: "easypass",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
    },
    {
      title: <b>Sub Total</b>,
      key: "supTotal",
      dataIndex: "supTotal",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
    },
    {
      title: <b>Exempt</b>,
      key: "exempt",
      dataIndex: "exempt",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
    },
    {
      title: <b>Vio</b>,
      key: "vio",
      dataIndex: "vio",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
    },
    {
      title: <b>Total</b>,
      key: "total",
      dataIndex: "total",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
            };
          },
    },
    {
      title: <b>Percent</b>,
      key: "percent",
      dataIndex: "percent",
      align: 'center',
      width: 60,
      render: (text, row, index) => {
            return {
              children: row.tsbName === "Total" || row.tsbName === "Percent" 
              ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text) !== "" ? Number(text).toFixed(2) : text}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text) !== "" ? Number(text).toFixed(2) : text}</div>,
            };
          },
    },
  ]

  const fields = [
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "laneId",
        label: "ช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.laneId,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "date",
        label: "วันที่ดำเนินการ",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันดำเนินการ!" }],
        // initialValue: initialValue.date,
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.date,
      },
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
      name: "วันที่ดำเนินการ",
      value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.date, "DD/MM/YYYY") : "",
    }
  ];

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.5.1 รายงานการจราจรก่อนตรวจสอบ"],
  });

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            dataSource: dataSource,
            fileName: "7.5.1 รายงานการจราจรก่อนตรวจสอบ",
            header: header75,
          }),
      },
    },
  ];

  const getPlazaList = async () => {
    setScroll({ x: 1300, y: 700 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setPlazaList(res.list);
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

  const sortData = (res) => {

    const NorthBoundlisttotal = {
      tsbName: '',
      cashClass1: res.northBoundCashClass1,
      cashClass2: res.northBoundCashClass2,
      couponClass1: res.northBoundCouponClass1,
      couponClass2: res.northBoundCouponClass2,
      emvClass1: res.northBoundEmvClass1,
      emvClass2: res.northBoundEmvClass2,
      qrClass1: res.northBoundQrClass1,
      qrClass2: res.northBoundQrClass2,
      mpass: res.northBoundMpass,
      easypass: res.northBoundEasypass,
      supTotal: res.northBoundSupTotal,
      exempt: res.northBoundExempt,
      vio: res.northBoundVio,
      total: res.northBoundTotal,
      percent: res.northBoundPercent
    }

    const Sounthboundlisttotal = {
      tsbName: '',
      cashClass1: res.sounthBoundCashClass1,
      cashClass2: res.sounthBoundCashClass2,
      couponClass1: res.sounthBoundCouponClass1,
      couponClass2: res.sounthBoundCouponClass2,
      emvClass1: res.sounthBoundEmvClass1,
      emvClass2: res.sounthBoundEmvClass2,
      qrClass1: res.sounthBoundQrClass1,
      qrClass2: res.sounthBoundQrClass2,
      mpass: res.sounthBoundMpass,
      easypass: res.sounthBoundEasypass,
      supTotal: res.sounthBoundSupTotal,
      exempt: res.sounthBoundExempt,
      vio: res.sounthBoundVio,
      total: res.sounthBoundTotal,
      percent: res.sounthBoundPercent
    }

    const columnsPeriodTotal = {
      tsbName: 'Total',
      cashClass1: res.totalCashClass1,
      cashClass2: res.totalCashClass2,
      couponClass1: res.totalCouponClass1,
      couponClass2: res.totalCouponClass2,
      emvClass1: res.totalEmvClass1,
      emvClass2: res.totalEmvClass2,
      qrClass1: res.totalQrClass1,
      qrClass2: res.totalQrClass2,
      mpass: res.totalMpass,
      easypass: res.totalEasypass,
      supTotal: res.totalSupTotal,
      exempt: res.totalExempt,
      vio: res.totalVio,
      total: res.totalTotal,
      percent: Number(res.totalPercent).toFixed(2),
    }

    const columnsPeriodPercent = {
      tsbName: 'Percent',
      cashClass1: Number(res.percentCashClass1).toFixed(2),
      cashClass2: Number(res.percentCashClass2).toFixed(2),
      couponClass1: Number(res.percentCouponClass1).toFixed(2),
      couponClass2: Number(res.percentCouponClass2).toFixed(2),
      emvClass1: Number(res.percentEmvClass1).toFixed(2),
      emvClass2: Number(res.percentEmvClass2).toFixed(2),
      qrClass1: Number(res.percentQrClass1).toFixed(2),
      qrClass2: Number(res.percentQrClass2).toFixed(2),
      mpass: Number(res.percentMpass).toFixed(2),
      easypass: Number(res.percentEasypass).toFixed(2),
      supTotal: Number(res.percentSuppercent).toFixed(2),
      exempt: Number(res.percentExempt).toFixed(2),
      vio: Number(res.percentVio).toFixed(2),
      total: Number(res.percentTotal).toFixed(2),
    }

    let NorthBoundlist = [{ "tsbName": 'NorthBound' }, ...res.northBoundlist, NorthBoundlisttotal]
    let Sounthboundlist = [{ "tsbName": 'Sounthbound' }, ...res.sounthBoundlist, Sounthboundlisttotal]

    let resultExport = [...NorthBoundlist, ...Sounthboundlist, columnsPeriodTotal, columnsPeriodPercent]
    let resultReport = { ...res, list: resultExport }

    return resultReport
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000005A(dataOutput, props.auth.token);
      console.log("res", res)
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(sortData(res));
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
  }

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.tsbNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      date: _timeZoneThai(value.date),
      plazaId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      laneId: _isEmpty(value.laneId) ? null : value.laneId,
    };
    getDataDailyTollCollction(dataOutput);
  };

  return (
    <Skeleton loading={loading} active>
      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
        onFinish={handleOnFinish}
        action={action}
      />
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scroll}
          columns={Column}
          bordered
          dataSource={dataSource.list}
          pagination={false}
        />
      </div>
      <div className="d-none">
        <PrintPDF ref={printReportRef}
          dataSource={dataSource.list}
          HeaderBar={{
            position: "d-flex justify-content-center",
            colSpan: 8,
            headerText,
            TopicText: "7.5.1 รายงานการจราจรก่อนตรวจสอบ",
          }}
        />
      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MorningTrafficBeforeAuditReport)
