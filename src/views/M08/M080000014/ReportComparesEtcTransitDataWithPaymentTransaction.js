import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _exportFileExcelWithComma814,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M080000014 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ReportComparesEtcTransitDataWithPaymentTransaction = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  // const [typeList, setTypeList] = useState([]);
  const [plazaList, setPlazaList] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});
  
  useEffect(() => {
    // setScroll({ x: 1300 })
    // setTypeList(["Easy Pass", "M-PASS"]);
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
        title: <b>ลำดับ</b>,
        key: "no",
        dataIndex: "no",
        align: 'center',
        width: 60,
        fixed: true,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>ด่าน</b>,
        key: "plazaAbbreviation",
        dataIndex: "plazaAbbreviation",
        align: 'center',
        width: 180,
        fixed: true,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>รหัสด่าน</b>,
        key: "plazaCode",
        dataIndex: "plazaCode",
        align: 'center',
        width: 90,
        fixed: true,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>Lane</b>,
        key: "lane",
        dataIndex: "lane",
        align: 'center',
        width: 90,
        fixed: true,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>จำนวนรายการรถผ่านทาง</b>,
        align: 'center',
        children: [
            {
                title: <b>M-Pass</b>,
                key: "mpass1",
                dataIndex: "mpass1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>EasyPass</b>,
                key: "epass1",
                dataIndex: "epass1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>ไม่ทราบ</b>,
                key: "unknown1",
                dataIndex: "unknown1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>รวม</b>,
                key: "sum1",
                dataIndex: "sum1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
    {
        title: <b>จำนวนรายการส่งตัดเงิน</b>,
        align: 'center',
        children: [
            {
                title: <b>M-Pass</b>,
                key: "mpass2",
                dataIndex: "mpass2",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>EasyPass</b>,
                key: "epass2",
                dataIndex: "epass2",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>รวม</b>,
                key: "sum2",
                dataIndex: "sum2",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
    {
        title: <b>จำนวนรายการที่ได้รับการชำระเงิน</b>,
        align: 'center',
        children: [
            {
                title: <b>M-Pass</b>,
                key: "mpass3",
                dataIndex: "mpass3",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>EasyPass</b>,
                key: "epass3",
                dataIndex: "epass3",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>รวม</b>,
                key: "sum3",
                dataIndex: "sum3",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
    {
        title: <b>ผลต่างรถผ่านทาง / ส่งตัดเงิน</b>,
        align: 'center',
        children: [
            {
                title: <b>M-Pass</b>,
                key: "diffM1",
                dataIndex: "diffM1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>EasyPass</b>,
                key: "diffE1",
                dataIndex: "diffE1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>รวม</b>,
                key: "diffSum1",
                dataIndex: "diffSum1",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
    {
        title: <b>ผลต่างส่งตัดเงิน / รายการที่ได้รับการชำระเงิน</b>,
        align: 'center',
        children: [
            {
                title: <b>M-Pass</b>,
                key: "diffM2",
                dataIndex: "diffM2",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>EasyPass</b>,
                key: "diffE2",
                dataIndex: "diffE2",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>รวม</b>,
                key: "diffSum2",
                dataIndex: "diffSum2",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
  ];

  const fields = [
    {
        type: "datePicker",
        option: {
          name: "startDate",
          label: "จากวันที่",
          childrenProps: {
            format: dateFormat,
            placeholder: "เลือกวันที่...",
            showTime: { defaultValue: moment('22:00:00', 'HH:mm:ss') }
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
          initialValue: _isEmpty(initialValue)
            ? moment("22:00:00", "HH:mm:ss").add(-1, 'days')
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
            showTime: { defaultValue: moment('21:59:59', 'HH:mm:ss') }
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
          initialValue: _isEmpty(initialValue)
            ? moment("21:59:59", "HH:mm:ss")
            : initialValue.endDate,
        },
    },
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
  ];

  const header813 = [
    { name: "ลำดับ", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "รหัสด่าน", key: "plazaCode", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Lane", key: "lane", type: "nullColumn", align: 'center', className: 'text-center' },
    {
        name: "จำนวนรายการรถผ่านทาง",
        key: "",
        align: 'center',
        children: [
          { name: "M-Pass", key: "mpass1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "EasyPass", key: "epass1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "ไม่ทราบ", key: "unknown1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "รวม", key: "sum1", type: "nullColumn", align: 'right', className: 'text-center' },
        ],
    },
    {
        name: "จำนวนรายการส่งตัดเงิน",
        key: "",
        align: 'center',
        children: [
          { name: "M-Pass", key: "mpass2", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "EasyPass", key: "epass2", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "รวม", key: "sum2", type: "nullColumn", align: 'right', className: 'text-center' },
        ],
      },
    {
        name: "จำนวนรายการที่ได้รับการชำระเงิน",
        key: "",
        align: 'center',
        children: [
          { name: "M-Pass", key: "mpass3", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "EasyPass", key: "epass3", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "รวม", key: "sum3", type: "nullColumn", align: 'right', className: 'text-center' },
        ],
    },
    {
        name: "ผลต่างรถผ่านทาง / ส่งตัดเงิน",
        key: "",
        align: 'center',
        children: [
          { name: "M-Pass", key: "diffM1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "EasyPass", key: "diffE1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "รวม", key: "diffSum1", type: "nullColumn", align: 'right', className: 'text-center' },
        ],
    },
    {
    name: "ผลต่างส่งตัดเงิน / รายการที่ได้รับการชำระเงิน",
    key: "",
    align: 'center',
    children: [
        { name: "M-Pass", key: "diffM2", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "EasyPass", key: "diffE2", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "รวม", key: "diffSum2", type: "nullColumn", align: 'right', className: 'text-center' },
    ],
    },
  ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.14 รายงานเปรียบเทียบข้อมูลการผ่านทาง ETC กับ รายการชำระเงิน"],
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
            _exportFileExcelWithComma814({
                dataSource: { list: dataSource.list},
                fileName: "8.14 รายงานเปรียบเทียบข้อมูลการผ่านทาง ETC กับ รายการชำระเงิน",
                headerText: headerText,
                header: header813,
            });
        },
      },
    },
  ];

  const getPlazaList = async () => {
    setScroll({ x: 2000, y: 600 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
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

    const totalAll = {
        no: 'Total',
        plazaAbbreviation: '',
        plazaCode: '',
        lane: '',
        mpass1: res.sumTotalMPass1,
        epass1: res.sumTotalEPass1,
        unknown1: res.sumTotalUnknown1,
        sum1: res.sumTotalSum1,
        mpass2: res.sumTotalMPass2,
        epass2: res.sumTotalEPass2,
        sum2: res.sumTotalSum2,
        mpass3: res.sumTotalMPass3,
        epass3: res.sumTotalEPass3,
        sum3: res.sumTotalSum3,
        diffM1: res.sumTotalDiffM1,
        diffE1: res.sumTotalDiffE1,
        diffSum1: res.sumTotalDiffSum1,
        diffM2: res.sumTotalDiffM2,
        diffE2: res.sumTotalDiffE2,
        diffSum2: res.sumTotalDiffSum2,
    }
    

    return { ...res,
        list: [...res.list, totalAll]
        // listFinal: [...res.listFinal, totalAll],     
        // listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000014(dataOutput, props.auth.token);
      console.log("res 8.1", res);
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
    const plaza = plazaList.find((e) => e.plazaId === DataList.plazaId);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
    console.log("Print -> ",DataList)
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 31) {
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
      };
      getDataDailyTollCollction(dataOutput);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch. ",
        text: "Start date and End date out of lenght 31 days",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const headerText = [
    { name: "วันที่ดำเนินการ", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" }
  ];

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
            scroll={scroll}
            rowKey={(row, ind) => ind}
            columns={columnsOne}
            bordered
            dataSource={dataSource.list}
            pagination={false}
        />
      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource.list}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 8,
            TopicText: "8.14 รายงานเปรียบเทียบข้อมูลการผ่านทาง ETC กับ รายการชำระเงิน"
          }}
        />
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
)(ReportComparesEtcTransitDataWithPaymentTransaction);