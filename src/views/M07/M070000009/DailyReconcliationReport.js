import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
// import { exportExcelJs } from "../../../tools/exceljs";
import moment from 'moment'
import { useReactToPrint } from "react-to-print";
import {
  _exportFileExcel,
  _timeZoneThai, _isEmpty, _isNull, _setYearThai
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import summaryData from "./SummaryData";

import { GET_DATA_INFO_M070000009 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import { header79 } from "../../../tools/excel/header";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF"

const dateFormat = "DD/MM/YYYY";

const DailyReconcliationReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] })
  const [initialValue, setInitialValue] = useState({});
  // const [Listlength, setListlength] = useState({ list: [] })
  const [scrollX
    // , setScrollX
  ] = useState({})
  const [dataToPrint,
    setDataToPrint
  ] = useState({})
  const [tsbList, setTsbList] = useState([]);

  const columns = [
    {
      title: <b>Plaza</b>,
      key: "plazaDescription",
      dataIndex: "plazaDescription",
      fixed: true,
      align: "center",
      width: 120,
      render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      // render: (value, row, index) => {
      //   const obj = {
      //     children: row.plazaDescription === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
      //       : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
      //     props: {}
      //   };
      //   if (row.plazaDescription === "ผลรวม") { obj.props.colSpan = 6; obj.props.rowSpan = 1; }
      //   else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
      //   return obj;
      // }
    },
    {
      title: <b>Shift No.</b>,
      key: "shiftTypeId",
      dataIndex: "shiftTypeId",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Staff No</b>,
      key: "staffNo",
      dataIndex: "staffNo",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Staff Name</b>,
      key: "staffName",
      dataIndex: "staffName",
      align: 'center',
      width: 160,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Bag No.</b>,
      key: "bagNo",
      dataIndex: "bagNo",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Serial No.</b>,
      key: "serialNo",
      dataIndex: "serialNo",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
    {
      title: <b>TOD Count</b>,
      align: 'center',
      children: [
        {
          title: <b>Cash</b>,
          key: "todCash",
          dataIndex: "todCash",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: <b>Coupon</b>,
          key: "todCoupon",
          dataIndex: "todCoupon",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: <b>SOD Count</b>,
      align: 'center',
      children: [
        {
          title: <b>Cash</b>,
          key: "sodCash",
          dataIndex: "sodCash",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: <b>Coupon</b>,
          key: "sodCoupon",
          dataIndex: "sodCoupon",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: <b>EMV</b>,
          key: "sodEMV",
          dataIndex: "sodEMV",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: <b>QRCode</b>,
          key: "sodQRCode",
          dataIndex: "sodQRCode",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        }
      ],
    },
    {
      title: <b>Collection Discrepancy</b>,
      key: "collectionDiscrepancy",
      dataIndex: "collectionDiscrepancy",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
    },
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
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...tsbList],
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

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.9 Daily Reconciliation Report"],
  });

  useEffect(() => {
    getTSBList();
    // getDataDailyTollCollction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onClick: () =>
        _exportFileExcel({
          dataSource: { list: dataSource.listExport},
          fileName: "7.9 Daily Reconciliation Report",
          header: header79,
        }),
      },
    },
  ];

  const getTSBList = async () => {
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setTsbList(res.list);
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

    const totalTsb1Data = res.tsb1DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb2Data = res.tsb2DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb3Data = res.tsb3DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb4Data = res.tsb4DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb5Data = res.tsb5DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb6Data = res.tsb6DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb7Data = res.tsb1DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb8Data = res.tsb8DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    const totalTsb9Data = res.tsb9DataTotal.map((item) => {
      return {
        plazaDescription: 'ผลรวม',
        shiftTypeId: "",
        staffNo: "",
        staffName: "",
        bagNo: "",
        serialNo: "",
        todCash: item.todCash,
        todCoupon: item.todCoupon,
        sodCash: item.sodCash,
        sodCoupon: item.sodCoupon,
        sodEMV: item.sodEMV,
        sodQRCode: item.sodQRCode,
        collectionDiscrepancy: ""
      }
    })

    return { ...res, 
        listExport: [
          ...res.tsb1Data, ...totalTsb1Data, 
          ...res.tsb2Data, ...totalTsb2Data, 
          ...res.tsb3Data, ...totalTsb3Data, 
          ...res.tsb4Data, ...totalTsb4Data, 
          ...res.tsb5Data, ...totalTsb5Data, 
          ...res.tsb6Data, ...totalTsb6Data, 
          ...res.tsb7Data, ...totalTsb7Data, 
          ...res.tsb8Data, ...totalTsb8Data, 
          ...res.tsb9Data, ...totalTsb9Data
        ]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M070000009(dataOutput, props.auth.token);
      console.log("res 7.9", res)
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res))
        console.log("Add index res 7.9", dataSource)
        // setListlength(res)
        // console.log("tsbdata lenght:", Listlength )
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

  const handleChangeIdToName = (DataList) => {
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      plazaDescription: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      date: _timeZoneThai(value.date),
      plazaId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
    };
    getDataDailyTollCollction(dataOutput);
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaDescription ? dataToPrint.plazaDescription : "" },
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
      <div className={_isEmpty(dataSource.tsb1Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb1Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb1Data) ? false : true,
            position: _isEmpty(dataSource.tsb1Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb2Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb2Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb2Data) ? false : true,
            position: _isEmpty(dataSource.tsb2Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb3Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb3Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb3Data) ? false : true,
            position: _isEmpty(dataSource.tsb3Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb4Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb4Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb4Data) ? false : true,
            position: _isEmpty(dataSource.tsb4Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb5Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb5Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb5Data) ? false : true,
            position: _isEmpty(dataSource.tsb5Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb6Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb6Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb6Data) ? false : true,
            position: _isEmpty(dataSource.tsb6Data) ? [] : [ "bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb7Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb7Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb7Data) ? false : true,
            position: _isEmpty(dataSource.tsb7Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb8Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb8Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb8Data) ? false : true,
            position: _isEmpty(dataSource.tsb8Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className={_isEmpty(dataSource.tsb9Data) ? "d-none" : "mt-20"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.tsb9Data}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.tsb9Data) ? false : true,
            position: _isEmpty(dataSource.tsb9Data) ? [] : ["bottomRight"],
          }}
        />
      </div>
      <div className="d-none">
        <PrintPDF ref={printReportRef}
          dataFisrtTable={dataSource.listExport}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "7.9 Daily Reconciliation Report"
          }}
        />
      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DailyReconcliationReport)
