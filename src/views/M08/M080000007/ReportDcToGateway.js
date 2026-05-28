import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M080000007 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportDcToGateway = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [highwayList, setHighwayList] = useState([]);
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});


  useEffect(() => {
    getPlazaList();
    setHighwayList(["ทั้งหมด", "กรมทางหลวง (M-Pass)", "การทางพิเศษ (Easy-Pass)"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [{
    title: <b>No.</b>,
    key: "no",
    dataIndex: "no",
    align: 'center',
    fixed: true,
    width: 60,
    render: (value, row, index) => {
      const obj = {
        children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
          : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
        props: {}
      };
      if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
      else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
      return obj;
    }
  },
    {
      title: <b>Plaza</b>,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      align: 'center',
      fixed: true,
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>Lane</b>,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      align: 'center',
      fixed: true,
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.laneAbbreviation === "0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>Type</b>,
      key: "type",
      dataIndex: "type",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.type === "0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>PAN</b>,
      key: "pan",
      dataIndex: "pan",
      align: 'center',
      width: 100,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.pan === "0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>Fare</b>,
      key: "fare",
      dataIndex: "fare",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.fare === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ส่งเรียกเก็บเงินวันที่</b>,
      key: "paymentDate",
      dataIndex: "paymentDate",
      align: 'center',
      width: 100,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.paymentDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>วันเวลาผ่านทาง</b>,
      key: "trxDate",
      dataIndex: "trxDate",
      align: 'center',
      width: 100,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.trxDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>วันเวลาที่ตัดเงิน</b>,
      key: "csDate",
      dataIndex: "csDate",
      align: 'center',
      width: 100,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.csDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
  ];

  const columnsTotal = [
    'fareTotal',
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
      type: "input",
      option: {
        name: "laneId",
        label: "ช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.laneId,
      },
    },
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
        name: "highwayId",
        label: "หน่วยงานผู้ออกบัตร",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...highwayList],
            keyValue: "highwayId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.highwayId ? initialValue.highwayId : "ทั้งหมด",
      },
    },
  ];

  const header87 = [
    { name: "No.", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Plaza", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Lane", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Type", key: "type", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "PAN", key: "pan", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Fare", key: "fare", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ส่งเรียกเก็บเงินวันที่", key: "paymentDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันเวลาผ่านทาง", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันเวลาที่ตัดเงิน", key: "csDate", type: "nullColumn", align: 'center', className: 'text-center' },
  ]

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
    documentTitle: ["8.7 รายงานการตัดเงินย้อนหลัง"],
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
          _exportFileExcel({
            dataSource: { list: dataSource.listExportExcel },
            fileName: "8.7 รายงานการตัดเงินย้อนหลัง",
            header: header87,
          });
        },
      },
    },
  ];

  const getPlazaList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
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

    const totalAllPDF = {
      no: "",
      plazaAbbreviation: "Total",
      laneAbbreviation: "0xNull",
      type: "0xNull",
      pan: "0xNull",
      fare: res.fareTotal,
      paymentDate: "",
      trxDate: "",
      csDate: "",
    }

    const totalAllExcel = {
      no: "",
      plazaAbbreviation: "Total",
      laneAbbreviation: "",
      type: "",
      pan: "",
      fare: res.fareTotal,
      paymentDate: "",
      trxDate: "",
      csDate: "",
    }


    return {
      ...res,
      list: [...res.list],
      listExport: [...res.list, totalAllPDF],
      listExportExcel: [...res.list, totalAllExcel]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000007(dataOutput, props.auth.token);
      console.log("res 3.10", res);
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

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
      laneId: _isEmpty(value.laneId) ? null : value.laneId,
      highwayId: value.highwayId === "ทั้งหมด" ? 0 : value.highwayId === "กรมทางหลวง (M-Pass)" ? 1 : 2,
    };
    getDataDailyTollCollction(dataOutput);
  };

  const headerText = [
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
    },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
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
          columns={columnsOne}
          bordered
          dataSource={dataSource.list}
          summary={() => {
            return (
              <>
                <Table.Summary.Row >
                  <Table.Summary.Cell colSpan={3}>
                    <div style={{ textAlign: "center" }}><b>Row</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "center" }}><b>{dataSource.list.length}</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "center" }}><b>Total</b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsTotal)}
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}><b></b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}><b></b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}><b></b></div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.list) ? false : true,
            position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
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
            colSpan: 8,
            TopicText: "3.10 รายการผ่านทาง M-Pass / Easy-Pass"
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
)(ReportDcToGateway);
