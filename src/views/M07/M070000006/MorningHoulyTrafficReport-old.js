import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  // _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Table,Tabs, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M070000006_OLD } from "../../../service/api/report";
import { getPlazaBoundListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
// import { header76 } from "../../../tools/excel/header";
// import { exportExcelJs } from "../../../tools/exceljs";
// import PrintReport from "../../../components/print/PrintReport";
import Render24Table from "../../../components/table/Render24Table";

import { PrintReport } from "../../../tools/pdfjs";
import { exportExcelJs } from "../../../tools/exceljs";

const dateFormat = "DD/MM/YYYY";
// const timeFormat = "HH:mm";

const DailyCompletelyRevenueReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataExport, setDataExport] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});
  const [
    currentTab,
    // setCurrentTab
  ] = useState(0);
  const [countTable, setCountTable] = useState(0);

  const { TabPane } = Tabs;

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countTable]);

  const columnsTimePeriod = [
    {
      title: <b>Time</b>,
      key: "time",
      dataIndex: "time",
      align: "center",
      width: 100,
      render: (text) =>
        text === "Total" || text === "Percent" ? (
          <div
            style={{ textAlign: "right", fontWeight: "bolder", color: "black" }}
          >
            {_isNull(text)}
          </div>
        ) : (
          _isNull(text)
        ),
      // render(text) {
      //   return {
      //     children: (
      //       <Text type="secondary" align="center">
      //         {text}
      //       </Text>
      //     ),
      //   };
      // },
    },
    {
      title: <b>Cls 1</b>,
      key: "cls1",
      dataIndex: "cls1",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Cls 2</b>,
      key: "cls2",
      dataIndex: "cls2",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Cls 3</b>,
      key: "cls3",
      dataIndex: "cls3",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Cls 4</b>,
      key: "cls4",
      dataIndex: "cls4",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Cls 5</b>,
      key: "cls5",
      dataIndex: "cls5",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Sub Total</b>,
      key: "subTotal",
      dataIndex: "subTotal",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Exempt</b>,
      key: "exempt",
      dataIndex: "exempt",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Violation</b>,
      key: "violation",
      dataIndex: "violation",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Total</b>,
      key: "total",
      dataIndex: "total",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total"
            ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
            : row.time === "Percent" ? <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
              : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
        };
      },
    },
    {
      title: <b>Percent</b>,
      key: "percent",
      dataIndex: "percent",
      align: "center",
      width: 60,
      // render: (text) => (
      //   <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div>
      // ),
      render: (text, row, index) => {
        return {
          children: row.time === "Total" || row.time === "Percent" ?
            <div style={{ textAlign: "right" }}><b><i>{Number(_isNull(text)).toFixed(2)}</i></b></div>
            : <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div>,
        };
        // return {
        //   children: row.time === "Total" || row.time === "Percent" ?
        //     <div style={{ textAlign: "right" }}><b><i>{_isNull(text) !=="" ? Number(_isNull(text)).toFixed(2) : text}</i></b></div>
        //     : <div style={{ textAlign: "right" }}>{_isNull(text) !=="" ? Number(_isNull(text)).toFixed(2) : text}</div>,
        // };
      },
    },
  ];

  const columnsTimePeriodTotal = [
    "totalCls1",
    "totalCls2",
    "totalCls3",
    "totalCls4",
    "totalCls5",
    "totalSubTotal",
    "totalExempt",
    "totalViolation",
    "totalTotal",
    "totalPercent",
  ];

  const columnsTimePeriodPercent = [
    "percentCls1",
    "percentCls2",
    "percentCls3",
    "percentCls4",
    "percentCls5",
    "percentSubTotal",
    "percentExempt",
    "percentViolation",
    "percentTotal",
  ];

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
            keyName: "plazaBoundName",
            keyValue: "boundGroupId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
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
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        // initialValue: initialValue.startDate,
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
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        // initialValue: initialValue.endDate,
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : // ? moment('00:00:00','HH:mm:ss')
          initialValue.endDate,
      },
    },
  ];

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.6 Morning Houly Traffic Reports"],
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
        onClick: () => {
          exportExcelJs({
            reportType: "76",
            fileName: "7.6 Morning Houly Traffic Reports",
            data: reforgeExcel(),
          });
        },
      },
    },
  ];

  const getPlazaList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getPlazaBoundListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("plazalist", res);
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

  const sortData = (res, id) => {
    const resultList = res.list.map((item) => {
      const listtotal = {
        cls1: item.totalCls1,
        cls2: item.totalCls2,
        cls3: item.totalCls3,
        cls4: item.totalCls4,
        cls5: item.totalCls5,
        exempt: item.totalExempt,
        percent: item.totalPercent,
        subTotal: item.totalSubTotal,
        time: "Total",
        total: item.totalTotal,
        violation: item.totalViolation,
      };
      const listtotalpercent = {
        cls1: item.percentCls1,
        cls2: item.percentCls2,
        cls3: item.percentCls3,
        cls4: item.percentCls4,
        cls5: item.percentCls5,
        exempt: item.percentExempt,
        subTotal: item.percentSubTotal,
        time: "Percent",
        total: item.percentTotal,
        violation: item.percentViolation,
      };

      let resultExport = [...item.list, listtotal, listtotalpercent];
      return { ...item, list: resultExport };
    });

    const plaza = plazaList.find((e) => e.boundGroupId === id);
    const refacterList = !_isEmpty(plaza) ? resultList.filter((item) => item.plazaName === plaza.plazaBoundName) : resultList

    // return { ...res, list: resultList }; //old
    return { ...res, list: refacterList }; //rfacter filter plaza
  };

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M070000006_OLD(dataOutput, props.auth.token);
      console.log("res 7.6", res);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
        const CoutList = sortData(res, dataOutput.boundGroupId)
        setDataExport(CoutList);
        setCountTable(Number(CoutList.list.length));
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

  const tableSummaryRowRender = (listRender = [], cellIndex = 1) => {
    return listRender.map((title, index) => (
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "right" }}>
          {_isNull(dataSource[title])}
        </div>
      </Table.Summary.Cell>
    ));
  };

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.boundGroupId === DataList.plaza);
    // console.log('plaza.plazaNameTh',plaza.plazaBoundName)
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaBoundName : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      boundGroupId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: _isEmpty(value.laneId) ? null : value.laneId,
    };
    getDataDailyTollCollction(dataOutput);
  };

  const renderColumns = (indColumn = null) => {
    const columnH = {
      title: "",
      key: "",
      dataIndex: "",
      width: 70,
      align: "center",
      render: (text) =>
        text === "Total" || text === "Percent" ? (
          <div
            style={{ textAlign: "right", fontWeight: "bolder", color: "black" }}
          >
            {_isNull(text)}
          </div>
        ) : (
          _isNull(text)
        ),
    };

    const mixField = (item) => {
      let column = { ...columnH };
      column.title = item.title;
      column.key = item.key;
      column.dataIndex = item.key;
      column.render = item.render;
      return column;
    };

    let columns1 = [...columnsTimePeriod.map(mixField)];

    const columns = [columns1];
    return _isEmpty(indColumn) ? columns : columns[indColumn];
  };

  const reforgeExcel = () => {
    let list = [];
    // list = dataSource.list
    list = dataExport.list
      .map((parent) => {
        const _l = parent.list.map((child, childIndex) => {
          return child;
        });
        // const _tt = _total(parent);
        // const _pc = _percent(parent);
        const _h = _pt(parent);
        const _h2 = _ht();
        const _b = _bt();
        return [_h, _h2, ..._l,
          //  _tt, 
          // _pc,
          _b
        ];
      })
      .flat(Infinity);
    return { ...dataSource, list: list };
  };

  // const _percent = (obj) => {
  //   return {
  //     time: "Percent",
  //     cls1: obj.percentCls1,
  //     cls2: obj.percentCls2,
  //     cls3: obj.percentCls3,
  //     cls4: obj.percentCls4,
  //     cls5: obj.percentCls5,
  //     subTotal: obj.percentSubTotal,
  //     exempt: obj.percentExempt,
  //     violation: obj.percentViolation,
  //     total: obj.percentTotal,
  //     percent: " ",
  //   };
  // };

  // const _total = (obj) => {
  //   return {
  //     time: "Total",
  //     cls1: obj.totalCls1,
  //     cls2: obj.totalCls2,
  //     cls3: obj.totalCls3,
  //     cls4: obj.totalCls4,
  //     cls5: obj.totalCls5,
  //     subTotal: obj.totalSubTotal,
  //     exempt: obj.totalExempt,
  //     violation: obj.totalViolation,
  //     total: obj.totalTotal,
  //     percent: obj.totalPercent,
  //   };
  // };

  const _bt = () => {
    return {
      time: " ",
      cls1: " ",
      cls2: " ",
      cls3: " ",
      cls4: " ",
      cls5: " ",
      subTotal: " ",
      exempt: " ",
      violation: " ",
      total: " ",
      percent: " ",
    };
  };

  const _pt = (obj) => {
    return {
      time: obj.plazaName,
      cls1: " ",
      cls2: " ",
      cls3: " ",
      cls4: " ",
      cls5: " ",
      subTotal: " ",
      exempt: " ",
      violation: " ",
      total: " ",
      percent: obj.date,
    };
  };

  const _ht = () => {
    return {
      time: "Time",
      cls1: "Cls 1",
      cls2: "Cls 2",
      cls3: "Cls 3",
      cls4: "Cls 4",
      cls5: "Cls 5",
      subTotal: "Sub Total",
      exempt: "Exempt",
      violation: "Violation",
      total: "Total",
      percent: "Percent",
    };
  };

  const reforge = () => {
    let list = [];
    // list = dataSource.list
    list = dataExport.list
      .map((parent) => {
        return parent.list.map((child, childIndex) => {
          // if (childIndex === parent.list.length - 1) {
          //   const ft = _ft(parent);
          //   const ftPercent = _ftPercent(parent);
          //   return [
          //     { ...child, plazaName: parent.plazaName, date: parent.date },
          //     ft,
          //     ftPercent,
          //   ];
          // }
          return { ...child, plazaName: parent.plazaName, date: parent.date };
        });
      })
      .flat(Infinity);

    return { list: list };
  };

  // const _ft = (obj) => {
  //   return {
  //     // plazaName: 'รวม',
  //     plazaName: "",
  //     cls1: obj.totalCls1,
  //     cls2: obj.totalCls2,
  //     cls3: obj.totalCls3,
  //     cls4: obj.totalCls4,
  //     cls5: obj.totalCls5,
  //     exempt: obj.totalExempt,
  //     percent: obj.totalPercent,
  //     subTotal: obj.totalSubTotal,
  //     time: "Total",
  //     total: obj.totalTotal,
  //     violation: obj.totalViolation,
  //   };
  // };

  // const _ftPercent = (obj) => {
  //   return {
  //     // plazaName: 'รวม',
  //     plazaName: "",
  //     cls1: obj.percentCls1,
  //     cls2: obj.percentCls2,
  //     cls3: obj.percentCls3,
  //     cls4: obj.percentCls4,
  //     cls5: obj.percentCls5,
  //     exempt: obj.percentExempt,
  //     percent: obj.percentTotal,
  //     subTotal: obj.percentSubTotal,
  //     time: "Percent",
  //     total: obj.percentTotal,
  //     violation: obj.percentViolation,
  //   };
  // };

  const header76 = [
    { header: "Time", key: "time", type: "default" },
    { header: "Cls 1", key: "cls1", type: "isNull" },
    { header: "Cls 2", key: "cls2", type: "isNull" },
    { header: "Cls 3", key: "cls3", type: "isNull" },
    { header: "Cls 4", key: "cls4", type: "isNull" },
    { header: "Cls 5", key: "cls5", type: "isNull" },
    { header: "Sub Total", key: "subTotal", type: "isNull" },
    { header: "Exempt", key: "exempt", type: "isNull" },
    { header: "Violation", key: "violation", type: "isNull" },
    { header: "Total", key: "total", type: "isNull" },
    { header: "Percent", key: "percent", type: "isNull" },
  ];

  const generateColumn = () => {
    return header76.map((item) => {
      const defaultC = {
        title: item.header,
        dataIndex: item.key,
        key: item.key,
      };
      if (item.type === "default") {
        return {
          ...defaultC,
          render: (value, row) => {
            if (value === "Total" || value === "Percent") {
              return (
                <div style={{ textAlign: "right", fontSize: "9px" }}>
                  <b>{value}</b>
                </div>
              );
            } else {
              return <div style={{ fontSize: "9px" }}>{value}</div>;
            }
          },
        };
      } else if (item.type === "isNull") {
        return {
          ...defaultC,
          render: (value, row, index) => {
            return {
              children: item.header === "Percent" && row.time === "Total" ?
                <div style={{ fontSize: "9px", textAlign: "right" }}><b><i>{Number(_isNull(value)).toFixed(2)}</i></b></div>
                : row.time === "Total" ? <div style={{ fontSize: "9px", textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.time === "Percent" ? <div style={{ fontSize: "9px", textAlign: "right" }}><b><i>{Number(_isNull(value)).toFixed(2)}</i></b></div>
                    : item.header === "Percent" ? <div style={{ fontSize: "9px", textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                      : <div style={{ fontSize: "9px", textAlign: "right" }}>{value}</div>,
            };

            // return {
            //   children: item.header === "Percent" && row.time === "Total" ?
            //     <div style={{ fontSize: "9px", textAlign: "right" }}><b><i>{_isNull(value) !== "" ? Number(_isNull(value)).toFixed(2)
            //   : value}</i></b></div>
            //     : row.time === "Total" ? <div style={{ fontSize: "9px", textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
            //       : row.time === "Percent" ? <div style={{ fontSize: "9px", textAlign: "right" }}><b><i>{_isNull(value) !== "" ? 
            //       Number(_isNull(value)).toFixed(2) : value}</i></b></div>
            //         : item.header === "Percent" ? <div style={{ fontSize: "9px", textAlign: "right" }}>{_isNull(value) !== "" ? 
            //         Number(_isNull(value)).toFixed(2) : value}</div>
            //           : <div style={{ fontSize: "9px", textAlign: "right" }}>{value}</div>,
            // };
          },
          // render: (value) => {
          //   return <div style={{ fontSize: "9px" }}>{_isNull(value)}</div>;
          // },
        };
      }
      return defaultC;
    });
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
        {countTable === 0 ? (
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scroll}
            columns={columnsTimePeriod}
            bordered
            dataSource={dataSource.list}
            pagination={false}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>
                      <div style={{ textAlign: "right" }}>
                        <b>Total</b>
                      </div>
                    </Table.Summary.Cell>
                    {tableSummaryRowRender(columnsTimePeriodTotal)}
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>
                      <div style={{ textAlign: "right" }}>
                        <b>Percent</b>
                      </div>
                    </Table.Summary.Cell>
                    {tableSummaryRowRender(columnsTimePeriodPercent)}
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        ) : (
          <Tabs
            defaultActiveKey={currentTab.toString()}
            tabPosition={"top"}
          // style={{ height: 650 }}
          >
            {[...Array(countTable).keys()].map((i) => (
              <TabPane tab={`หน้าที่ ${i + 1}`} key={i}>
                <div style={{ marginTop: "12px" }}>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ padding: "0 15px 15px 15px" }}
                  >
                    <Col>
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {dataExport.list[i] ? dataExport.list[i].plazaName : null}
                      </span>
                    </Col>
                    <Col>
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {dataExport.list[i] ? dataExport.list[i].date : null}
                      </span>
                    </Col>
                  </Row>
                  <Render24Table
                    pageSizeTotal={26}
                    tableQuantity={renderColumns()}
                    dataSource={dataExport.list[i]}
                    scroll={scroll}
                  />
                </div>
                <div className="d-none">
                  <PrintReport
                    ref={printReportRef}
                    data={reforge()}
                    headerTitle={(record) => (
                      <Row justify="space-between" align="middle">
                        <Col>
                          <b style={{ fontSize: 9 }}>{record[0].plazaName}</b>
                        </Col>
                        <Col>
                          <b style={{ fontSize: 9 }}>{record[0].date}</b>
                        </Col>
                      </Row>
                    )}
                    propsClassChildren={"print-siznew"}
                    propsClassHeader={"fontSize-Header-custom"}
                    reportType="76"
                    columnCustom={generateColumn()}
                    columnsLength={12}
                    rowsLength={26}
                    reportTitle="7.6 Morning Houly Traffic Reports"
                    additionTitle={[
                      {
                        name: "ด่าน",
                        value: dataToPrint.plazaName
                          ? dataToPrint.plazaName
                          : "",
                      },
                      {
                        name: "ช่องทาง",
                        value: dataToPrint.DataList
                          ? dataToPrint.DataList.laneId
                          : "",
                      },
                      {
                        name: "จากวันที่",
                        value: dataToPrint.DataList
                          ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY")
                          : "",
                      },
                      {
                        name: "ถึงวันที่",
                        value: dataToPrint.DataList
                          ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY")
                          : "",
                      },
                    ]}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        )}
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
)(DailyCompletelyRevenueReport);
