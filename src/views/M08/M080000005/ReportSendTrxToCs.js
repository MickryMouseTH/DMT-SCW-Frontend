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
import { Typography,Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M080000005 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;

const ReportEtcTransactionNotIncome = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    //   scroll
    , setScroll] = useState({});
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});
  const [paymentMethodList, setPaymentMethodList] = useState([]);


  useEffect(() => {
    getPlazaList();
    setPaymentMethodList(["ทั้งหมด", "กรมทางหลวง (M-Pass)", "การทางพิเศษ (Easy-Pass)"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsMainList = [
    {
      title: <b>No.</b>,
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 50,
      render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Plaza</b>,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Lane</b>,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Trx Date</b>,
      dataIndex: "trxDate",
      key: "trxDate",
      width: 150,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: <b>PAN</b>,
      key: "pan",
      dataIndex: "pan",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
    },
    {
      title: <b>Type</b>,
      key: "type",
      dataIndex: "type",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
    },
    {
      title: <b>เวลาสร้าง XML</b>,
      dataIndex: "xmlCreateDatetime",
      key: "xmlCreateDatetime",
      width: 150,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: <b>CS Request time</b>,
      dataIndex: "csRequestDatetime",
      key: "csRequestDatetime",
      width: 150,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: <b>CS Response time</b>,
      dataIndex: "csResponseDatetime",
      key: "csResponseDatetime",
      width: 150,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: <b>CS Response MSG</b>,
      key: "csResponseMessage",
      dataIndex: "csResponseMessage",
      align: 'center',
      width: 60,
      render: (text) => <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
    },
  ]

  const fields = [
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
        initialValue: _isEmpty(initialValue) ? moment("22:00:00", "HH:mm:ss").add(-1, 'days') : initialValue.startDate
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
        initialValue: _isEmpty(initialValue) ? moment("21:59:59", "HH:mm:ss") : initialValue.endDate
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
        name: "lane",
        label: "ช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.lane,
      },
    },
    {
      type: "input",
      option: {
        name: "pan",
        label: "PAN",
        childrenProps: { placeholder: "ป้อนหมายเลข PAN..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลข PAN!" }],
        initialValue: initialValue.pan,
      },
    },
    {
      type: "select",
      option: {
        name: "paymentMethodId",
        label: "type",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...paymentMethodList],
            keyValue: "paymentMethodId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.paymentMethodId ? initialValue.paymentMethodId : "ทั้งหมด",
      },
    },
  ];

  const header85 = [
    { name: "No.", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Plaza", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Lane", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Trx Date", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "PAN", key: "pan", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Type", key: "type", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "เวลาสร้าง XML", key: "xmlCreateDatetime", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "CS Request time", key: "csRequestDatetime", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "CS Response time", key: "csResponseDatetime", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "CS Response MSG", key: "csResponseMessage", type: "nullColumn", align: 'center', className: 'text-center' },
  ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.5 รายงานการส่งตัดเงิน CS"],
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
            fileName: "8.5 รายงานการส่งตัดเงิน CS",
            header: header85,
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
      laneAbbreviation: res.list.length,
    }


    return {
      ...res,
      listExport: [...res.list, totalAll]
    }
  }

  const getData = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000005(dataOutput, props.auth.token);
      console.log("res 8.5", res);
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
      plazaAbbreviation: plaza ? plaza.plazaNameTh : "ทั้งหมด"
    });
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
        plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
        laneId: _isEmpty(value.lane) ? null : value.lane,
        paymentMethodId: value.paymentMethodId === "ทั้งหมด" ? 0 : value.paymentMethodId === "กรมทางหลวง (M-Pass)" ? 6 : 5,
        pan: _isEmpty(value.pan) ? null : value.pan,
      };
      getData(dataOutput);
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
    { name: "ด่าน", value: dataToPrint.plazaAbbreviation ? dataToPrint.plazaAbbreviation : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
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
    { name: "PAN", value: dataToPrint.DataList ? dataToPrint.DataList.pan : "" },
    { name: "TYPE", value: dataToPrint.DataList ? dataToPrint.DataList.paymentMethodId : "" }
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
          columns={columnsMainList}
          bordered
          dataSource={dataSource.list}
          pagination={true}
          summary={() => {
            return (
              <>
                <Table.Summary.Row >
                  <Table.Summary.Cell colSpan={3}>
                    <div style={{ textAlign: "right" }}><b>TOTAL</b></div>
                  </Table.Summary.Cell>                  
                  <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{!_isEmpty(dataSource.pageResponse) ? _isNull(Number(dataSource.pageResponse.totalSize)) : dataSource.list.length}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={6} className="text-left" index={2}>
                    </Table.Summary.Cell>
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
            colSpan: 5,
            TopicText: "8.5 รายงานการส่งตัดเงิน CS"
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
)(ReportEtcTransactionNotIncome);