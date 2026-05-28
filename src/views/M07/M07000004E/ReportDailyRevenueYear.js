/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004E } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getMonthListAPI } from "../../../service/api/util";
import { getYearListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const ReportDailyRevenueYear = (props) => {
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
      key: "revenueTxt1",
      dataIndex: "revenueTxt1",
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
      key: "revenueTxt2",
      dataIndex: "revenueTxt2",
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
      key: "revenueTxt3",
      dataIndex: "revenueTxt3",
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
      key: "revenueTxt4",
      dataIndex: "revenueTxt4",
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
      key: "revenueTxt5",
      dataIndex: "revenueTxt5",
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
      key: "revenueTxt6",
      dataIndex: "revenueTxt6",
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
      key: "revenueTxt7",
      dataIndex: "revenueTxt7",
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
      key: "revenueTxt8",
      dataIndex: "revenueTxt8",
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
      key: "revenueTxt9",
      dataIndex: "revenueTxt9",
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
      key: "revenueTxt10",
      dataIndex: "revenueTxt10",
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
      key: "revenueTxt11",
      dataIndex: "revenueTxt11",
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
      key: "revenueTxt12",
      dataIndex: "revenueTxt12",
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
      key: "revenueTxt13",
      dataIndex: "revenueTxt13",
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
      key: "revenueTxt14",
      dataIndex: "revenueTxt14",
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
      key: "revenueTxt15",
      dataIndex: "revenueTxt15",
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
      key: "revenueTxt16",
      dataIndex: "revenueTxt16",
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
      key: "revenueTxt17",
      dataIndex: "revenueTxt17",
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
      key: "revenueTxt18",
      dataIndex: "revenueTxt18",
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
      key: "revenueTxt19",
      dataIndex: "revenueTxt19",
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
      key: "revenueTxt20",
      dataIndex: "revenueTxt20",
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
      key: "revenueTxt21",
      dataIndex: "revenueTxt21",
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
      key: "revenueTxt22",
      dataIndex: "revenueTxt22",
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
      key: "revenueTxt23",
      dataIndex: "revenueTxt23",
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
      key: "revenueTxt24",
      dataIndex: "revenueTxt24",
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
      key: "revenueTxt25",
      dataIndex: "revenueTxt25",
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
      key: "revenueTxt26",
      dataIndex: "revenueTxt26",
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
      key: "revenueTxt27",
      dataIndex: "revenueTxt27",
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
      key: "revenueTxt28",
      dataIndex: "revenueTxt28",
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
      key: "revenueTxt29",
      dataIndex: "revenueTxt29",
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
      key: "revenueTxt30",
      dataIndex: "revenueTxt30",
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
      key: "revenueTxt31",
      dataIndex: "revenueTxt31",
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
      key: "revenueTxt32",
      dataIndex: "revenueTxt32",
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
      key: "revenueTxt33",
      dataIndex: "revenueTxt33",
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
      key: "revenueTxt34",
      dataIndex: "revenueTxt34",
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
      key: "revenueTxt35",
      dataIndex: "revenueTxt35",
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
      key: "revenueTxt36",
      dataIndex: "revenueTxt36",
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
      key: "revenueTxt37",
      dataIndex: "revenueTxt37",
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
      key: "revenueTxt38",
      dataIndex: "revenueTxt38",
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
    { name: "เดือน", value: dataToPrint.DataList ? dataToPrint.monthName + ' ' + String(dataToPrint.yearId-543) : "" },
  ];

  useEffect(() => {
    getMonthList();
    getYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004E(data, props.auth.token);
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
        yearId: year ? year.yearId : "",
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
    documentTitle: ["7.4.5 DAILY REVENUE YEAR"],
  });

  const headerExcel = [
    { name: "PLAZA", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") , key: "revenueTxt1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : "") , key: "revenueTxt2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : "") , key: "revenueTxt3", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : "") , key: "revenueTxt4", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : "") , key: "revenueTxt5", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : "") , key: "revenueTxt6", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : "") , key: "revenueTxt7", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : "") , key: "revenueTxt8", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : "") , key: "revenueTxt9", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : "") , key: "revenueTxt10", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : "") , key: "revenueTxt11", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : "") , key: "revenueTxt12", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : "") , key: "revenueTxt13", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : "") , key: "revenueTxt14", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : "") , key: "revenueTxt15", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : "") , key: "revenueTxt16", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : "") , key: "revenueTxt17", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : "") , key: "revenueTxt18", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : "") , key: "revenueTxt19", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : "") , key: "revenueTxt20", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : "") , key: "revenueTxt21", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : "") , key: "revenueTxt22", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : "") , key: "revenueTxt23", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : "") , key: "revenueTxt24", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : "") , key: "revenueTxt25", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : "") , key: "revenueTxt26", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : "") , key: "revenueTxt27", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : "") , key: "revenueTxt28", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : "") , key: "revenueTxt29", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : "") , key: "revenueTxt30", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].columnName : "") , key: "revenueTxt31", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[31].columnName : "") , key: "revenueTxt32", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[32].columnName : "") , key: "revenueTxt33", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[33].columnName : "") , key: "revenueTxt34", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[34].columnName : "") , key: "revenueTxt35", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[35].columnName : "") , key: "revenueTxt36", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[36].columnName : "") , key: "revenueTxt37", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[37].columnName : "") , key: "revenueTxt38", type: "nullColumn", align: 'center', className: 'text-right' }
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
            fileName: "7.4.5 DAILY REVENUE YEAR",
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
              colSpan: 24,
              TopicText: "7.4.5 DAILY REVENUE YEAR"
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
)(ReportDailyRevenueYear);
