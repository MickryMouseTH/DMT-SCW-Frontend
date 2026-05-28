/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004K } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI, getMonthListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const DailyTrafficReport = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
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
      title: "1",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day01TrxClass1",
          dataIndex: "day01TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day01TrxClass2",
          dataIndex: "day01TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "2",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day02TrxClass1",
          dataIndex: "day02TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day02TrxClass2",
          dataIndex: "day02TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "3",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day03TrxClass1",
          dataIndex: "day03TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day03TrxClass2",
          dataIndex: "day03TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "4",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day04TrxClass1",
          dataIndex: "day04TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day04TrxClass2",
          dataIndex: "day04TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "5",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day05TrxClass1",
          dataIndex: "day05TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day05TrxClass2",
          dataIndex: "day05TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "6",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day06TrxClass1",
          dataIndex: "day06TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day06TrxClass2",
          dataIndex: "day06TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "7",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day07TrxClass1",
          dataIndex: "day07TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day07TrxClass2",
          dataIndex: "day07TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "8",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day08TrxClass1",
          dataIndex: "day08TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day08TrxClass2",
          dataIndex: "day08TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "9",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day09TrxClass1",
          dataIndex: "day09TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day09TrxClass2",
          dataIndex: "day09TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "10",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day10TrxClass1",
          dataIndex: "day10TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day10TrxClass2",
          dataIndex: "day10TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "11",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day11TrxClass1",
          dataIndex: "day11TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day11TrxClass2",
          dataIndex: "day11TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "12",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day12TrxClass1",
          dataIndex: "day12TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day12TrxClass2",
          dataIndex: "day12TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "13",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day13TrxClass1",
          dataIndex: "day13TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day13TrxClass2",
          dataIndex: "day13TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "14",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day14TrxClass1",
          dataIndex: "day14TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day14TrxClass2",
          dataIndex: "day14TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "15",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day15TrxClass1",
          dataIndex: "day15TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day15TrxClass2",
          dataIndex: "day15TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "16",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day16TrxClass1",
          dataIndex: "day16TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day16TrxClass2",
          dataIndex: "day16TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "17",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day17TrxClass1",
          dataIndex: "day17TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day17TrxClass2",
          dataIndex: "day17TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "18",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day18TrxClass1",
          dataIndex: "day18TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day18TrxClass2",
          dataIndex: "day18TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "19",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day19TrxClass1",
          dataIndex: "day19TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day19TrxClass2",
          dataIndex: "day19TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "20",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day20TrxClass1",
          dataIndex: "day20TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day20TrxClass2",
          dataIndex: "day20TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "21",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day21TrxClass1",
          dataIndex: "day21TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day21TrxClass2",
          dataIndex: "day21TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "22",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day22TrxClass1",
          dataIndex: "day22TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day22TrxClass2",
          dataIndex: "day22TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "23",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day23TrxClass1",
          dataIndex: "day23TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day23TrxClass2",
          dataIndex: "day23TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "24",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day24TrxClass1",
          dataIndex: "day24TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day24TrxClass2",
          dataIndex: "day24TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "25",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day25TrxClass1",
          dataIndex: "day25TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day25TrxClass2",
          dataIndex: "day25TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "26",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day26TrxClass1",
          dataIndex: "day26TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day26TrxClass2",
          dataIndex: "day26TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "27",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day27TrxClass1",
          dataIndex: "day27TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day27TrxClass2",
          dataIndex: "day27TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "28",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "day28TrxClass1",
          dataIndex: "day28TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "day28TrxClass2",
          dataIndex: "day28TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "29",
      show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay29 : true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay29 : true,
          key: "day29TrxClass1",
          dataIndex: "day29TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay29 : true,
          key: "day29TrxClass2",
          dataIndex: "day29TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "30",
      show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay30 : true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay30 : true,
          key: "day30TrxClass1",
          dataIndex: "day30TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay30 : true,
          key: "day30TrxClass2",
          dataIndex: "day30TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "31",
      show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay31 : true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay31 : true,
          key: "day31TrxClass1",
          dataIndex: "day31TrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: (!_isEmpty(dataSource)) ? !dataSource.hiddenDay31 : true,
          key: "day31TrxClass2",
          dataIndex: "day31TrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
    },
    {
      title: "Total",
      show: true,
      align: 'center',
      children: [
        {
          title: "class 1",
          show: true,
          key: "summaryTrxClass1",
          dataIndex: "summaryTrxClass1",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 2",
          show: true,
          key: "summaryTrxClass2",
          dataIndex: "summaryTrxClass2",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
        {
          title: "class 1+2",
          show: true,
          key: "summaryTrxClassTotal",
          dataIndex: "summaryTrxClassTotal",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
        },
      ],
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
      const res = await GET_DATA_INFO_M07000004K(data, props.auth.token);
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
    documentTitle: ["7.4.11 Daily Traffic"],
  });

  const headerExcel = [
    { name: "PLAZA", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Day 1 Class 1", key: "day01TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 1 Class 2", key: "day01TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 2 Class 1", key: "day02TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 2 Class 2", key: "day02TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 3 Class 1", key: "day03TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 3 Class 2", key: "day03TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 4 Class 1", key: "day04TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 4 Class 2", key: "day04TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 5 Class 1", key: "day05TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 5 Class 2", key: "day05TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 6 Class 1", key: "day06TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 6 Class 2", key: "day06TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 7 Class 1", key: "day07TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 7 Class 2", key: "day07TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 8 Class 1", key: "day08TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 8 Class 2", key: "day08TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 9 Class 1", key: "day09TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 9 Class 2", key: "day09TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 10 Class 1", key: "day10TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 10 Class 2", key: "day10TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 11 Class 1", key: "day11TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 11 Class 2", key: "day11TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 12 Class 1", key: "day12TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 12 Class 2", key: "day12TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 13 Class 1", key: "day13TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 13 Class 2", key: "day13TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 14 Class 1", key: "day14TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 14 Class 2", key: "day14TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 15 Class 1", key: "day15TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 15 Class 2", key: "day15TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 16 Class 1", key: "day16TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 16 Class 2", key: "day16TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 17 Class 1", key: "day17TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 17 Class 2", key: "day17TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 18 Class 1", key: "day18TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 18 Class 2", key: "day18TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 19 Class 1", key: "day19TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 19 Class 2", key: "day19TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 20 Class 1", key: "day20TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 20 Class 2", key: "day20TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 21 Class 1", key: "day21TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 21 Class 2", key: "day21TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 22 Class 1", key: "day22TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 22 Class 2", key: "day22TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 23 Class 1", key: "day23TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 23 Class 2", key: "day23TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 24 Class 1", key: "day24TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 24 Class 2", key: "day24TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 25 Class 1", key: "day25TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 25 Class 2", key: "day25TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 26 Class 1", key: "day26TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 26 Class 2", key: "day26TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 27 Class 1", key: "day27TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 27 Class 2", key: "day27TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 28 Class 1", key: "day28TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 28 Class 2", key: "day28TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 29 Class 1", key: "day29TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 29 Class 2", key: "day29TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 30 Class 1", key: "day30TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 30 Class 2", key: "day30TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 31 Class 1", key: "day31TrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Day 31 Class 2", key: "day31TrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total Class 1", key: "summaryTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total Class 1", key: "summaryTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total Class 1+2", key: "summaryTrxClassTotal", type: "nullColumn", align: 'center', className: 'text-right' },
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
            fileName: "7.4.11 Daily Traffic",
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
        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 6,
              TopicText: "7.4.11 Daily Traffic"
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
)(DailyTrafficReport);
