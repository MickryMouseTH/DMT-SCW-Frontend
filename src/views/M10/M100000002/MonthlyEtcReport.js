import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M100000002, DOWNLOAD_FILE_EXCEL_M01000002 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintReport from "../../../components/print/PrintReport";
import { header101 } from "../../../tools/excel/header";

const dateFormat = "DD/MM/YYYY";

const MonthlyEtcReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  //   const [scroll, setScroll] = useState({});
  const [typeList, setTypeList] = useState([]);
  const [tsbList, setTsbList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});
  const [res, setRes] = useState([]);

  useEffect(() => {
    // setScroll({ x: 1300 })
    setTypeList(["Easy Pass", "M-PASS"]);
    getTsbList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
      title: <b>ลำดับ</b>,
      key: "indexRow",
      dataIndex: "indexRow",
      align: 'center',
      width: 25,
      fixed: true,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ใบกำกับ</b>,
      align: 'center',
      children: [
        {
          title: <b>วันเวลาที่ตัดเงิน</b>,
          key: "csDate",
          dataIndex: "csDate",
          align: 'center',
          width: 120,
          render: (value, row) => {
            const obj = {
              children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.csDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>เลขที่</b>,
          key: "receiptNo",
          dataIndex: "receiptNo",
          align: 'center',
          width: 90,
          render: (value, row) => {
            const obj = {
              children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.receiptNo === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
      ],
    },
    {
      title: <b>ผู้ซื้อสินค้า/ผู้รับบริการ</b>,
      key: "cusName",
      dataIndex: "cusName",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>เลขที่ใบสำคัญ เล่มที่/เลขที่</b>,
      key: "numberNo",
      dataIndex: "numberNo",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>เลขประจำจำตัวผู้เสียภาษี</b>,
      key: "taxId",
      dataIndex: "taxId",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>สถานประกอบการ</b>,
      align: 'center',
      children: [
        {
          title: <b>สำนักงานใหญ่</b>,
          key: "hqId",
          dataIndex: "hqId",
          align: 'center',
          width: 60,
          render: (value, row) => {
            const obj = {
              children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.indexRow === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>สาขาที่</b>,
          key: "branchId",
          dataIndex: "branchId",
          align: 'center',
          width: 60,
          render: (value, row) => {
            const obj = {
              children: row.indexRow === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.indexRow === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
      ],
    },
    {
      title: <b>มูลค่าสินค้าหรือบริการ</b>,
      key: "baseFare",
      dataIndex: "baseFare",
      align: 'center',
      width: 60,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>จำนวนเงินภาษีมูลค่าเพิ่ม</b>,
      key: "vat",
      dataIndex: "vat",
      align: 'center',
      width: 60,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>รวม</b>,
      key: "fare",
      dataIndex: "fare",
      align: 'center',
      width: 60,
      render: (value, row) => {
        const obj = {
          children: row.indexRow === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.indexRow === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
  ];

  const fields = [
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
    {
      type: "select",
      option: {
        name: "paymentType",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "Payment Type",
          optionValue: {
            values: ["ทั้งหมด", ...typeList],
            keyValue: "paymentType",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือก Type!",
          },
        ],
        initialValue: initialValue.paymentType ? initialValue.paymentType : "ทั้งหมด",
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
  ];

  // const header102 = [
  //   { name: "ลำดับ", key: "indexRow", type: "nullColumn", align: 'center', className: 'text-center' },
  //   {
  //     name: "ใบกำกับ",
  //     key: "",
  //     align: 'center',
  //     children: [
  //       { name: "วันเวลาที่ตัดเงิน", key: "csDate", type: "nullColumn", align: 'center', className: 'text-center' },
  //       { name: "เลขที่", key: "receiptNo", type: "nullColumn", align: 'center', className: 'text-center' },
  //     ],
  //   },
  //   { name: "ผู้ซื้อสินค้า/ผู้รับบริการ", key: "cusName", type: "nullColumn", align: 'center', className: 'text-center' },
  //   { name: "เลขที่ใบสำคัญ เล่มที่/เลขที่", key: "numberNo", type: "nullColumn", align: 'center', className: 'text-center' },
  //   { name: "เลขประจำจำตัวผู้เสียภาษี", key: "taxId", type: "nullColumn", align: 'center', className: 'text-center' },
  //   {
  //     name: "สถานประกอบการ",
  //     key: "",
  //     align: 'center',
  //     children: [
  //       { name: "สำนักงานใหญ่", key: "hqId", type: "nullColumn", align: 'center', className: 'text-center' },
  //       { name: "สาขาที่", key: "branchId", type: "nullColumn", align: 'center', className: 'text-center' },
  //     ],
  //   },
  //   { name: "มูลค่าสินค้าหรือบริการ", key: "baseFare", type: "nullColumn", align: 'center', className: 'text-center' },
  //   { name: "จำนวนเงินภาษีมูลค่าเพิ่ม", key: "vat", type: "nullColumn", align: 'center', className: 'text-center' },
  //   { name: "รวม", key: "fare", type: "nullColumn", align: 'center', className: 'text-center' },
  // ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["10.2 รายงานภาษีขายประจำเดือน ETC"],
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
          handleDownload();
        },
        // onClick: () => {
        //   _exportFileExcelWithComma102({
        //     dataSource: { list: dataSource.list },
        //     fileName: "10.2 รายงานภาษีขายประจำเดือน ETC",
        //     header: header102,
        //   });
        // },
      },
    },
  ];

  
  const handleDownload = async () => {
    
    const dataOutput = {
      startDate: _timeZoneThai(initialValue.startDate),
      endDate: _timeZoneThai(initialValue.endDate),
      tsbId: initialValue.tsbId === "ทั้งหมด" ? null : initialValue.tsbId,
      paymentType: initialValue.paymentType === "ทั้งหมด" ? null : initialValue.paymentType === "Easy Pass" ? 5 : 6,
      tsbName: dataToPrint.DataList ? dataToPrint.tsbName : "",
      paymentTypeName: dataToPrint.DataList ? dataToPrint.DataList.paymentType : "",
      list: res,
      fileName:'ReportMonthlyEtc.xls'
    };
      try {
        await DOWNLOAD_FILE_EXCEL_M01000002(dataOutput, props.auth.token);
      } catch (error) {
        console.log(error);
      }
    
  };


  const getTsbList = async () => {
    // setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
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

    const totalAll = {
      indexRow: 'Total',
      csDate: res.rowCount,
      receiptNo: 'rows',
      cusName: '',
      numberNo: '',
      taxId: '',
      hqId: '',
      branchId: 'รวม',
      baseFare: res.totalBaseFare,
      vat: res.totalVat,
      fare: res.totalFare
    }


    return {
      ...res,
      list: [...res.list, totalAll]
      // listFinal: [...res.listFinal, totalAll],     
      // listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M100000002(dataOutput, props.auth.token);
      console.log("res 8.1", res);
      if (res.status.code === "S200") {
        setLoading(false);
        setRes(res.list);
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
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
    console.log("Print -> ", DataList)
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
        paymentType: value.paymentType === "ทั้งหมด" ? null : value.paymentType === "Easy Pass" ? 5 : 6,
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
    { name: "วันที่ดำเนินการ", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY") : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY") : "", },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.tsbName : "" },
    { name: "ประเภทการชำระ", value: dataToPrint.DataList ? dataToPrint.DataList.paymentType : "" },
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
            position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"]
          }}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={{
            ...dataSource,
            rows: "rows",
            count: _isNull(Number(dataSource.list.length)),
          }}
          header={header101}
          propsHeader={{
            headerText,
            TopicText: "10.2 รายงานภาษีขายประจำเดือน ETC",
          }}
          columnPerPage={header101.length}
          propsClass="print-border-footer"
          rowPerPage={24} //จำนวนเเถวในเเต่ละหน้าของข้อมูล เมื่อ ปริ้น PDF default คือ 10 หากไม่ได้ใส่
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
)(MonthlyEtcReport);