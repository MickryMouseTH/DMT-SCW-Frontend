/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000006D } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getMonthListAPI } from "../../../service/api/util";
import { getYearListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const MonthlySignalStatistics764 = (props) => {
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
      title: "สถิติสัญญาณดัง/ วันที่",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 110,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") : "",
      key: "day01",
      dataIndex: "day01",
      width: 40,
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
      key: "day02",
      dataIndex: "day02",
      width: 40,
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
      key: "day03",
      dataIndex: "day03",
      width: 40,
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
      key: "day04",
      dataIndex: "day04",
      width: 40,
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
      key: "day05",
      dataIndex: "day05",
      width: 40,
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
      key: "day06",
      dataIndex: "day06",
      width: 40,
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
      key: "day07",
      dataIndex: "day07",
      width: 40,
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
      key: "day08",
      dataIndex: "day08",
      width: 40,
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
      key: "day09",
      dataIndex: "day09",
      width: 40,
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
      key: "day10",
      dataIndex: "day10",
      width: 40,
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
      key: "day11",
      dataIndex: "day11",
      width: 40,
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
      key: "day12",
      dataIndex: "day12",
      width: 40,
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
      key: "day13",
      dataIndex: "day13",
      width: 40,
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
      key: "day14",
      dataIndex: "day14",
      width: 40,
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
      key: "day15",
      dataIndex: "day15",
      width: 40,
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
      key: "day16",
      dataIndex: "day16",
      width: 40,
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
      key: "day17",
      dataIndex: "day17",
      width: 40,
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
      key: "day18",
      dataIndex: "day18",
      width: 40,
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
      key: "day19",
      dataIndex: "day19",
      width: 40,
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
      key: "day20",
      dataIndex: "day20",
      width: 40,
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
      key: "day21",
      dataIndex: "day21",
      width: 40,
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
      key: "day22",
      dataIndex: "day22",
      width: 40,
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
      key: "day23",
      dataIndex: "day23",
      width: 40,
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
      key: "day24",
      dataIndex: "day24",
      width: 40,
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
      key: "day25",
      dataIndex: "day25",
      width: 40,
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
      key: "day26",
      dataIndex: "day26",
      width: 40,
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
      key: "day27",
      dataIndex: "day27",
      width: 40,
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
      key: "day28",
      dataIndex: "day28",
      width: 40,
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
      key: "day29",
      dataIndex: "day29",
      width: 40,
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
      key: "day30",
      dataIndex: "day30",
      width: 40,
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
      key: "day31",
      dataIndex: "day31",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Total",
      key: "dayTotal",
      dataIndex: "dayTotal",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
  ].filter(item => !item.hidden);


  const columns2 = [
    {
      title: "รายละเอียดการตรวจสอบ/วันที่",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 110,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") : "",
      key: "day01",
      dataIndex: "day01",
      width: 40,
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
      key: "day02",
      dataIndex: "day02",
      width: 40,
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
      key: "day03",
      dataIndex: "day03",
      width: 40,
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
      key: "day04",
      dataIndex: "day04",
      width: 40,
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
      key: "day05",
      dataIndex: "day05",
      width: 40,
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
      key: "day06",
      dataIndex: "day06",
      width: 40,
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
      key: "day07",
      dataIndex: "day07",
      width: 40,
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
      key: "day08",
      dataIndex: "day08",
      width: 40,
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
      key: "day09",
      dataIndex: "day09",
      width: 40,
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
      key: "day10",
      dataIndex: "day10",
      width: 40,
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
      key: "day11",
      dataIndex: "day11",
      width: 40,
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
      key: "day12",
      dataIndex: "day12",
      width: 40,
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
      key: "day13",
      dataIndex: "day13",
      width: 40,
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
      key: "day14",
      dataIndex: "day14",
      width: 40,
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
      key: "day15",
      dataIndex: "day15",
      width: 40,
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
      key: "day16",
      dataIndex: "day16",
      width: 40,
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
      key: "day17",
      dataIndex: "day17",
      width: 40,
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
      key: "day18",
      dataIndex: "day18",
      width: 40,
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
      key: "day19",
      dataIndex: "day19",
      width: 40,
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
      key: "day20",
      dataIndex: "day20",
      width: 40,
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
      key: "day21",
      dataIndex: "day21",
      width: 40,
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
      key: "day22",
      dataIndex: "day22",
      width: 40,
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
      key: "day23",
      dataIndex: "day23",
      width: 40,
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
      key: "day24",
      dataIndex: "day24",
      width: 40,
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
      key: "day25",
      dataIndex: "day25",
      width: 40,
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
      key: "day26",
      dataIndex: "day26",
      width: 40,
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
      key: "day27",
      dataIndex: "day27",
      width: 40,
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
      key: "day28",
      dataIndex: "day28",
      width: 40,
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
      key: "day29",
      dataIndex: "day29",
      width: 40,
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
      key: "day30",
      dataIndex: "day30",
      width: 40,
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
      key: "day31",
      dataIndex: "day31",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[30].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Total",
      key: "dayTotal",
      dataIndex: "dayTotal",
      width: 40,
      align: "center",
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
    { name: "เดือน", value: dataToPrint.DataList ? dataToPrint.monthName + ' ' + String(dataToPrint.yearId - 543) : "" },
  ];

  useEffect(() => {
    getMonthList();
    getYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const sortData = (value) => {

    const HeaderExport = {
      detail: 'รายละเอียดการตรวจสอบ/วันที่',
      day01: (!_isEmpty(value.columnList) ? value.columnList[0].columnName : ""),
      day02: (!_isEmpty(value.columnList) ? value.columnList[1].columnName : ""),
      day03: (!_isEmpty(value.columnList) ? value.columnList[2].columnName : ""),
      day04: (!_isEmpty(value.columnList) ? value.columnList[3].columnName : ""),
      day05: (!_isEmpty(value.columnList) ? value.columnList[4].columnName : ""),
      day06: (!_isEmpty(value.columnList) ? value.columnList[5].columnName : ""),
      day07: (!_isEmpty(value.columnList) ? value.columnList[6].columnName : ""),
      day08: (!_isEmpty(value.columnList) ? value.columnList[7].columnName : ""),
      day09: (!_isEmpty(value.columnList) ? value.columnList[8].columnName : ""),
      day10: (!_isEmpty(value.columnList) ? value.columnList[9].columnName : ""),
      day11: (!_isEmpty(value.columnList) ? value.columnList[10].columnName : ""),
      day12: (!_isEmpty(value.columnList) ? value.columnList[11].columnName : ""),
      day13: (!_isEmpty(value.columnList) ? value.columnList[12].columnName : ""),
      day14: (!_isEmpty(value.columnList) ? value.columnList[13].columnName : ""),
      day15: (!_isEmpty(value.columnList) ? value.columnList[14].columnName : ""),
      day16: (!_isEmpty(value.columnList) ? value.columnList[15].columnName : ""),
      day17: (!_isEmpty(value.columnList) ? value.columnList[16].columnName : ""),
      day18: (!_isEmpty(value.columnList) ? value.columnList[17].columnName : ""),
      day19: (!_isEmpty(value.columnList) ? value.columnList[18].columnName : ""),
      day20: (!_isEmpty(value.columnList) ? value.columnList[19].columnName : ""),
      day21: (!_isEmpty(value.columnList) ? value.columnList[20].columnName : ""),
      day22: (!_isEmpty(value.columnList) ? value.columnList[21].columnName : ""),
      day23: (!_isEmpty(value.columnList) ? value.columnList[22].columnName : ""),
      day24: (!_isEmpty(value.columnList) ? value.columnList[23].columnName : ""),
      day25: (!_isEmpty(value.columnList) ? value.columnList[24].columnName : ""),
      day26: (!_isEmpty(value.columnList) ? value.columnList[25].columnName : ""),
      day27: (!_isEmpty(value.columnList) ? value.columnList[26].columnName : ""),
      day28: (!_isEmpty(value.columnList) ? value.columnList[27].columnName : ""),
      day29: (!_isEmpty(value.columnList) ? value.columnList[28].columnName : ""),
      day30: (!_isEmpty(value.columnList) ? value.columnList[29].columnName : ""),
      day31: (!_isEmpty(value.columnList) ? value.columnList[30].columnName : ""),
      dayTotal: 'Total'
    }

    return {
      columnList: [...value.columnList],
      list1: [...value.list1],
      list2: [...value.list2],
      listExport: [...value.list1, {}, {},
        HeaderExport, ...value.list2]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000006D(data, props.auth.token);
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
    documentTitle: ["7.6.4 สถิติสัญญาณดังรายเดือน"],
  });

  const headerExcel = [
    { name: "สถิติสัญญาณดัง/ วันที่", key: "detail", type: "nullColumn", align: 'center', className: 'text-center' },
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
    { name: ("Total"), key: "dayTotal", type: "nullColumn", align: 'center', className: 'text-right' }
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
            fileName: "7.6.4 สถิติสัญญาณดังรายเดือน",
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
        <div className={_isEmpty(dataSource.list1) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list1}
            loading={loading}
            pagination={false}
          />
        </div>

        <div className={"mt-20"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scroll}
            columns={columns2}
            bordered
            dataSource={dataSource.list2}
            loading={loading}
            pagination={false}
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
              TopicText: "7.6.4 สถิติสัญญาณดังรายเดือน"
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
)(MonthlySignalStatistics764);
