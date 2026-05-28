import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import PrintReport from "./PrintReport";
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

import { GET_DATA_INFO_M030000009 } from "../../../service/api/report";
import { getPlazaListAPI, getSubVehicleTypeList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
// import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const PassingTransactionEmvQr = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [subVehicleTypeList, setSubVehicleTypeList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});


  useEffect(() => {
    getPlazaList();
    getSubVehicleType();
    setTypeList(["EMV", "QR"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
        title: <b>ลำดับที่</b>,
        key: "no",
        dataIndex: "no",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
            children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
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
      title: <b>Job No.</b>,
      key: "jobNo",
      dataIndex: "jobNo",
      align: 'center',
      width: 60,
      render: (value, row, index) => {
          const obj = {
          children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
          };
          if (row.jobNo === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
        title: <b>Ntrx</b>,
        key: "ntrxNo",
        dataIndex: "ntrxNo",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.ntrxNo === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>วันที่เวลาสั่ง EDC</b>,
        key: "sendDate",
        dataIndex: "sendDate",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
            const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.sendDate === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>วันที่เวลา อนุมัติ</b>,
        key: "resDate",
        dataIndex: "resDate",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
            const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.resDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>วันที่ผ่านทาง</b>,
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
            if (row.trxDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>TC</b>,
        key: "tc",
        dataIndex: "tc",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.tc === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>AVC</b>,
        key: "avc",
        dataIndex: "avc",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.avc === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>ค่าผ่านทาง</b>,
        key: "amount",
        dataIndex: "amount",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.amount === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
  ];

  const columnsRows = [
    'totalRows',
  ]

  const columnsTotalAmount = [
    'totalAmount',
  ]

  const fields = [
    {
        type: "select",
        option: {
          name: "paymentType",
          label: "ประเภทการชำระ",
          childrenProps: {
            placeholder: "ประเภทการชำระ",
            optionValue: {
              values: ["ทั้งหมด", ...typeList],
              keyValue: "paymentType",
            },
          },
          rules: [
            {
              required: false,
              message: "กรุณาเลือกประเภทการชำระ!",
            },
          ],
          initialValue: initialValue.paymentType ? initialValue.paymentType : "ทั้งหมด",
        },
    },
    {
        type: "input",
        option: {
          name: "cusName",
          label: "หมายเลขบัตร / ชื่อผู้ผ่านทาง",
          childrenProps: { placeholder: "ป้อนหมายเลข หมายเลขบัตร / ชื่อผู้ผ่านทาง...", maxLength: "" },
          rules: [
            { 
              required: false, 
              message: "กรุณาป้อนหมายเลข หมายเลขบัตร / ชื่อผู้ผ่านทาง!" 
            }
          ],
          initialValue: initialValue.cusName,
        },
    },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันเวลาผ่านทาง : ",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: true
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เปิดดำเนินการ!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันเวลาผ่านทาง :",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: true
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เปิดดำเนินการ!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate,
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
        name: "subVehicleType",
        label: "ประเภทรถ",
        childrenProps: {
          placeholder: "เลือกประเภทรถ...",
          optionValue: {
            values: ["ทั้งหมด", ...subVehicleTypeList],
            keyName: "descriptionTh",
            keyValue: "subVehicleType",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทรถ!",
          },
        ],
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.subVehicleType
      },
    },
  ];

  const header39 = [
    { name: "ลำดับที่", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ช่องทาง", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ด่าน", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Ntrx", key: "ntrxNo", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันที่เวลาสั่ง EDC", key: "sendDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันที่เวลา อนุมัติ", key: "resDate", type: "nullColumn", align: 'right', className: 'text-center' },
    { name: "วันเวลาผ่านทาง", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "TC", key: "tc", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "AVC", key: "avc", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ค่าผ่านทาง", key: "amount", type: "nullColumn", align: 'center', className: 'text-center' },
  ]

  const tableSummaryRowRender = (listRender = [], cellIndex = 1) => {
    return listRender.map((title, index) =>
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "center", fontWeight: "bold" }}>{_isNull(dataSource[title])}</div>
      </Table.Summary.Cell>
    )
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.9 รายการผ่านทาง EMV/QR"],
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
                fileName: "3.9 รายการผ่านทาง EMV/QR",
                header: header39,
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

  const getSubVehicleType = async () => {
    try {
      setLoading(true);
      const res = await getSubVehicleTypeList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setSubVehicleTypeList(res.list);
        console.log("vehicle type", res.list);
        setLoading(false);
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
        no: 'Total',
        plazaAbbreviation: res.totalRows,
        laneAbbreviation: 'rows',
        jobNo: '',
        ntrxNo: '',
        sendDate: '',
        resDate: '',
        trxDate: '',
        tc: '',
        avc: 'ยอดรวม',
        amount: res.totalAmount,
    }
    

    return { ...res,
        list: [...res.list],     
        listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000009(dataOutput, props.auth.token);
      console.log("res 3.9", res);
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
    const vehicle = subVehicleTypeList.find((e) => e.subVehicleTypeId === parseInt(DataList.subVehicleType , 10 ));
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      subVehicleDes: vehicle ? vehicle.descriptionTh : "ทั้งหมด",
    });
    console.log(dataSource)
  };

    // const handleOnFinish = (value) => {
    //     handleChangeIdToName(value);
    //     setInitialValue(value);

    //     const dataOutput = {
    //         paymentType: value.paymentType === "ทั้งหมด" ? null : value.paymentType === "EMV" ? 3 : 4,
    //         cusName: value.cusName,
    //         startDate: _timeZoneThai(value.startDate),
    //         endDate: _timeZoneThai(value.endDate),
    //         plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
    //         laneId: _isEmpty(value.laneId) ? null : value.laneId,
    //         subVehicleType: value.subVehicleType === "ทั้งหมด" ? null : value.subVehicleType,
    //     };
    //     getDataDailyTollCollction(dataOutput);
    // };

    const handleOnFinish = (value) => {
        handleChangeIdToName(value);
        setInitialValue(value);

        const start = moment(value.startDate)
        const end = moment(value.endDate)
        const duration = moment.duration(end.diff(start));
        const days = duration.asDays();
        if (days <= 31) {
            const dataOutput = {
                paymentType: value.paymentType === "ทั้งหมด" ? null : value.paymentType === "EMV" ? 3 : 4,
                cusName: value.cusName,
                startDate: _timeZoneThai(value.startDate),
                endDate: _timeZoneThai(value.endDate),
                plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
                laneId: _isEmpty(value.laneId) ? null : value.laneId,
                subVehicleType: value.subVehicleType === "ทั้งหมด" ? null : value.subVehicleType,
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
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
        name: "จากวันที่",
        value: dataToPrint.DataList
          ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY HH:mm:ss")
          : "",
    },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.DataList ? dataToPrint.DataList.paymentType : "",
    },
    {
      name: "ประเภทรภ",
      value: dataToPrint.DataList ? dataToPrint.subVehicleDes : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY HH:mm:ss")
        : "",
    },
    {
      name: "หมายเลขบัตร/ชื่อผู้ใข้",
      value: dataToPrint.DataList ? dataToPrint.DataList.cusName : "",
    },
  ];

  const footer39 = [
    { key: "Total" },
    { key: "totalRows" },
    { key: "rows" },
    { key: "" },
    { key: "" },
    { key: "" },
    { key: "" },
    { key: "" },
    { key: "" },
    { key: "ยอดรวม" },
    { key: "totalAmount" },
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
                      <Table.Summary.Cell colSpan={1}>
                        <div style={{ textAlign: "center" }}><b>Total</b></div>
                      </Table.Summary.Cell>
                      {tableSummaryRowRender(columnsRows)}
                      <Table.Summary.Cell colSpan={1}>
                        <div style={{ textAlign: "center" }}><b>rows</b></div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell colSpan={6}>
                        <div style={{ textAlign: "center" }}><b></b></div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell colSpan={1}>
                        <div style={{ textAlign: "center" }}><b>ยอดรวม</b></div>
                      </Table.Summary.Cell>
                      {tableSummaryRowRender(columnsTotalAmount)}
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
        <PrintReport
          ref={printReportRef}
          dataSource={ dataSource}
          header={header39}
          columnPerPage={header39.length}
          rowPerPage={23}
          footer={footer39}
          propsHeader={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 8,
            TopicText: "3.9 รายการผ่านทาง EMV/QR"
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
)(PassingTransactionEmvQr);

