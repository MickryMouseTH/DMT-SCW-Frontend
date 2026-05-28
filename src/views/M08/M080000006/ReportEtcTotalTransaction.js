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

import { GET_DATA_INFO_M080000006 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportEtcTotalTransaction = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});


  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
        title: <b>Plaza</b>,
        key: "plazaAbbreviation",
        dataIndex: "plazaAbbreviation",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>รายการทั้งหมด</b>,
        key: "allList",
        dataIndex: "allList",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.allList === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.allList === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>ส่งตัดเงิน</b>,
        key: "debitList",
        dataIndex: "debitList",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.debitList === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.debitList === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>รับชำระจาก DOH</b>,
        key: "paymentDOH",
        dataIndex: "paymentDOH",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.paymentDOH === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.paymentDOH === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>รับชำระจาก EXAT</b>,
        key: "paymentEXAT",
        dataIndex: "paymentEXAT",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.paymentEXAT === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.paymentEXAT === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
      title: <b>ค้างชำระจาก DOH</b>,
      key: "arrearsDOH",
      dataIndex: "arrearsDOH",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
          const obj = {
            children: row.totalTrafficCount === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.totalTrafficCount === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>ค้างชำระจาก EXAT</b>,
      key: "arrearsEXAT",
      dataIndex: "arrearsEXAT",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
          const obj = {
            children: row.arrearsEXAT === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.arrearsEXAT === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
  ];

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

  const columnsTotal = [
    'allListTotal',
    'debitListTotal',
    'paymentDOHTotal',
    'paymentEXATTotal',
    'arrearDOHTotal',
    'arrearEXATTotal',
  ]

  const header86 = [
    { name: "Plaza", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "รายการทั้งหมด", key: "allList", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ส่งตัดเงิน", key: "debitList", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "รับชำระจาก DOH", key: "paymentDOH", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "รับชำระจาก EXAT", key: "paymentEXAT", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ค้างชำระจาก DOH", key: "arrearsDOH", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ค้างชำระจาก EXAT", key: "arrearsEXAT", type: "nullColumn", align: 'center', className: 'text-center' }
  ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.6 Report Etc Total Transction"],
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
                dataSource: { list: dataSource.listExport},
                fileName: "8.6 Report Etc Total Transction",
                header: header86,
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

    const totalAll = {
        plazaAbbreviation: 'Total',
        allList: res.allListTotal,
        debitList: res.debitListTotal,
        paymentDOH: res.paymentDOHTotal,
        paymentEXAT: res.paymentEXATTotal,
        arrearsDOH: res.arrearDOHTotal,
        arrearsEXAT: res.arrearEXATTotal,
    }
    

    return { ...res,
        list: [...res.list],     
        listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000006(dataOutput, props.auth.token);
      console.log("res 8.6", res);
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

  const tableSummaryRowRender = (listRender = [], cellIndex = 1) => {
    return listRender.map((title, index) =>
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "right", fontWeight: "bold" }}>{_isNull(dataSource[title])}</div>
      </Table.Summary.Cell>
    )
  }

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
      date: _timeZoneThai(value.date),
      plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
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
            dataSource={dataSource.list}
            pagination={false}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row >
                    <Table.Summary.Cell colSpan={1}>
                      <div style={{ textAlign: "center" }}><b>Total</b></div>
                    </Table.Summary.Cell>
                    {tableSummaryRowRender(columnsTotal)}
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
            colSpan: 7,
            TopicText: "8.6 Report Etc Total Transction"
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
)(ReportEtcTotalTransaction);
