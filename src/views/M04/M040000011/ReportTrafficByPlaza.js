import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _exportFileExcel_Menu411,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M040000011 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ReportTrafficByPlaza = (props) => {
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
            if (row.no === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
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
        title: <b>Class 1 ( 4 ล้อ )</b>,
        align: 'center',
        children: [
            {
                title: <b>MTC</b>,
                align: 'center',
                children: [
                    {
                        title: <b>เงินสด</b>,
                        key: "cash1",
                        dataIndex: "cash1",
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
                        title: <b>คูปอง</b>,
                        key: "coupon1",
                        dataIndex: "coupon1",
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
                        title: <b>EMV</b>,
                        key: "emv1",
                        dataIndex: "emv1",
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
                        title: <b>QR</b>,
                        key: "qrcode1",
                        dataIndex: "qrcode1",
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
                        title: <b>รวม MTC</b>,
                        key: "sumMTC1",
                        dataIndex: "sumMTC1",
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
                title: <b>ETC</b>,
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
                        title: <b>รวม ETC</b>,
                        key: "sumETC1",
                        dataIndex: "sumETC1",
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
                title: <b>รวม MTC-ETC</b>,
                key: "sumMTCETC",
                dataIndex: "sumMTCETC",
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
                title: <b>% MTC</b>,
                key: "percentMTC",
                dataIndex: "percentMTC",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value.toFixed(2))}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value.toFixed(2))}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>% ETC</b>,
                key: "percentETC",
                dataIndex: "percentETC",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value.toFixed(2))}</div>
                        : <div style={{ textAlign: "right" }}>{_isNull(value.toFixed(2))}</div>,
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
        title: <b>Class 2 ( มากกว่า 4 ล้อ )</b>,
        align: 'center',
        children: [
            {
                title: <b>MTC</b>,
                align: 'center',
                children: [
                    {
                        title: <b>เงินสด</b>,
                        key: "cash2",
                        dataIndex: "cash2",
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
                        title: <b>คูปอง</b>,
                        key: "coupon2",
                        dataIndex: "coupon2",
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
                        title: <b>EMV</b>,
                        key: "emv2",
                        dataIndex: "emv2",
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
                        title: <b>QR</b>,
                        key: "qrcode2",
                        dataIndex: "qrcode2",
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
                        title: <b>รวม MTC</b>,
                        key: "sumMTC2",
                        dataIndex: "sumMTC2",
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
        ]
    },
    {
      title: <b>รวมทั้งหมด</b>,
      key: "sumAll",
      dataIndex: "sumAll",
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
            showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
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
            showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') }
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
          initialValue: _isEmpty(initialValue)
            ? moment("23:59:59", "HH:mm:ss")
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
    {
        name: "Class 1 ( 4 ล้อ )",
        key: "",
        align: 'center',
        children: [
          // {
          //   name: "MTC",
          //   key: "",
          //   children: [
          //     { name: "เงินสด", key: "cash1", type: "nullColumn", align: 'right', className: 'text-center' },
          //     { name: "คูปอง", key: "coupon1", type: "nullColumn", align: 'right', className: 'text-center' },
          //     { name: "EMV", key: "emv1", type: "nullColumn", align: 'right', className: 'text-center' },
          //     { name: "QR", key: "qrcode1", type: "nullColumn", align: 'right', className: 'text-center' },
          //     { name: "รวม MTC", key: "sumMTC1", type: "nullColumn", align: 'right', className: 'text-center' },
          //   ],
          // },
          { name: "MTC เงินสด", key: "cash1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "MTC คูปอง", key: "coupon1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "MTC EMV", key: "emv1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "MTC QR", key: "qrcode1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "รวม MTC", key: "sumMTC1", type: "nullColumn", align: 'right', className: 'text-center' },
          // {
          //   name: "ETC",
          //   key: "",
          //   children: [
          //     { name: "M-Pass", key: "mpass1", type: "nullColumn", align: 'right', className: 'text-center' },
          //     { name: "EasyPass", key: "epass1", type: "nullColumn", align: 'right', className: 'text-center' },
          //     { name: "รวม ETC", key: "sumETC1", type: "nullColumn", align: 'right', className: 'text-center' },
          //   ],
          // },
          { name: "M-Pass", key: "mpass1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "EasyPass", key: "epass1", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "รวม ETC", key: "sumETC1", type: "nullColumn", align: 'right', className: 'text-center' },

          { name: "รวม MTC-ETC", key: "sumMTCETC", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "% MTC", key: "percentMTC", type: "nullColumn", align: 'right', className: 'text-center' },
          { name: "% ETC", key: "percentETC", type: "nullColumn", align: 'right', className: 'text-center' },
        ],
    },
    {
      name: "Class 2 ( มากกว่า 4 ล้อ )",
      key: "",
      align: 'center',
      children: [
        // {
        //   name: "MTC",
        //   key: "",
        //   children: [
        //     { name: "เงินสด", key: "cash2", type: "nullColumn", align: 'right', className: 'text-center' },
        //     { name: "คูปอง", key: "coupon2", type: "nullColumn", align: 'right', className: 'text-center' },
        //     { name: "EMV", key: "emv2", type: "nullColumn", align: 'right', className: 'text-center' },
        //     { name: "QR", key: "qrcode2", type: "nullColumn", align: 'right', className: 'text-center' },
        //     { name: "รวม MTC", key: "sumMTC2", type: "nullColumn", align: 'right', className: 'text-center' },
        //   ],
        // },
        { name: "MTC เงินสด", key: "cash2", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "MTC คูปอง", key: "coupon2", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "MTC EMV", key: "emv2", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "MTC QR", key: "qrcode2", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "รวม MTC", key: "sumMTC2", type: "nullColumn", align: 'right', className: 'text-center' },
      ],
    },
    { name: "รวมทั้งหมด", key: "sumAll", type: "nullColumn", align: 'center', className: 'text-center' },
  ]

  const addIndex = (res) => {

    const totalAll = {
        no: 'Total',
        plazaAbbreviation: '',
        cash1: res.sumCash1,
        coupon1: res.sumCoupon1,
        emv1: res.sumEMV1,
        qrcode1: res.sumQRCode1,
        sumMTC1: res.sumSumMTC1,
        mpass1: res.sumMPass1,
        epass1: res.sumEPass1,
        sumETC1: res.sumSumETC1,
        sumMTCETC: res.sumSumMTCETC,
        percentMTC: res.sumPercentMTC,
        percentETC: res.sumPercentETC,
        cash2: res.sumCash2,
        coupon2: res.sumCoupon2,
        emv2: res.sumEMV2,
        qrcode2: res.sumQRCode2,
        sumMTC2: res.sumSumMTC2,
        sumAll: res.sumSumAll,
    }
    

    return { ...res,
        list: [...res.list, totalAll]
        // listFinal: [...res.listFinal, totalAll],     
        // listExport: [...res.list, totalAll]
    }
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.11 รายงานปริมาณการจราจร แยกตามด่าน"],
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
            _exportFileExcel_Menu411({
                dataSource: { list: dataSource.list},
                fileName: "4.11 รายงานปริมาณการจราจร แยกตามด่าน",
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

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M040000011(dataOutput, props.auth.token);
      console.log("res 4.11", res);
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
            TopicText: "4.11 รายงานปริมาณการจราจร แยกตามด่าน"
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
)(ReportTrafficByPlaza);