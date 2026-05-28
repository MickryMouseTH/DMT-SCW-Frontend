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

import { GET_DATA_INFO_M080000010 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportPassingItemComparisonWithHighway = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scrollX , setScrollX] = useState({})
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});


  useEffect(() => {
    setScrollX({ x: 1600 })
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
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
            if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 5; obj.props.rowSpan = 1; }
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
              children: row.laneAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.laneAbbreviation === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>NTrx</b>,
        key: "ntrxNo",
        dataIndex: "ntrxNo",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.ntrxNo === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.ntrxNo === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>Datetime</b>,
        key: "trxDate",
        dataIndex: "trxDate",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
            const obj = {
              children: row.trxDate === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.trxDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
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
              children: row.pan === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.pan === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
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
              children: row.fare === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.fare === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>XML Create Time</b>,
        key: "xmlCreatetime",
        dataIndex: "xmlCreatetime",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
            const obj = {
              children: row.xmlCreatetime === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.xmlCreatetime === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>DMT GW Sent</b>,
        key: "dmtGwSent",
        dataIndex: "dmtGwSent",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
            const obj = {
              children: row.dmtGwSent === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.dmtGwSent === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>DOH GW Response</b>,
        key: "dohGwResponse",
        dataIndex: "dohGwResponse",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
            const obj = {
              children: row.dohGwResponse === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.dohGwResponse === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>DOH GW Response</b>,
        key: "dohGwResponseMessage",
        dataIndex: "dohGwResponseMessage",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.dohGwResponseMessage === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.dohGwResponseMessage === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
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
          name: "dohResponse",
          label: "DOH GW Reason",
          childrenProps: {
            placeholder: "DOH GW Reason...",
            optionValue: {
              values: ["ทั้งหมด", "Invalid Tariff", "Invalid Plaza", "Insufficient Balance"],
              keyValue: "dohResponse",
            },
          },
          rules: [
            {
              required: false,
              message: "กรุณาเลือก DOH GW Reason!",
            },
          ],
          initialValue: initialValue.dohResponse ? initialValue.dohResponse : "ทั้งหมด",
        },
    },
  ];

const header810 = [
    { name: "Plaza", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Lane", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "NTrx", key: "ntrxNo", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Datetime", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "PAN", key: "pan", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Fare", key: "fare", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "XML Create Time", key: "xmlCreatetime", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "DMT GW Sent", key: "dmtGwSent", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "DOH GW Response", key: "dohGwResponse", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "DOH GW Response", key: "dohGwResponseMessage", type: "nullColumn", align: 'center', className: 'text-center' },
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
    documentTitle: ["8.10 Report Passing Item Comparison With Highway Cut Off"],
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
                dataSource: { list: dataSource.listExportExcel},
                fileName: "8.10 Report Passing Item Comparison With Highway Cut Off",
                header: header810,
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
        plazaAbbreviation: 'Total',
        laneAbbreviation: '#0xNull',
        ntrxNo: '#0xNull',
        trxDate: '#0xNull',
        pan: '#0xNull',
        fare: res.fareTotal,
        xmlCreatetime: '',
        dmtGwSent: '#0xNull',
        dohGwResponse: '#0xNull',
        dohGwResponseMessage: '',
    }

    
    const totalAllExcel = {
      plazaAbbreviation: 'Total',
      laneAbbreviation: '',
      ntrxNo: '',
      trxDate: '',
      pan: '',
      fare: res.fareTotal,
      xmlCreatetime: '',
      dmtGwSent: '',
      dohGwResponse: '',
      dohGwResponseMessage: '',
  }
    

    return { ...res,
        list: [...res.list],     
        listExport: [...res.list, totalAllPDF],
        listExportExcel: [...res.list, totalAllExcel]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000010(dataOutput, props.auth.token);
      console.log("res 8.10", res);
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
      dohResponse: value.dohResponse === "ทั้งหมด" ? null : value.dohResponse,
    };
    getDataDailyTollCollction(dataOutput);
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "วันที่ดำเนินการ",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.date,"DD/MM/YYYY")
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
            columns={columnsOne}
            bordered
            scroll={scrollX}
            dataSource={dataSource.list}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row >
                    <Table.Summary.Cell colSpan={5}>
                      <div style={{ textAlign: "center" }}><b>Total</b></div>
                    </Table.Summary.Cell>
                    {tableSummaryRowRender(columnsTotal)}
                    <Table.Summary.Cell colSpan={3}>
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
            colSpan: 10,
            TopicText: "8.10 รายการผ่านทางที่ไม่ตรงตามเงื่อนไข เพื่อการเทียบกับข้อมูลของกรมทางหลวง"
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
)(ReportPassingItemComparisonWithHighway);
