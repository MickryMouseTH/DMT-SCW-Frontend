import React, { useState, useRef } from "react";
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

import { GET_DATA_INFO_M080000009 } from "../../../service/api/report";
// import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportPaymentFromHighwayCutOff = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  // const [
  //   //   scroll
  //   , setScroll] = useState({});
  // const [plazaList, setPlazaList] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});


  // useEffect(() => {
  //   getPlazaList();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const columnsOne = [
    {
        title: <b>CS</b>,
        align: 'center',
        children: [
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
                    if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>Lane</b>,
                key: "laneAbbreviation",
                dataIndex: "laneAbbreviation",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                    children: row.laneAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.laneAbbreviation === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>PAN</b>,
                key: "panString",
                dataIndex: "panString",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                    children: row.panString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.panString === '#0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>วันเวลาที่ตัดเงิน</b>,
                key: "csDate",
                dataIndex: "csDate",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                    children: row.csDate === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.csDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
    {
        title: <b>DMT</b>,
        align: 'center',
        children: [
            {
                title: <b>วันเวลาผ่านทาง</b>,
                key: "dmtDate",
                dataIndex: "dmtDate",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                    children: row.dmtDate === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.dmtDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>Fare</b>,
                key: "fareAmount",
                dataIndex: "fareAmount",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                    children: row.fareAmount === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.fareAmount === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
        ],
    },
  ];

  const columnsTotal = [
    'fareAmountTotal',
  ]

  const fields = [
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

const header89 = [
    {
        name: "DMT",
        align: 'center',
        children: [
            { name: "Plaza", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
            { name: "Lane", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
            { name: "PAN", key: "panString", type: "nullColumn", align: 'center', className: 'text-center' },
            { name: "วันเวลาที่ตัดเงิน", key: "csDate", type: "nullColumn", align: 'center', className: 'text-center' },
        ],
    },
    {
        name: "DMT",
        align: 'center',
        children: [
            { name: "วันเวลาผ่านทาง", key: "dmtDate", type: "nullColumn", align: 'center', className: 'text-center' },
            { name: "Fare", key: "fareAmount", type: "nullColumn", align: 'center', className: 'text-center' },
        ],
    },
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
    documentTitle: ["8.9 Report Payment from highway cut off"],
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
                fileName: "8.9 Report Payment from highway cut off",
                header: header89,
            });
        },
      },
    },
  ];

  
  const addIndex = (res) => {

    const totalAll = {
        plazaAbbreviation: 'Total',
        laneAbbreviation: '#0xNull',
        panString: '#0xNull',
        csDate: '',
        dmtDate: '',
        fareAmount: res.fareAmountTotal,
    }
    

    return { ...res,
        list: [...res.list],     
        listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000009(dataOutput, props.auth.token);
      console.log("res 8.9", res);
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
    // const plaza = plazaList.find((e) => e.plazaId === DataList.plazaId);
    setDataToPrint({
      DataList,
      // plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const dataOutput = {
      date: _timeZoneThai(value.date),
    };
    getDataDailyTollCollction(dataOutput);
  };

  const headerText = [
    // { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
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
            summary={() => {
              return (
                <>
                  <Table.Summary.Row >
                    <Table.Summary.Cell colSpan={3}>
                      <div style={{ textAlign: "center" }}><b>Total</b></div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1}>
                      <div style={{ textAlign: "right" }}><b></b></div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1}>
                      <div style={{ textAlign: "right" }}><b></b></div>
                    </Table.Summary.Cell>
                    {tableSummaryRowRender(columnsTotal)}
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
            colSpan: 6,
            TopicText: "8.9 Report Payment from highway cut off"
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
)(ReportPaymentFromHighwayCutOff);
