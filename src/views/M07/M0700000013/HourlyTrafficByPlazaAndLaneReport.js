import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
// import { exportExcelJs } from "../../../tools/exceljs";
import moment from 'moment'
import {
  _exportFileExcel,
  _timeZoneThai, _isEmpty, _isNull
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import summaryData from "./SummaryData";
import summaryDataTotal from "./SummaryDataTotal";

import { GET_DATA_INFO_M070000013 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import { header713 } from "./header";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const dateFormat = "DD/MM/YYYY";

const HourlyTrafficByPlazaAndLaneReport = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState({ list: [], total: [] });
    const [initialValue, setInitialValue] = useState({});
    const [
        // Listlength
        ,setListlength] = useState({ list: [] })
    const [scrollX , setScrollX] = useState({})
    const [ 
        // dataToPrint
        ,setDataToPrint
    ] = useState({})
    const [plazaList, setPlazaList] = useState([]);

    const columns = [
        {
            title: <b>Hour ID</b>,
            align: 'center',
            children: [
              {
                title: <b>Plaza</b>,
                key: "plazaAbbreviation",
                dataIndex: "plazaAbbreviation",
                align: 'center',
                fixed: true,
                width: 60,
                render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Lane</b>,
                key: "laneAbbreviation",
                dataIndex: "laneAbbreviation",
                align: 'center',
                fixed: true,
                width: 60,
                render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
          title: <b>0</b>,
          align: 'center',
          children: [
            {
              title: <b>Class 1</b>,
              key: "class1Hour0",
              dataIndex: "class1Hour0",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: <b>Class 2</b>,
              key: "class2Hour0",
              dataIndex: "class2Hour0",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
            title: <b>1</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour1",
                dataIndex: "class1Hour1",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour1",
                dataIndex: "class2Hour1",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>2</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour2",
                dataIndex: "class1Hour2",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour2",
                dataIndex: "class2Hour2",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>3</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour3",
                dataIndex: "class1Hour3",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour3",
                dataIndex: "class2Hour3",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>4</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour4",
                dataIndex: "class1Hour4",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour4",
                dataIndex: "class2Hour4",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>5</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour5",
                dataIndex: "class1Hour5",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour5",
                dataIndex: "class2Hour5",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>6</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour6",
                dataIndex: "class1Hour6",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour6",
                dataIndex: "class2Hour6",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>7</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour7",
                dataIndex: "class1Hour7",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour7",
                dataIndex: "class2Hour7",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>8</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour8",
                dataIndex: "class1Hour8",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour8",
                dataIndex: "class2Hour8",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>9</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour9",
                dataIndex: "class1Hour9",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour9",
                dataIndex: "class2Hour9",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>10</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour10",
                dataIndex: "class1Hour10",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour10",
                dataIndex: "class2Hour10",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>11</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour11",
                dataIndex: "class1Hour11",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour11",
                dataIndex: "class2Hour11",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>12</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour12",
                dataIndex: "class1Hour12",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour12",
                dataIndex: "class2Hour12",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>13</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour13",
                dataIndex: "class1Hour13",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour13",
                dataIndex: "class2Hour13",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>14</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour14",
                dataIndex: "class1Hour14",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour14",
                dataIndex: "class2Hour14",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>15</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour15",
                dataIndex: "class1Hour15",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour15",
                dataIndex: "class2Hour15",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>16</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour16",
                dataIndex: "class1Hour16",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour16",
                dataIndex: "class2Hour16",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>17</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour17",
                dataIndex: "class1Hour17",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour17",
                dataIndex: "class2Hour17",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>18</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour18",
                dataIndex: "class1Hour18",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour18",
                dataIndex: "class2Hour18",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>19</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour19",
                dataIndex: "class1Hour19",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour19",
                dataIndex: "class2Hour19",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>20</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour20",
                dataIndex: "class1Hour20",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour20",
                dataIndex: "class2Hour20",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>21</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour21",
                dataIndex: "class1Hour21",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour21",
                dataIndex: "class2Hour21",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>22</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour22",
                dataIndex: "class1Hour22",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour22",
                dataIndex: "class2Hour22",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>23</b>,
            align: 'center',
            children: [
              {
                title: <b>Class 1</b>,
                key: "class1Hour23",
                dataIndex: "class1Hour23",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: <b>Class 2</b>,
                key: "class2Hour23",
                dataIndex: "class2Hour23",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
        },
        {
            title: <b>Sum C1</b>,
            key: "class1Total",
            dataIndex: "class1Total",
            align: 'center',
            width: 80,
            render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
            title: <b>Sum C2</b>,
            key: "class2Total",
            dataIndex: "class2Total",
            align: 'center',
            width: 80,
            render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
            title: <b>C1+C2</b>,
            key: "allClassTotal",
            dataIndex: "allClassTotal",
            align: 'center',
            width: 80,
            render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
    ]

    const columnsTsbTotal = [
        {
            title: <b>Plaza</b>,
            key: "tsbAbbreviationTotal",
            dataIndex: "tsbAbbreviationTotal",
            align: 'center',
            fixed: true,
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>00</b>,
            key: "hour0Total",
            dataIndex: "hour0Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>01</b>,
            key: "hour1Total",
            dataIndex: "hour1Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>02</b>,
            key: "hour2Total",
            dataIndex: "hour2Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>03</b>,
            key: "hour3Total",
            dataIndex: "hour3Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>04</b>,
            key: "hour4Total",
            dataIndex: "hour4Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>05</b>,
            key: "hour5Total",
            dataIndex: "hour5Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>06</b>,
            key: "hour6Total",
            dataIndex: "hour6Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>07</b>,
            key: "hour7Total",
            dataIndex: "hour7Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>08</b>,
            key: "hour8Total",
            dataIndex: "hour8Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>09</b>,
            key: "hour9Total",
            dataIndex: "hour9Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>10</b>,
            key: "hour10Total",
            dataIndex: "hour10Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>11</b>,
            key: "hour11Total",
            dataIndex: "hour11Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>12</b>,
            key: "hour12Total",
            dataIndex: "hour12Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>13</b>,
            key: "hour13Total",
            dataIndex: "hour13Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>14</b>,
            key: "hour14Total",
            dataIndex: "hour14Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>15</b>,
            key: "hour15Total",
            dataIndex: "hour15Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>16</b>,
            key: "hour16Total",
            dataIndex: "hour16Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>17</b>,
            key: "hour17Total",
            dataIndex: "hour17Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>18</b>,
            key: "hour18Total",
            dataIndex: "hour18Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>19</b>,
            key: "hour19Total",
            dataIndex: "hour19Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>20</b>,
            key: "hour20Total",
            dataIndex: "hour20Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>21</b>,
            key: "hour21Total",
            dataIndex: "hour21Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>22</b>,
            key: "hour22Total",
            dataIndex: "hour22Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>23</b>,
            key: "hour23Total",
            dataIndex: "hour23Total",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>Sum C1</b>,
            key: "class1TsbTotal",
            dataIndex: "class1TsbTotal",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>Sum C2</b>,
            key: "class2TsbTotal",
            dataIndex: "class2TsbTotal",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
        {
            title: <b>C1+C2</b>,
            key: "class1and2TsbTotal",
            dataIndex: "class1and2TsbTotal",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
        },
    ]

    const fields = [
        {
            type: "select",
            option: {
              name: "plazaId",
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
              initialValue: initialValue.plazaId ? initialValue.plazaId : "ทั้งหมด",
            },
        },
        {
          type: "datePicker",
          option: {
            name: "date",
            label: "วันที่",
            childrenProps: {
              format: dateFormat,
              picker: "date",
              placeholder: "เลือกวันที่...",
            },
            rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
            initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
          },
        },
    ];

    useEffect(() => {
        setScrollX({ x: 1300 })
        getPlazaList_API();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const action = [
        {
          name: "ส่งออก",
          props: {
            type: "primary",
            onClick: () => {
                _exportFileExcel(
                    {
                        dataSource: { list: dataSource.listExport },
                        fileName: "7.13 Hourly Traffic by Plaza and Lane Report",
                        header: header713,
                    },
                );
                // _exportFileExcel(
                //     {
                //         dataSource: { list: dataSource.total },
                //         fileName: "7.13 Hourly Traffic by Plaza and Lane Report",
                //         header: header713T,
                //     },
                // );
            }
          },
        },
    ];
    
    const getPlazaList_API = async () => {
        try {
          setLoading(true);
          const res = await getPlazaListAPI(null, props.auth.token);
        //   console.log(res)
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

    const addIndex = (res) => {

        const totalByClass = {
            plazaAbbreviation: 'Total by Class',
            laneAbbreviation: '',
            class1Hour0: res.class1Hour0Total,
            class2Hour0: res.class2Hour0Total,
            class1Hour1: res.class1Hour1Total,
            class2Hour1: res.class2Hour1Total,
            class1Hour2: res.class1Hour2Total,
            class2Hour2: res.class2Hour2Total,
            class1Hour3: res.class1Hour3Total,
            class2Hour3: res.class2Hour3Total,
            class1Hour4: res.class1Hour4Total,
            class2Hour4: res.class2Hour4Total,
            class1Hour5: res.class1Hour5Total,
            class2Hour5: res.class2Hour5Total,
            class1Hour6: res.class1Hour6Total,
            class2Hour6: res.class2Hour6Total,
            class1Hour7: res.class1Hour7Total,
            class2Hour7: res.class2Hour7Total,
            class1Hour8: res.class1Hour8Total,
            class2Hour8: res.class2Hour8Total,
            class1Hour9: res.class1Hour9Total,
            class2Hour9: res.class2Hour9Total,
            class1Hour10: res.class1Hour10Total,
            class2Hour10: res.class2Hour10Total,
            class1Hour11: res.class1Hour11Total,
            class2Hour11: res.class2Hour11Total,
            class1Hour12: res.class1Hour12Total,
            class2Hour12: res.class2Hour12Total,
            class1Hour13: res.class1Hour13Total,
            class2Hour13: res.class2Hour13Total,
            class1Hour14: res.class1Hour14Total,
            class2Hour14: res.class2Hour14Total,
            class1Hour15: res.class1Hour15Total,
            class2Hour15: res.class2Hour15Total,
            class1Hour16: res.class1Hour16Total,
            class2Hour16: res.class2Hour16Total,
            class1Hour17: res.class1Hour17Total,
            class2Hour17: res.class2Hour17Total,
            class1Hour18: res.class1Hour18Total,
            class2Hour18: res.class2Hour18Total,
            class1Hour19: res.class1Hour19Total,
            class2Hour19: res.class2Hour19Total,
            class1Hour20: res.class1Hour20Total,
            class2Hour20: res.class2Hour20Total,
            class1Hour21: res.class1Hour21Total,
            class2Hour21: res.class2Hour21Total,
            class1Hour22: res.class1Hour22Total,
            class2Hour22: res.class2Hour22Total,
            class1Hour23: res.class1Hour23Total,
            class2Hour23: res.class2Hour23Total,
            class1Total: res.class1SumTotal,
            class2Total: res.class2SumTotal,
            allClassTotal: ''
        }

        const grandTotal = {
            plazaAbbreviation: 'Grand Total',
            laneAbbreviation: '',
            class1Hour0: '',
            class2Hour0: res.class1Class2Hour0Total,
            class1Hour1: '',
            class2Hour1: res.class1Class2Hour1Total,
            class1Hour2: '',
            class2Hour2: res.class1Class2Hour2Total,
            class1Hour3: '',
            class2Hour3: res.class1Class2Hour3Total,
            class1Hour4: '',
            class2Hour4: res.class1Class2Hour4Total,
            class1Hour5: '',
            class2Hour5: res.class1Class2Hour5Total,
            class1Hour6: '',
            class2Hour6: res.class1Class2Hour6Total,
            class1Hour7: '',
            class2Hour7: res.class1Class2Hour7Total,
            class1Hour8: '',
            class2Hour8: res.class1Class2Hour8Total,
            class1Hour9: '',
            class2Hour9: res.class1Class2Hour9Total,
            class1Hour10: '',
            class2Hour10: res.class1Class2Hour10Total,
            class1Hour11: '',
            class2Hour11: res.class1Class2Hour11Total,
            class1Hour12: '',
            class2Hour12: res.class1Class2Hour12Total,
            class1Hour13: '',
            class2Hour13: res.class1Class2Hour13Total,
            class1Hour14: '',
            class2Hour14: res.class1Class2Hour14Total,
            class1Hour15: '',
            class2Hour15: res.class1Class2Hour15Total,
            class1Hour16: '',
            class2Hour16: res.class1Class2Hour16Total,
            class1Hour17: '',
            class2Hour17: res.class1Class2Hour17Total,
            class1Hour18: '',
            class2Hour18: res.class1Class2Hour18Total,
            class1Hour19: '',
            class2Hour19: res.class1Class2Hour19Total,
            class1Hour20: '',
            class2Hour20: res.class1Class2Hour20Total,
            class1Hour21: '',
            class2Hour21: res.class1Class2Hour21Total,
            class1Hour22: '',
            class2Hour22: res.class1Class2Hour22Total,
            class1Hour23: '',
            class2Hour23: res.class1Class2Hour23Total,
            class1Total: '',
            class2Total: '',
            allClassTotal: res.class1Class2SumTotal
        }

        const spaceRow = {
            plazaAbbreviation: '',
            laneAbbreviation: '',
            class1Hour0: '',
            class2Hour0: '',
            class1Hour1: '',
            class2Hour1: '',
            class1Hour2: '',
            class2Hour2: '',
            class1Hour3: '',
            class2Hour3: '',
            class1Hour4: '',
            class2Hour4: '',
            class1Hour5: '',
            class2Hour5: '',
            class1Hour6: '',
            class2Hour6: '',
            class1Hour7: '',
            class2Hour7: '',
            class1Hour8: '',
            class2Hour8: '',
            class1Hour9: '',
            class2Hour9: '',
            class1Hour10: '',
            class2Hour10: '',
            class1Hour11: '',
            class2Hour11: '',
            class1Hour12: '',
            class2Hour12: ''
        }
        
        const headerTotalPlaza = {
            plazaAbbreviation: 'Plaza',
            laneAbbreviation: '0',
            class1Hour0: '1',
            class2Hour0: '2',
            class1Hour1: '3',
            class2Hour1: '4',
            class1Hour2: '5',
            class2Hour2: '6',
            class1Hour3: '7',
            class2Hour3: '8',
            class1Hour4: '9',
            class2Hour4: '10',
            class1Hour5: '11',
            class2Hour5: '12',
            class1Hour6: '13',
            class2Hour6: '14',
            class1Hour7: '15',
            class2Hour7: '16',
            class1Hour8: '17',
            class2Hour8: '18',
            class1Hour9: '19',
            class2Hour9: '20',
            class1Hour10: '21',
            class2Hour10: '22',
            class1Hour11: '23',
            class2Hour11: 'C1',
            class1Hour12: 'C2',
            class2Hour12: 'C1+C2'
        }
        
        const exportTotalPlazaList = res.total.map((item) => {
          return {
            plazaAbbreviation: item.tsbAbbreviationTotal,
            laneAbbreviation: item.hour0Total,
            class1Hour0: item.hour1Total,
            class2Hour0: item.hour2Total,
            class1Hour1: item.hour3Total,
            class2Hour1: item.hour4Total,
            class1Hour2: item.hour5Total,
            class2Hour2: item.hour6Total,
            class1Hour3: item.hour7Total,
            class2Hour3: item.hour8Total,
            class1Hour4: item.hour9Total,
            class2Hour4: item.hour10Total,
            class1Hour5: item.hour11Total,
            class2Hour5: item.hour12Total,
            class1Hour6: item.hour13Total,
            class2Hour6: item.hour14Total,
            class1Hour7: item.hour15Total,
            class2Hour7: item.hour16Total,
            class1Hour8: item.hour17Total,
            class2Hour8: item.hour18Total,
            class1Hour9: item.hour19Total,
            class2Hour9: item.hour20Total,
            class1Hour10: item.hour21Total,
            class2Hour10: item.hour22Total,
            class1Hour11: item.hour23Total,
            class2Hour11: item.class1TsbTotal,
            class1Hour12: item.class2TsbTotal,
            class2Hour12: item.class1and2TsbTotal,
          }
        })

        const TotalPlaza = {
            plazaAbbreviation: 'Total',
            laneAbbreviation: res.hour0TotalTsb,
            class1Hour0: res.hour1TotalTsb,
            class2Hour0: res.hour2TotalTsb,
            class1Hour1: res.hour3TotalTsb,
            class2Hour1: res.hour4TotalTsb,
            class1Hour2: res.hour5TotalTsb,
            class2Hour2: res.hour6TotalTsb,
            class1Hour3: res.hour7TotalTsb,
            class2Hour3: res.hour8TotalTsb,
            class1Hour4: res.hour9TotalTsb,
            class2Hour4: res.hour10TotalTsb,
            class1Hour5: res.hour11TotalTsb,
            class2Hour5: res.hour12TotalTsb,
            class1Hour6: res.hour13TotalTsb,
            class2Hour6: res.hour14TotalTsb,
            class1Hour7: res.hour15TotalTsb,
            class2Hour7: res.hour16TotalTsb,
            class1Hour8: res.hour17TotalTsb,
            class2Hour8: res.hour18TotalTsb,
            class1Hour9: res.hour19TotalTsb,
            class2Hour9: res.hour20TotalTsb,
            class1Hour10: res.hour21TotalTsb,
            class2Hour10: res.hour22TotalTsb,
            class1Hour11: res.hour23TotalTsb,
            class2Hour11: res.c1TotalTsb,
            class1Hour12: res.c2TotalTsb,
            class2Hour12: res.c1C2TotalTsb,
        }
    
        return { ...res, 
            listExport: [
                ...res.list, totalByClass, grandTotal, spaceRow, headerTotalPlaza, 
                ...exportTotalPlazaList, TotalPlaza
            ]}
    }

    const getDataDailyTollCollction = async (dataOutput) => {
        try {
          setLoading(true);
          const res = await GET_DATA_INFO_M070000013(dataOutput, props.auth.token);
          console.log("res 7.13", res)
        //   console.log("Test = ", res.list[0].plazaAbbreviation)
          if (res.status.code === "S200") {
            setLoading(false);
            setDataSource(addIndex(res));
            setListlength(res.list.length)
            // console.log("dataSource = ", dataSource )
            // console.log("Lenght = ", Listlength )
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

    const tsb = plazaList.find((e) => e.tsbId === DataList.tsbId);
        setDataToPrint({
            DataList,
            plazaDescription: tsb ? tsb.tsbNameTh : "ทั้งหมด",
        });
    };
    
    const handleOnFinish = (value) => {
        handleChangeIdToName(value);
        setInitialValue(value);
        const dataOutput = {
            date: _timeZoneThai(value.date),
            plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
        };
        getDataDailyTollCollction(dataOutput);
        // console.log("print ", dataToPrint);
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
                    scroll={scrollX}
                    columns={columns}
                    bordered
                    dataSource={dataSource.list}
                    summary={summaryData}
                    pagination={{
                        showSizeChanger: _isEmpty(dataSource.list) ? false : true,
                        position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
                    }}
                />
            </div>
            <div className={_isEmpty(dataSource.total) ? "mt-40" : "mt-40"}>
                <Table
                    size="small"
                    rowKey={(row, ind) => ind}
                    scroll={scrollX}
                    columns={columnsTsbTotal}
                    bordered
                    dataSource={dataSource.total}
                    summary={summaryDataTotal}
                    pagination={false}
                />
            </div>
        </Skeleton>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
  
const mapDispatchToProps = {}
  
export default connect(mapStateToProps, mapDispatchToProps)(HourlyTrafficByPlazaAndLaneReport)
