/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004J, DOWNLOAD_FILE_PDF_M07000004J} from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI, getMonthListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const MonthlyTollRevenueAndTrafficReport = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [showColumnTypeList, setShowColumnTypeList] = useState([]);
  // ----- Fields search ------ //


  const fields = [
    {
      type: "select",
      option: {
        name: "monthId",
        label: "เดือน",
        childrenProps: {
          placeholder: "เลือกเดือน...",
          optionValue: {
            values: [...monthList],
            keyName: "monthNameTh",
            keyValue: "monthId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกเดือน!",
          },
        ],
        initialValue: initialValue.monthId ? initialValue.monthId : Number(moment().format('MM')),
      },
    },
    {
      type: "select",
      option: {
        name: "yearId",
        label: "ปี",
        childrenProps: {
          placeholder: "เลือกปี...",
          optionValue: {
            values: [...yearList],
            keyName: "yearNameTh",
            keyValue: "yearId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกปี!",
          },
        ],
        initialValue: initialValue.yearId ? initialValue.yearId :
          moment().format('YYYY') > 2543 ? moment().format('YYYY') : Number(moment().format('YYYY')) + 543,
      },
    },
    {
      type: "select",
      option: {
        name: "showColumnTypeId",
        label: "การแสดงคอลัมน์",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...showColumnTypeList],
            keyValue: "showColumnTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.showColumnTypeId ? initialValue.showColumnTypeId : "แสดงครบทุกคอลัมน์",
      },
    },
  ];

  const columns = [
    {
      title: "PLAZA",
      show: true,
      fixed: true,
      key: "tsbName",
      dataIndex: "tsbName",
      width: 200,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") : "",
      show: true,
      key: "day01",
      dataIndex: "day01",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : "") : "",
      show: true,
      key: "day02",
      dataIndex: "day02",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : "") : "",
      show: true,
      key: "day03",
      dataIndex: "day03",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : "") : "",
      show: true,
      key: "day04",
      dataIndex: "day04",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : "") : "",
      show: true,
      key: "day05",
      dataIndex: "day05",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : "") : "",
      show: true,
      key: "day06",
      dataIndex: "day06",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : "") : "",
      show: true,
      key: "day07",
      dataIndex: "day07",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : "") : "",
      show: true,
      key: "day08",
      dataIndex: "day08",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : "") : "",
      show: true,
      key: "day09",
      dataIndex: "day09",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : "") : "",
      show: true,
      key: "day10",
      dataIndex: "day10",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : "") : "",
      show: true,
      key: "day11",
      dataIndex: "day11",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : "") : "",
      show: true,
      key: "day12",
      dataIndex: "day12",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : "") : "",
      show: true,
      key: "day13",
      dataIndex: "day13",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : "") : "",
      show: true,
      key: "day14",
      dataIndex: "day14",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : "") : "",
      show: true,
      key: "day15",
      dataIndex: "day15",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : "") : "",
      show: true,
      key: "day16",
      dataIndex: "day16",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : "") : "",
      show: true,
      key: "day17",
      dataIndex: "day17",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : "") : "",
      show: true,
      key: "day18",
      dataIndex: "day18",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : "") : "",
      show: true,
      key: "day19",
      dataIndex: "day19",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : "") : "",
      show: true,
      key: "day20",
      dataIndex: "day20",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : "") : "",
      show: true,
      key: "day21",
      dataIndex: "day21",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : "") : "",
      show: true,
      key: "day22",
      dataIndex: "day22",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : "") : "",
      show: true,
      key: "day23",
      dataIndex: "day23",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : "") : "",
      show: true,
      key: "day24",
      dataIndex: "day24",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : "") : "",
      show: true,
      key: "day25",
      dataIndex: "day25",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : "") : "",
      show: true,
      key: "day26",
      dataIndex: "day26",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : "") : "",
      show: true,
      key: "day27",
      dataIndex: "day27",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : "") : "",
      show: true,
      key: "day28",
      dataIndex: "day28",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay29 : true,
      key: "day29",
      dataIndex: "day29",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay30 : true,
      key: "day30",
      dataIndex: "day30",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay31 : true,
      key: "day31",
      dataIndex: "day31",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "SUM",
      show: true,
      key: "summary",
      dataIndex: "summary",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "AVERAGE",
      show: true,
      key: "averageTrx",
      dataIndex: "averageTrx",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "NOS. OF VEHICLE",
      show: true,
      align: 'center',
      children: [
        {
          title: "CLASS 1",
          show: true,
          key: "class1",
          dataIndex: "class1",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "CLASS 2",
          show: true,
          key: "class2",
          dataIndex: "class2",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "REVENUES COLLECTED",
      show: true,
      key: "revenues",
      dataIndex: "revenues",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "AVERAGE",
      show: true,
      key: "averageRevenue",
      dataIndex: "averageRevenue",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "SUM",
      show: true,
      key: "summaryHoliday",
      dataIndex: "summaryHoliday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "AVERAGE",
      show: true,
      key: "averageTrxHoliday",
      dataIndex: "averageTrxHoliday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "NOS. OF VEHICLE",
      show: true,
      align: 'center',
      children: [
        {
          title: "CLASS 1",
          show: true,
          key: "class1Holiday",
          dataIndex: "class1Holiday",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "CLASS 2",
          show: true,
          key: "class2Holiday",
          dataIndex: "class2Holiday",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "REVENUES COLLECTED",
      show: true,
      key: "revenuesHoliday",
      dataIndex: "revenuesHoliday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "AVERAGE",
      show: true,
      key: "averageRevenueHoliday",
      dataIndex: "averageRevenueHoliday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "SUM",
      show: true,
      key: "summaryWorkday",
      dataIndex: "summaryWorkday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "AVERAGE",
      show: true,
      key: "averageTrxWorkday",
      dataIndex: "averageTrxWorkday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "NOS. OF VEHICLE",
      show: true,
      align: 'center',
      children: [
        {
          title: "CLASS 1",
          show: true,
          key: "class1Workday",
          dataIndex: "class1Workday",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "CLASS 2",
          show: true,
          key: "class2Workday",
          dataIndex: "class2Workday",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "REVENUES COLLECTED",
      show: true,
      key: "revenuesWorkday",
      dataIndex: "revenuesWorkday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
    {
      title: "AVERAGE",
      show: true,
      key: "averageRevenueWorkday",
      dataIndex: "averageRevenueWorkday",
      align: 'center',
      width: 60,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
    },
  ].filter(item => item.show);

  const getMonthList = async () => {
    try {
      setLoading(true);
      const res = await getMonthListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setMonthList(res.list);
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

  const getYearList = async () => {
    try {
      setLoading(true);
      const res = await getYearListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setYearList(res.list);
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

  const headerText = [
    { name: "เดือน", value: dataToPrint.DataList ? dataToPrint.monthName : "" },
    { name: "ปี", value: dataToPrint.DataList ? String(dataToPrint.yearId) : "" },
  ];

  useEffect(() => {
    setShowColumnTypeList(["แสดงครบทุกคอลัมน์", "ไม่แสดงครบทุกคอลัมน์"]);
    setScroll({ x: 4500 });
    getMonthList();
    getYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addIndex = (res) => {
    // const list = res.list.map((item, index) => {
    //   return { ...item, index: index + 1 }
    // })
    return {
      ...res,
      listExport: [...res.list]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004J(data, props.auth.token);
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
  
  const handleDownload = async (source) => {
    try {
      await DOWNLOAD_FILE_PDF_M07000004J(source, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeIdToName = (DataList) => {
    const month = monthList.find((e) => e.monthId === DataList.monthId)
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    setDataToPrint(
      {
        DataList,
        monthName: month ? month.monthNameTh : "",
        yearId: year ? year.yearId : "",
      })
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      monthId: value.monthId === "" ? null : value.monthId,
      yearId: value.yearId === "" ? null : value.yearId,
      showColumnTypeId: value.showColumnTypeId === "แสดงครบทุกคอลัมน์" ? 1 : 2,
    };
    getDataInfo(dataOutput);
  };

  
  const handlePrintFile = () => {
    // handlePrint();
    handleDownload(dataSource);
  };
  
  const printReportRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => printReportRef.current,
  //   documentTitle: ["7.4.10 Monthly Toll Revenue & Traffic Report"],
  // });

  const headerExcel = [
    { name: "PLAZA", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : ""), key: "day01", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : ""), key: "day02", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : ""), key: "day03", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : ""), key: "day04", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : ""), key: "day05", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : ""), key: "day06", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : ""), key: "day07", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : ""), key: "day08", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : ""), key: "day09", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : ""), key: "day10", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : ""), key: "day11", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : ""), key: "day12", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : ""), key: "day13", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : ""), key: "day14", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : ""), key: "day15", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : ""), key: "day16", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : ""), key: "day17", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : ""), key: "day18", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : ""), key: "day19", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : ""), key: "day20", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : ""), key: "day21", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : ""), key: "day22", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : ""), key: "day23", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : ""), key: "day24", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : ""), key: "day25", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : ""), key: "day26", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : ""), key: "day27", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : ""), key: "day28", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : ""), key: "day29", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : ""), key: "day30", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].columnName : ""), key: "day31", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "SUM", key: "summary", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVERAGE", key: "averageTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NOS. OF VEHICLE CLASS 1", key: "class1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NOS. OF VEHICLE CLASS 2", key: "class2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "REVENUES COLLECTED", key: "revenues", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVERAGE", key: "averageRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "SUM", key: "summaryHoliday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVERAGE", key: "averageTrxHoliday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NOS. OF VEHICLE CLASS 1", key: "class1Holiday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NOS. OF VEHICLE CLASS 2", key: "class2Holiday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "REVENUES COLLECTED", key: "revenuesHoliday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVERAGE", key: "averageRevenueHoliday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "SUM", key: "summaryWorkday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVERAGE", key: "averageTrxWorkday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NOS. OF VEHICLE CLASS 1", key: "class1Workday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NOS. OF VEHICLE CLASS 2", key: "class2Workday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "REVENUES COLLECTED", key: "revenuesWorkday", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVERAGE", key: "averageRevenueWorkday", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

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
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.listExport },
            fileName: "7.4.10 Monthly Toll Revenue & Traffic Report",
            header: headerExcel,
          });
        },
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
            pagination={false}
          />
        </div>
        {/* <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 6,
              TopicText: "7.4.10 Monthly Toll Revenue & Traffic Report"
            }}
          />
        </div> */}
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
)(MonthlyTollRevenueAndTrafficReport);
