/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000005E } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getMonthListAPI } from "../../../service/api/util";
import { getYearListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const ReportDailyTrafficYear = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
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
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "PLAZA",
      fixed: true,
      key: "plazaName",
      dataIndex: "plazaName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") : "",
      key: "trafficTxt1",
      dataIndex: "trafficTxt1",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : "") : "",
      key: "trafficTxt2",
      dataIndex: "trafficTxt2",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : "") : "",
      key: "trafficTxt3",
      dataIndex: "trafficTxt3",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : "") : "",
      key: "trafficTxt4",
      dataIndex: "trafficTxt4",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : "") : "",
      key: "trafficTxt5",
      dataIndex: "trafficTxt5",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : "") : "",
      key: "trafficTxt6",
      dataIndex: "trafficTxt6",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : "") : "",
      key: "trafficTxt7",
      dataIndex: "trafficTxt7",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : "") : "",
      key: "trafficTxt8",
      dataIndex: "trafficTxt8",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : "") : "",
      key: "trafficTxt9",
      dataIndex: "trafficTxt9",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : "") : "",
      key: "trafficTxt10",
      dataIndex: "trafficTxt10",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : "") : "",
      key: "trafficTxt11",
      dataIndex: "trafficTxt11",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : "") : "",
      key: "trafficTxt12",
      dataIndex: "trafficTxt12",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : "") : "",
      key: "trafficTxt13",
      dataIndex: "trafficTxt13",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : "") : "",
      key: "trafficTxt14",
      dataIndex: "trafficTxt14",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : "") : "",
      key: "trafficTxt15",
      dataIndex: "trafficTxt15",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : "") : "",
      key: "trafficTxt16",
      dataIndex: "trafficTxt16",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : "") : "",
      key: "trafficTxt17",
      dataIndex: "trafficTxt17",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : "") : "",
      key: "trafficTxt18",
      dataIndex: "trafficTxt18",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : "") : "",
      key: "trafficTxt19",
      dataIndex: "trafficTxt19",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : "") : "",
      key: "trafficTxt20",
      dataIndex: "trafficTxt20",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : "") : "",
      key: "trafficTxt21",
      dataIndex: "trafficTxt21",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : "") : "",
      key: "trafficTxt22",
      dataIndex: "trafficTxt22",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : "") : "",
      key: "trafficTxt23",
      dataIndex: "trafficTxt23",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : "") : "",
      key: "trafficTxt24",
      dataIndex: "trafficTxt24",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : "") : "",
      key: "trafficTxt25",
      dataIndex: "trafficTxt25",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : "") : "",
      key: "trafficTxt26",
      dataIndex: "trafficTxt26",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : "") : "",
      key: "trafficTxt27",
      dataIndex: "trafficTxt27",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : "") : "",
      key: "trafficTxt28",
      dataIndex: "trafficTxt28",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : "") : "",
      key: "trafficTxt29",
      dataIndex: "trafficTxt29",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : "") : "",
      key: "trafficTxt30",
      dataIndex: "trafficTxt30",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].columnName : "") : "",
      key: "trafficTxt31",
      dataIndex: "trafficTxt31",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[31].columnName : "") : "",
      key: "trafficTxt32",
      dataIndex: "trafficTxt32",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[31].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[32].columnName : "") : "",
      key: "trafficTxt33",
      dataIndex: "trafficTxt33",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[32].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[33].columnName : "") : "",
      key: "trafficTxt34",
      dataIndex: "trafficTxt34",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[33].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[34].columnName : "") : "",
      key: "trafficTxt35",
      dataIndex: "trafficTxt35",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[34].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[35].columnName : "") : "",
      key: "trafficTxt36",
      dataIndex: "trafficTxt36",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[35].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[36].columnName : "") : "",
      key: "trafficTxt37",
      dataIndex: "trafficTxt37",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[36].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[37].columnName : "") : "",
      key: "trafficTxt38",
      dataIndex: "trafficTxt38",
      width: 60,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[37].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
  ].filter(item => !item.hidden);


  const getMonthList = async () => {
    setScroll({ x: 5000 });
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
    { name: "ปี", value: dataToPrint.DataList ? dataToPrint.yearName : "" },
  ];

  useEffect(() => {
    getMonthList();
    getYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000005E(data, props.auth.token);
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

  const handleChangeIdToName = (DataList) => {
    const month = monthList.find((e) => e.monthId === DataList.monthId)
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    setDataToPrint(
      {
        DataList,
        monthName: month ? month.monthNameTh : "",
        yearName: year ? year.yearNameTh : "",
      })

  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      monthId: value.monthId === "" ? null : value.monthId,
      yearId: value.yearId === "" ? null : value.yearId,
    };
    getDataInfo(dataOutput);

  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.5.5 DAILY TRAFFIC YEAR"],
  });

  const headerExcel = [
    { name: "PLAZA", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") , key: "trafficTxt1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : "") , key: "trafficTxt2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : "") , key: "trafficTxt3", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : "") , key: "trafficTxt4", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : "") , key: "trafficTxt5", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : "") , key: "trafficTxt6", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : "") , key: "trafficTxt7", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : "") , key: "trafficTxt8", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : "") , key: "trafficTxt9", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : "") , key: "trafficTxt10", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : "") , key: "trafficTxt11", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : "") , key: "trafficTxt12", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : "") , key: "trafficTxt13", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : "") , key: "trafficTxt14", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : "") , key: "trafficTxt15", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : "") , key: "trafficTxt16", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : "") , key: "trafficTxt17", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : "") , key: "trafficTxt18", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : "") , key: "trafficTxt19", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : "") , key: "trafficTxt20", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : "") , key: "trafficTxt21", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : "") , key: "trafficTxt22", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : "") , key: "trafficTxt23", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : "") , key: "trafficTxt24", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : "") , key: "trafficTxt25", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : "") , key: "trafficTxt26", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : "") , key: "trafficTxt27", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : "") , key: "trafficTxt28", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : "") , key: "trafficTxt29", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : "") , key: "trafficTxt30", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].columnName : "") , key: "trafficTxt31", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[31].columnName : "") , key: "trafficTxt32", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[32].columnName : "") , key: "trafficTxt33", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[33].columnName : "") , key: "trafficTxt34", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[34].columnName : "") , key: "trafficTxt35", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[35].columnName : "") , key: "trafficTxt36", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[36].columnName : "") , key: "trafficTxt37", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[37].columnName : "") , key: "trafficTxt38", type: "nullColumn", align: 'center', className: 'text-right' }
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
            dataSource: { list: dataSource.list },
            fileName: "7.5.5 DAILY TRAFFIC YEAR",
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
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
          />
        </div>
        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 37,
              TopicText: "7.5.5 DAILY TRAFFIC YEAR"
            }}
          />
        </div>
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
)(ReportDailyTrafficYear);
