import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from 'moment'
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M070000007 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { header77 } from "../../../tools/excel/header";
import PrintPDF from "./PrintPDF"

const dateFormat = "DD/MM/YYYY";

const DailyCompletelyTrafficAndRevenueReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  // const [scroll, setScroll] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});

  useEffect(() => {
    // setScroll({ x: 1500, y: 600 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnsMainList = [
    {
      title: <b>PLAZA</b>,
      key: "plaza",
      dataIndex: "plaza",
      align: 'center',
      width: 100,
      render: (text, record) => <div style={{ textAlign: record.textAlign, fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: <b>A.M.</b>,
      key: "am",
      dataIndex: "am",
      align: 'center',
      width: 40,
      render: (text, record) => <div style={{ textAlign: "right" , fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: <b>P.M.</b>,
      key: "pm",
      dataIndex: "pm",
      align: 'center',
      width: 40,
      render: (text, record) => <div style={{ textAlign: "right" , fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
    },
    {
      title: <b>NIGHT</b>,
      key: "night",
      dataIndex: "night",
      align: 'center',
      width: 40,
      render: (text, record) => <div style={{ textAlign: "right" , fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
    },
    {
      title: <b>TOLL</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>TOTAL</b>,
          key: "tollTotal",
          dataIndex: "tollTotal",
          align: 'center',
          width: 40,
          render: (text, record) => <div style={{ textAlign: "right" , fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
        },
        {
          title: <b>%</b>,
          key: "tollPercent",
          dataIndex: "tollPercent",
          align: 'center',
          width: 40,
          render: (text, record) => <div style={{ textAlign: "right" , fontWeight: record.textAlign === "left" ? "" : "bold" }}>{record.textAlign !== "center"?Number(_isNull(text)).toFixed(2):_isNull(text)}</div >
        },
      ]
    },
  ]

  const columnsMainTotal = [
    'amTotal',
    'pmTotal',
    'nightTotal',
    'tollTotal',
    'tollPercent',
  ]

  const columnsMainPercent = [
    'amPercent',
    'pmPercent',
    'nightPercent',
    'totalPercent',
  ]


  const columnsDualPlazasList = [
    {
      title: <b>DUAL PLAZAS</b>,
      key: "plaza",
      dataIndex: "plaza",
      align: 'center',
      width: 100,
      render: (text, record) => <div style={{ textAlign: record.textAlign, fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: <b>A.M.</b>,
      key: "am",
      dataIndex: "am",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>P.M.</b>,
      key: "pm",
      dataIndex: "pm",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
    },
    {
      title: <b>NIGHT</b>,
      key: "night",
      dataIndex: "night",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
    },
    {
      title: <b>TOLL</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>TOTAL</b>,
          key: "tollTotal",
          dataIndex: "tollTotal",
          align: 'center',
          width: 40,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
        },
        {
          title: <b>%</b>,
          key: "tollPercent",
          dataIndex: "tollPercent",
          align: 'center',
          width: 40,
          render: (text) => <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div >
        },
      ]
    },
  ]

  const columnsRecapList = [
    {
      title: <b>Recap</b>,
      key: "plaza",
      dataIndex: "plaza",
      align: 'center',
      width: 100,
      render: (text, record) => <div style={{ textAlign: record.textAlign, fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Revenue</b>,
      key: "revenue",
      dataIndex: "revenue",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "revenuePercent",
      dataIndex: "revenuePercent",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div >
    },
    {
      title: <b>Traffic Volume</b>,
      key: "trafficVolume",
      dataIndex: "trafficVolume",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
    },
    {
      title: <b>%</b>,
      key: "trafficVolumePercent",
      dataIndex: "trafficVolumePercent",
      align: 'center',
      width: 40,
      render: (text) => <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div >
    },
  ]

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operationalDate",
        label: "Operational Date",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.operationalDate,
      },
    }
  ];

  const headerText = [
    {
      name: "operationalDate",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.operationalDate,"DD/MM/YYYY")
        : "",
    }
  ];

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.7 Daily Completely Traffic and Revenue Report"],
  });

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
        onClick: () =>
          _exportFileExcel({
            dataSource: { list: dataSource.listExport },
            fileName: "7.7 Daily Completely Traffic and Revenue Report",
            header: header77,
          }),
      },
    },
  ];

  const addIndex = (res) => {

    
    const totalAll = {
      plaza: 'Total',
      am: res.amTotal,
      pm: res.pmTotal,
      night: res.nightTotal,
      tollTotal: res.tollTotal,
      tollPercent: res.tollPercent,
    }
    
    const shiftRevenuePercentage = {
      plaza: 'Shift Revenue Percentage',
      am: res.amPercent,
      pm: res.pmPercent,
      night: res.nightPercent,
      tollTotal: res.totalPercent,
    }
    
    const headerExportDualPlazas = {
      plaza: 'DUAL PLAZAS',
      am: '',
      pm: '',
      night: '',
      tollTotal: '',
      tollPercent: '',
    }
    
    const headerExportRecap = {
      plaza: 'Recap',
      am: 'Revenue',
      pm: '%',
      night: 'Traffic Volume',
      tollTotal: '%',
      tollPercent: '',
    }
    
    const exportRecapList = res.recapList.map((item) => {
      return {
        plaza: item.plaza,
        am: item.revenue,
        pm: item.revenuePercent,
        night: item.trafficVolume,
        tollTotal: item.trafficVolumePercent,
      }
    })

    return { ...res,     
      listExport: [...res.list, totalAll, shiftRevenuePercentage,
        headerExportDualPlazas, ...res.dualPlazasList,
        headerExportRecap, ...exportRecapList]}
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M070000007(dataOutput, props.auth.token);
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
  }


  const tableSummaryRowRender = (listRender = [], cellIndex = 1) => {
    return listRender.map((title, index) =>
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "right" , fontWeight: "bold"}}>{_isNull(dataSource[title])}</div>
      </Table.Summary.Cell>
    )
  }

  const handleChangeIdToName = (DataList) => {
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      operationalDate: _timeZoneThai(value.operationalDate),
    };
    getDataDailyTollCollction(dataOutput);
  };

  // useEffect(() => {
  //   getDataDailyTollCollction();
  // }, [getDataDailyTollCollction]);

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
          // scroll={scroll}
          columns={columnsMainList}
          bordered
          dataSource={dataSource.list}
          pagination={false}
          summary={() => {
            return (
              <>
                <Table.Summary.Row >
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>TOTAL</b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsMainTotal)}
                </Table.Summary.Row>
                <Table.Summary.Row >
                  <Table.Summary.Cell >
                    <div style={{ textAlign: "right" }}><b>Shift Revenue Percentage</b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsMainPercent)}
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.dualPlazasList) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsDualPlazasList}
          bordered
          dataSource={dataSource.dualPlazasList}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.recapList) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsRecapList}
          bordered
          dataSource={dataSource.recapList}
          pagination={false}
        />
      </div>

      <div className="d-none">
        <PrintPDF ref={printReportRef}
          dataFisrtTable={dataSource.list}
          dataSecondTable={dataSource.dualPlazasList}
          dataThirdTable={dataSource.recapList}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "7.7 รายงานรายได้ทั้งหมดรายวัน"
          }}
        />
      </div>

    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DailyCompletelyTrafficAndRevenueReport)
