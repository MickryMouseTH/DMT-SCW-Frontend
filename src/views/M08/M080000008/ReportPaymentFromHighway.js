import React, { useState, useRef, useEffect } from "react";
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

import { GET_DATA_INFO_M080000008 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportPaymentFromHighway = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});
  const [selectTypeList, setSelectTypeList] = useState([]);
  const [whereTypeList, setWhereTypeList] = useState([]);


  useEffect(() => {
    getPlazaList();
    setTypeList(["Easy Pass", "M-PASS"]);
    setSelectTypeList(["ชนรายการไม่ได้", "DMT ชนรายการกับ CS", "CS ชนรายการกับ DMT", "ค้นหาตามวันที่เรียกเก็บ"]);
    setWhereTypeList(["Match รายการไม่ได้", "Match รายการได้"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
      title: <b>ด่าน</b>,
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
        if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ช่องทาง</b>,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.laneAbbreviation === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ประเภทการชำระ</b>,
      key: "paymentNameTH",
      dataIndex: "paymentNameTH",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.paymentNameTH === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>หมายเลข OBU</b>,
      key: "panString",
      dataIndex: "panString",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
        const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.panString === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>DMT</b>,
      align: 'center',
      children: [
        {
          title: <b>ราคาค่าผ่านทาง</b>,
          key: "dmtFare",
          dataIndex: "dmtFare",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.dmtFare === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>วันที่เรียกเก็บเงิน</b>,
          key: "dmtDailyToll",
          dataIndex: "dmtDailyToll",
          align: 'center',
          width: 100,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY")}</div>,
              props: {}
            };
            if (row.dmtDailyToll === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>วันเวลาผ่านทาง</b>,
          key: "dmtTrxDate",
          dataIndex: "dmtTrxDate",
          align: 'center',
          width: 100,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY HH:mm:ss")}</div>,
              props: {}
            };
            if (row.dmtTrxDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
      ],
    },
    {
      title: <b>CS</b>,
      align: 'center',
      children: [
        // {
        //   title: <b>วันเวลาผ่านทาง</b>,
        //   key: "csTrxDate",
        //   dataIndex: "csTrxDate",
        //   align: 'center',
        //   width: 100,
        //   render: (value, row, index) => {
        //     const obj = {
        //       children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
        //         : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value),"DD/MM/YYYY HH:mm:ss")}</div>,
        //       props: {}
        //     };
        //     if (row.csTrxDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        //     else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        //     return obj;
        //   }
        // },
        {
          title: <b>วันเวลาตัดเงิน</b>,
          key: "csDateTime",
          dataIndex: "csDateTime",
          align: 'center',
          width: 100,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{value==null?'':_setYearThai(_isNull(value), "DD/MM/YYYY HH:mm:ss")}</div>,
              props: {}
            };
            if (row.csDateTime === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>วันที่ Payment</b>,
          key: "csPayDate",
          dataIndex: "csPayDate",
          align: 'center',
          width: 100,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{value==null?'':_setYearThai(_isNull(value), "DD/MM/YYYY")}</div>,
              props: {}
            };
            if (row.csPayDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>ราคาค่าผ่านทาง</b>,
          key: "csFare",
          dataIndex: "csFare",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.csFare === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
      ],
    },
  ];

  const columnsDMTTotal = [
    'dmtFareTotal',
  ]

  const columnsCSTotal = [
    'csFareTotal',
  ]

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operationDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.operationDate,
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
        name: "laneId",
        label: "ช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [
          {
            required: false,
            message: "กรุณาป้อนหมายเลขช่องทาง!"
          }
        ],
        initialValue: initialValue.laneId,
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
      type: "select",
      option: {
        name: "selectType",
        label: "รายการค้นหา",
        childrenProps: {
          placeholder: "Payment Status",
          optionValue: {
            values: [...selectTypeList],
            keyValue: "selectType",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือก รายการค้นหา !",
          },
        ],
        initialValue: initialValue.selectType ? initialValue.selectType : "ชนรายการไม่ได้",
      },
    },
    {
      type: "select",
      option: {
        name: "whereType",
        label: "ข้อมูลการค้นหา",
        childrenProps: {
          placeholder: "Payment Type",
          optionValue: {
            values: ["ทั้งหมด", ...whereTypeList],
            keyValue: "whereType",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือก ข้อมูลการค้นหา !",
          },
        ],
        initialValue: initialValue.whereType ? initialValue.whereType : "ทั้งหมด",
      },
    },
  ];

  const header88 = [
    { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ประเภทการชำระ", key: "paymentNameTH", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "หมายเลข OBU", key: "panString", type: "nullColumn", align: 'center', className: 'text-center' },
    {
      name: "DMT",
      align: 'center',
      children: [
        { name: "ราคาค่าผ่านทาง", key: "dmtFare", type: "nullColumn", align: 'right', className: 'text-center' },
        { name: "วันที่เรียกเก็บเงิน", key: "dmtDailyToll", type: "nullColumn", align: 'center', className: 'text-center' },
        { name: "วันเวลาผ่านทาง", key: "dmtTrxDate", type: "nullColumn", align: 'center', className: 'text-center' },
      ],
    },
    {
      name: "CS",
      align: 'center',
      children: [
        // { name: "วันเวลาผ่านทาง", key: "csTrxDate", type: "nullColumn", align: 'center', className: 'text-center' },
        { name: "วันเวลาตัดเงิน", key: "csDateTime", type: "nullColumn", align: 'center', className: 'text-center' },
        { name: "วันที่ Payment", key: "csPayDate", type: "nullColumn", align: 'center', className: 'text-center' },
        { name: "ราคาค่าผ่านทาง", key: "csFare", type: "nullColumn", align: 'right', className: 'text-center' },
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
    documentTitle: ["8.8 รายการที่รับชำระค่าผ่านทางจากกรมทางหลวง"],
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
            dataSource: { list: dataSource.listExport },
            fileName: "8.8 รายการที่รับชำระค่าผ่านทางจากกรมทางหลวง",
            header: header88,
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
      laneAbbreviation: '',
      paymentNameTH: '',
      panString: '',
      dmtFare: res.dmtFareTotal,
      dmtDailyToll: '',
      dmtTrxDate: '',
      csTrxDate: '',
      csDateTime: '',
      csPayDate: '',
      csFare: res.csFareTotal,
    }


    return {
      ...res,
      list: [...res.list],
      listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000008(dataOutput, props.auth.token);
      console.log("res 8.8", res);
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
      operationDate: _timeZoneThai(value.operationDate),
      plazaId: value.plazaId === "ทั้งหมด" ? 0 : value.plazaId,
      laneId: _isEmpty(value.laneId) ? null : value.laneId,
      paymentType: value.paymentType === "ทั้งหมด" ? 0 : value.paymentType === "Easy Pass" ? 5 : 6,
      selectType: value.selectType === "ชนรายการไม่ได้" ? 1 :
        value.selectType === "DMT ชนรายการกับ CS" ? 2 :
          value.selectType === "CS ชนรายการกับ DMT" ? 3 : 4,
      whereType: value.whereType === "ทั้งหมด" ? 0 : value.whereType === "Match รายการไม่ได้" ? 1 : 2,
    };
    getDataDailyTollCollction(dataOutput);
  };

  const headerText = [
    {
      name: "วันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.operationDate, "DD/MM/YYYY")
        : "",
    },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.DataList ? dataToPrint.DataList.paymentType : "",
    },
    {
      name: "รายการค้นหา",
      value: dataToPrint.DataList ? dataToPrint.DataList.selectType : "",
    },
    {
      name: "ข้อมูลการค้นหา",
      value: dataToPrint.DataList ? dataToPrint.DataList.whereType : "",
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
                  <Table.Summary.Cell colSpan={4}>
                    <div style={{ textAlign: "center" }}><b>Total</b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsDMTTotal)}
                  <Table.Summary.Cell colSpan={4}>
                    <div style={{ textAlign: "right" }}><b></b></div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsCSTotal)}
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
            colSpan: 11,
            TopicText: "8.8 รายการที่รับชำระค่าผ่านทางจากกรมทางหลวง"
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
)(ReportPaymentFromHighway);
