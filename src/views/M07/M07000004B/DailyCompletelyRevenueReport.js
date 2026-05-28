import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
// import { useReactToPrint } from "react-to-print";
import moment from 'moment'
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull } from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading";
import { Chart } from "react-google-charts";

import { GET_DATA_INFO_M07000004B, DOWNLOAD_FILE_PDF_M07000004B } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { header742_1, header742_2 } from "../../../tools/excel/header";
import html2canvas from "html2canvas";
// import PrintPDF from "./PrintPDF"
// import PrintPDF2 from "./PrintPDF2"

const dateFormat = "DD/MM/YYYY";

const DailyCompletelyTrafficAndRevenueReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  // const [scroll, setScroll] = useState({});
  // const [dataToPrint, setDataToPrint] = useState({});
  const [dataCharts, setDataCharts] = useState({ list: [] });
  const [options, setOptions] = useState([]);
  // const [optionsChartPdf, setOptionsChartPdf] = useState([]);
  const ToCaptureRef = React.useRef() // ref
  const [shiftEffectiveTypeList, setShiftEffectiveTypeList] = useState([]);
  const [shiftEffectiveTypeId, setShiftEffectiveTypeId] = useState(1);

  useEffect(() => {
    // setScroll({ x: 1500, y: 600 });

    setShiftEffectiveTypeList(["3 กะ", "2 กะ"]);

    const data = [
      ["ด่าน", "Traffic Valum", "Revenue", { role: 'annotation' }, { role: "style" }],
      ["", 0, 0, "0", "#f48024"]
    ];
    setDataCharts(data);
    const options = {
      height: 600,
      legend: { position: "left" },
      title: null,
      hAxis: {
        title: null,
        minValue: 0,
        maxValue: 2500000,
        ticks: [0, 500000, 1000000, 1500000, 2000000, { v: 2500000, f: "2,500,000 baht" }],
        // ticks: [0, 500000, 1000000, 1500000, 2000000, 2500000],
        gridlines: { count: 5 },
        textStyle: { color: '#4F81BC', fontSize: 24 }
      },
      vAxis: {
        title: null,
        titleTextStyle: { color: "#333" }
      },
      backgroundColor: '#FFFFFF',
      colors: ["#BF4F4D", "#4F81BC"],
      annotations: {
        textStyle: {
          fontSize: 24,
        }
      }
    };
    setOptions(options);
    // const optionsChartPdf = {
    //   title: "",
    //   fontSize: 6,
    //   hAxis: { title: "", minValue: 0, maxValue: 2500000, gridlines: { count: 5 }, textStyle: { color: '#4F81BC' } },
    //   vAxis: { title: "", titleTextStyle: { color: "#333" } },
    //   // chartArea: { width: "65%", height: "70%" },
    //   backgroundColor: '#FFFFFF',
    //   colors: ["#4F81BC", "#BF4F4D"]
    // };
    // setOptionsChartPdf(optionsChartPdf);

    // if (props.location.value) {
    //   setInitialValue(props.location.value);
    //   const dataOutput = {
    //     operationalDate: _timeZoneThai(props.location.value.operationalDate),
    //   };
    //   getDataDailyTollCollction(dataOutput);
    //   setDataToPrint(props.location.dataToPrint);
    // }

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
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: <b>P.M.</b>,
      key: "pm",
      dataIndex: "pm",
      align: 'center',
      width: 40,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
    },
    {
      title: <b>NIGHT</b>,
      key: "night",
      dataIndex: "night",
      align: 'center',
      width: 40,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
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
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
        },
        {
          title: <b>%</b>,
          key: "tollPercent",
          dataIndex: "tollPercent",
          align: 'center',
          width: 40,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{(record.textAlign !== "center" && record.textAlign !== "") ? Number(_isNull(text)).toFixed(2) : _isNull(text)}</div >
        },
      ]
    },
  ]

  const columnsMainList2 = [
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
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: <b>P.M.</b>,
      key: "pm",
      dataIndex: "pm",
      align: 'center',
      width: 40,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
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
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div >
        },
        {
          title: <b>%</b>,
          key: "tollPercent",
          dataIndex: "tollPercent",
          align: 'center',
          width: 40,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.textAlign === "left" ? "" : "bold" }}>{(record.textAlign !== "center" && record.textAlign !== "") ? Number(_isNull(text)).toFixed(2) : _isNull(text)}</div >
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

  const columnsMainTotal2 = [
    'amTotal',
    'pmTotal',
    'tollTotal',
    'tollPercent',
  ]

  const columnsMainPercent = [
    'amPercent',
    'pmPercent',
    'nightPercent',
    'totalPercent',
  ]

  const columnsMainPercent2 = [
    'amPercent',
    'pmPercent',
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

  const columnsDualPlazasList2 = [
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
    },
    {
      type: "select",
      option: {
        name: "shiftEffectiveTypeId",
        label: "ประเภทกะ",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...shiftEffectiveTypeList],
            keyValue: "shiftEffectiveTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.shiftEffectiveTypeId ? initialValue.shiftEffectiveTypeId : "3 กะ",
      },
    },
  ];

  // const headerText = [
  //   {
  //     name: "Operational Date",
  //     value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.operationalDate, "DD/MM/YYYY") : "",
  //   }
  // ];

  const handlePrintFile = (source) => {
    // handlePrint();
    handleDownload(source);
  };

  // const printReportRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => printReportRef.current,
  //   documentTitle: ["7.4.2 Daily Completely Revenue Report"],
  // });

  function captureScreenshot() {
    var canvasPromise = html2canvas(ToCaptureRef.current, {
      useCORS: true
    });
    canvasPromise.then((canvas) => {
      var dataImg = canvas.toDataURL("image/png");
      console.log(dataImg);
      handlePrintFile(addImageChart(dataSource, dataImg));
      // var img = new Image();
      // img.src = dataImg;
      // img.download = dataImg;
      // var a = document.createElement("a");
      // a.innerHTML = "DOWNLOAD";
      // a.target = "_blank";
      // a.href = img.src;
      // a.download = img.download;
      // document.body.appendChild(a);
      // a.click();
    });
  }


  const addImageChart = (res, img) => {
    return {
      ...res
      , imageChart: img
    }
  }

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: () =>
          captureScreenshot()
        // props.history.push({
        //   pathname: `/daily-completely-revenue-report2/reportdetail`,
        //   value: initialValue,
        //   dataSource: dataSource,
        //   dataCharts: dataCharts,
        //   optionsCharts: optionsChartPdf,
        //   dataToPrint: dataToPrint,
        //   HeaderBar: {
        //     headerText,
        //     position: "d-flex justify-content-start",
        //     colSpan: 24,
        //     TopicText: "7.4.2 Daily Completely Revenue Report"
        //   }
        // }),
        // onClick: handlePrintFile,
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
            fileName: "7.4.2 Daily Completely Traffic and Revenue Report",
            header: shiftEffectiveTypeId === 1 ? header742_1 : header742_2,
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
      textAlign: 'right',
      am: res.amPercent,
      pm: res.pmPercent,
      night: res.nightPercent,
      tollTotal: res.totalPercent,
      tollPercent: '',
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

    const headerExportRecap2 = {
      plaza: 'Recap',
      am: 'Revenue',
      pm: '%',
      tollTotal: 'Traffic Volume',
      tollPercent: '%',
    }

    const exportRecapList = res.recapList.map((item) => {
      const dataOutput1 = {
        plaza: item.plaza,
        am: item.revenue,
        pm: item.revenuePercent,
        night: item.trafficVolume,
        tollTotal: item.trafficVolumePercent,
      }
      const dataOutput2 = {
        plaza: item.plaza,
        am: item.revenue,
        pm: item.revenuePercent,
        tollTotal: item.trafficVolume,
        tollPercent: item.trafficVolumePercent,
      }
      return shiftEffectiveTypeId === 1 ? dataOutput1 : dataOutput2
    })

    return {
      ...res
      , listPdf: [...res.list, totalAll, shiftRevenuePercentage]
      , listExport: [...res.list, totalAll, shiftRevenuePercentage,
        headerExportDualPlazas, ...res.dualPlazasList,
      (shiftEffectiveTypeId === 1 ? headerExportRecap : headerExportRecap2), ...exportRecapList]
    }
  }

  const addDataCharts = (res) => {
    if (res.listCharts.length === 0) {
      return [["ด่าน", "Traffic Valum", "Revenue", { role: 'annotation' }, { role: "style" }], ["", 0, 0, "0", "#f48024"]];
    } else {
      const list = res.listCharts.map((item) => {
        return [...[item.plaza, 0, item.tollTotal, item.tollTotal, item.color]]
      })
      return [["ด่าน", "Traffic Valum", "Revenue", { role: 'annotation' }, { role: "style" }], ...list];
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004B(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
        setDataCharts(addDataCharts(res));
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

  const handleDownload = async (source) => {
    try {
      await DOWNLOAD_FILE_PDF_M07000004B(source, props.auth.token);
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

  // const handleChangeIdToName = (DataList) => {
  //   setDataToPrint({
  //     DataList,
  //   });
  // };

  const handleOnFinish = (value) => {
    // handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      operationalDate: _timeZoneThai(value.operationalDate),
      shiftEffectiveTypeId: value.shiftEffectiveTypeId === "3 กะ" ? 1 : 2,
    };
    setShiftEffectiveTypeId(dataOutput.shiftEffectiveTypeId);
    getDataDailyTollCollction(dataOutput);
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
          // scroll={scroll}
          columns={shiftEffectiveTypeId === 1 ? columnsMainList : columnsMainList2}
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
                  {tableSummaryRowRender(shiftEffectiveTypeId === 1 ? columnsMainTotal : columnsMainTotal2)}
                </Table.Summary.Row>
                <Table.Summary.Row >
                  <Table.Summary.Cell >
                    <div style={{ textAlign: "right" }}><b>Shift Revenue Percentage</b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(shiftEffectiveTypeId === 1 ? columnsMainPercent : columnsMainPercent2)}
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
          columns={shiftEffectiveTypeId === 1 ? columnsDualPlazasList : columnsDualPlazasList2}
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
      <div className="d-flex justify-content-start">
        <p2 className="mb-0">{"Revenue and Traffic Volume Distribution Chart " + (dataSource.operationalDateFormat2 != null ? dataSource.operationalDateFormat2 : "")}</p2>
      </div>

      <div ref={ToCaptureRef}>
        <Chart
          chartType="BarChart"
          width="100%"
          height="600px"
          data={dataCharts}
          options={options}
        />
      </div>

      {/* <div className="d-none">
        <PrintPDF2 className="BillPDF"
          ref={printReportRef}
          dataFisrtTable={dataSource.listPdf}
          dataSecondTable={dataSource.dualPlazasList}
          dataThirdTable={dataSource.recapList}
          dataCharts={dataCharts}
          optionsCharts={options}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 24,
            TopicText: "7.4.2 Daily Completely Revenue Report"
          }} />
      </div> */}

      {/* <div className="d-none">
        <PrintPDF className="BillPDF" ref={printReportRef}
          dataFisrtTable={dataSource.listPdf}
          dataSecondTable={dataSource.dualPlazasList}
          dataThirdTable={dataSource.recapList}
          dataCharts={dataCharts}
          optionsCharts={options}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 24,
            TopicText: "7.4.2 Daily Completely Revenue Report"
          }}
        />
      </div> */}

    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DailyCompletelyTrafficAndRevenueReport)
