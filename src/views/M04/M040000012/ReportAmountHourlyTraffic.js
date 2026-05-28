import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _isZero,
  _setYearThai,
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M040000012 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";
import _exportExcel_412 from "./_exportExcel_412"

const dateFormat = "DD/MM/YYYY";

const ReportAmountHourlyTraffic = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    // scroll
    ,setScroll] = useState({});
  // const [typeList, setTypeList] = useState([]);
  const [plazaList, setPlazaList] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});
  
  useEffect(() => {
    // setScroll({ x: 1300 })
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
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>ชัวโมงที่</b>,
        key: "hourText",
        dataIndex: "hourText",
        align: 'center',
        width: 140,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>ปริมาณจราจร (เที่ยว)</b>,
        align: 'center',
        children: [
            {
                title: <b>MTC</b>,
                key: "mtc",
                dataIndex: "mtc",
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
                title: <b>M-Pass</b>,
                key: "mpass",
                dataIndex: "mpass",
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
                key: "easypass",
                dataIndex: "easypass",
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
                key: "sumEtc",
                dataIndex: "sumEtc",
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
                key: "sumMtcEtc",
                dataIndex: "sumMtcEtc",
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
        ]
    },
    {
        title: <b>ปริมาณจราจร (ร้อยละ)</b>,
        align: 'center',
        children: [
            {
                title: <b>MTC</b>,
                key: "mtcPercent",
                dataIndex: "mtcPercent",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                        : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>M-Pass</b>,
                key: "mpassPercent",
                dataIndex: "mpassPercent",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                        : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>EasyPass</b>,
                key: "easypassPercent",
                dataIndex: "easypassPercent",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                        : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>รวม ETC</b>,
                key: "sumEtcPercent",
                dataIndex: "sumEtcPercent",
                align: 'center',
                width: 100,
                render: (value, row) => {
                    const obj = {
                    children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                        : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                    props: {}
                    };
                    if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ]
    },
  ];

  const fields = [
    {
        type: "datePicker",
        option: {
          name: "date",
          label: "ถึงวันที่",
          childrenProps: {
            format: dateFormat,
            placeholder: "เลือกวันที่..."
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
          initialValue: _isEmpty(initialValue)
            ? moment("00:00:00", "HH:mm:ss")
            : initialValue.date,
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
    {
      type: "input",
      option: {
        name: "lane",
        label: "ช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.lane,
      },
    },
  ];

  const header813 = [
    { name: "ลำดับ", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ชัวโมงที่", key: "hourText", type: "nullColumn", align: 'center', className: 'text-center' },
    {
      name: "ปริมาณจราจร (เที่ยว)",
      key: "",
      align: 'center',
      children: [
        { name: "MTC", key: "mtc", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "M-Pass", key: "mpass", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "EasyPass", key: "easypass", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "รวม ETC", key: "sumEtc", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "รวม", key: "sumMtcEtc", type: "nullColumn", align: 'right', className: 'text-center' },
      ],
    },
    {
      name: "ปริมาณจราจร (ร้อยละ)",
      key: "",
      align: 'center',
      children: [
        { name: "MTC", key: "mtcPercent", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "M-Pass", key: "mpassPercent", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "EasyPass", key: "easypassPercent", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "รวม ETC", key: "sumEtcPercent", type: "nullColumn", align: 'right', className: 'text-center' },
      ],
    },
  ]

  const addIndex = (res) => {

    const totalAll = {
        no: 'Total',
        hourText: '',
        mtc: res.totalMtc,
        mpass: res.totalMpass,
        easypass: res.totalEpass,
        sumEtc: res.totalSumEtc,
        sumMtcEtc: res.totalSumMtcEtc,
        mtcPercent: res.totalMtcPercent,
        mpassPercent: res.totalMpassPercent,
        easypassPercent: res.totalEpassPercent,
        sumEtcPercent: res.totalSumEtcPercent
    }

    return { ...res,
        list: [...res.list, totalAll]
    }
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.12 รายงานปริมาณการจราจร รายชัวโมง"],
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
            _exportExcel_412({
                dataSource: { list: dataSource.list},
                fileName: "4.12 รายงานปริมาณการจราจร รายชัวโมง",
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
      const res = await GET_DATA_INFO_M040000012(dataOutput, props.auth.token);
      console.log("res 4.12", res);
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
  };

//   const handleOnFinish = (value) => {
//     handleChangeIdToName(value);
//     setInitialValue(value);
//     const dataOutput = {
//         date: _timeZoneThai(value.date),
//         plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
//         laneId: _isEmpty(value.lane) ? null : value.lane
//     };
//     getDataDailyTollCollction(dataOutput);
//   };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const plazaIdcheck = value.plazaId
    const laneIdcheck = value.lane
    console.log("plazaIdcheck => "+plazaIdcheck);
    console.log("laneIdcheck => "+laneIdcheck);
    if (_isZero(laneIdcheck)) {
      if(plazaIdcheck !== "ทั้งหมด"){
        const dataOutput = {
            date: _timeZoneThai(value.date),
            plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
            laneId: _isEmpty(value.lane) ? null : value.lane
        };
        getDataDailyTollCollction(dataOutput);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: "Please select plaza id.",
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } else {
      const dataOutput = {
        date: _timeZoneThai(value.date),
        plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
        laneId: _isEmpty(value.lane) ? null : value.lane
      };
      getDataDailyTollCollction(dataOutput);
    }
  };

  const headerText = [
    { name: "วันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.date,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
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
            // scroll={scroll}
            rowKey={(row, ind) => ind}
            columns={columnsOne}
            bordered
            dataSource={dataSource.list}
            pagination={{
              showSizeChanger: _isEmpty(dataSource.list) ? false : true,
              position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
              pageSize: 25
            }}
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
            TopicText: "4.12 รายงานปริมาณการจราจร รายชัวโมง"
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
)(ReportAmountHourlyTraffic);