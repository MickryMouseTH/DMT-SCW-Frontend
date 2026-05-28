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
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M080000003 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportEtcTransactionNotIncome = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});


  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        tsbId:
          props.location.value.tsbId === 0
            ? null
            : props.location.value.tsbId,
      };
      getData(dataOutput);
    }
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsMainList = [
    {
      title: <b>Date</b>,
      key: "dateString",
      dataIndex: "dateString",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.dateString === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>พบบัตร ไม่พบรถ (08)</b>,
      key: "trx08",
      dataIndex: "trx08",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx08 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      } 
    },
    {
      title: <b>พบบัตรหลายใบ (09)</b>,
      key: "trx09",
      dataIndex: "trx09",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx09 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>ไม่พบบัตร (22)</b>,
      key: "trx22",
      dataIndex: "trx22",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx22 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>Blacklist (26)</b>,
      key: "trx26",
      dataIndex: "trx26",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx26 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>Unlisted (23)</b>,
      key: "trx23",
      dataIndex: "trx23",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx23 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>รถถอยออก (90)</b>,
      key: "trx90",
      dataIndex: "trx90",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx90 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>เงินไม่พอ (20)</b>,
      key: "trx20",
      dataIndex: "trx20",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx20 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>ซ้ำ 02 (86)</b>,
      key: "trx86",
      dataIndex: "trx86",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx20 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>ซ้ำ 10 (87)</b>,
      key: "trx87",
      dataIndex: "trx87",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx20 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>ซ้ำ 19 (88)</b>,
      key: "trx88",
      dataIndex: "trx88",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trx20 === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>รวม</b>,
      key: "trxTotal",
      dataIndex: "trxTotal",
      align: 'center',
      width: 50,
      render: (value, row, index) => {
          const obj = {
            children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
            props: {}
          };
          if (row.trxTotal === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
  ]


  const columnsMainTotal = [
    'totalTrx08',
    'totalTrx09',
    'totalTrx22',
    'totalTrx26',
    'totalTrx23',
    'totalTrx90',
    'totalTrx20',
    'totalTrx86',
    'totalTrx87',
    'totalTrx88',
    'totalTrxTotal',
  ]

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate
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
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate
      },
    },
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : "ทั้งหมด",
      },
    },
  ];

  // const header81 = [
  //   { name: "ด่าน", key: "dateString", type: "nullColumn", align: 'center', className: 'text-center' },
  //   { name: "พบบัตร ไม่พบรถ (08)", key: "trx08", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "พบบัตรหลายใบ (09)", key: "trx09", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "ไม่พบบัตร (22)", key: "trx22", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "Blacklist (26)", key: "trx26", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "Unlisted (23)", key: "trx23", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "รถถอยออก (90)", key: "trx90", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "เงินไม่พอ (20)", key: "trx20", type: "nullColumn", align: 'center', className: 'text-right' },
  //   { name: "รวม", key: "trxTotal", type: "nullColumn", align: 'center', className: 'text-right' },
  // ]

  const tableSummaryRowRender = (listRender = [], cellIndex = 1) => {
    return listRender.map((title, index) =>
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "right", fontWeight: "bold" }}>{_isNull(dataSource[title])}</div>
      </Table.Summary.Cell>
    )
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.3 รายงานจำนวนรถยนต์ที่ไม่เป็นรายได้จากระบบเก็บค่าผ่านทางอัตโนมัติ (ต่อด่านเก็บค่าผ่านทาง)"],
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
    // {
    //   name: "ส่งออก",
    //   props: {
    //     type: "primary",
    //     onClick: () => {
    //       _exportFileExcel({
    //         dataSource: { list: dataSource.listExport },
    //         fileName: "8.3 รายงานจำนวนรถยนต์ที่ไม่เป็นรายได้จากระบบเก็บค่าผ่านทางอัตโนมัติ (ต่อด่านเก็บค่าผ่านทาง)",
    //         header: header81,
    //       });
    //     },
    //   },
    // },
  ];

  const handleDetail = async (item) => {
    if (item.seckey) {
      try {
        await props.history.push({
          pathname: `/report-etc-transaction-not-income/plaza-detail/${item.seckey}`,
          value: initialValue,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't select this row",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const getPlazaList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
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

  const addIndex = (res) => {

    const totalAll = {
      dateString: 'Total',
      trx08: res.totalTrx08,
      trx09: res.totalTrx09,
      trx22: res.totalTrx22,
      trx26: res.totalTrx26,
      trx23: res.totalTrx23,
      trx90: res.totalTrx90,
      trx20: res.totalTrx20,
      trx86: res.totalTrx86,
      trx87: res.totalTrx87,
      trx88: res.totalTrx88,
      trxTotal: res.totalTrxTotal,
    }


    return {
      ...res,
      listExport: [...res.list, totalAll]
    }
  }

  const getData = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000003(dataOutput, props.auth.token);
      console.log("res 8.3", res);
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
    const plaza = plazaList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      plazaAbbreviation: plaza ? plaza.tsbNameTh : "ทั้งหมด",
    });
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
        tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      };
      getData(dataOutput);
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
    { name: "ด่าน", value: dataToPrint.plazaAbbreviation ? dataToPrint.plazaAbbreviation : "" },
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
    }
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
          rowKey={(row, ind) => ind}
          columns={columnsMainList}
          bordered
          dataSource={dataSource.list}
          pagination={false}
          summary={() => {
            return (
              <>
                <Table.Summary.Row >
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}><b>TOTAL</b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsMainTotal)}
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource.listExport}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "8.3 รายงานจำนวนรถยนต์ที่ไม่เป็นรายได้จากระบบเก็บค่าผ่านทางอัตโนมัติ (ต่อด่านเก็บค่าผ่านทาง)"
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
)(ReportEtcTransactionNotIncome);