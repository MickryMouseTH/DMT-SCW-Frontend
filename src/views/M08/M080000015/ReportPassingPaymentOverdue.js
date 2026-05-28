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

import { GET_DATA_INFO_M080000015 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ReportPassingPaymentOverdue = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    // scroll
    ,setScroll] = useState({});
  // const [typeList, setTypeList] = useState([]);
  const [plazaList, setPlazaList] = useState([]);
  const [plazaDirection, setPlazaDirection] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});
  
  useEffect(() => {
    // setScroll({ x: 1300 })
    setPlazaDirection(["ขาเข้าเมือง(ใต้)", "ขาออกเมือง(เหนือ)"]);
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
        title: <b>ลำดับ</b>,
        key: "no",
        dataIndex: "no",
        align: 'center',
        width: 60,
        render: (value, row) => {
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
        width: 140,
        render: (value, row) => {
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
      title: <b>ช่องทาง</b>,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      align: 'center',
      width: 60,
      render: (value, row) => {
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
      title: <b>nTrx</b>,
      key: "ntrx",
      dataIndex: "ntrx",
      align: 'center',
      width: 80,
      render: (value, row) => {
          const obj = {
            children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.no === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>วันเวลาผ่านทาง</b>,
      key: "date",
      dataIndex: "date",
      align: 'center',
      width: 140,
      render: (value, row) => {
          const obj = {
            children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>ค่าผ่านทาง</b>,
      key: "amount",
      dataIndex: "amount",
      align: 'center',
      width: 80,
      render: (value, row) => {
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
      title: <b>ประเภทการชำระ</b>,
      key: "paymentType",
      dataIndex: "paymentType",
      align: 'center',
      width: 100,
      render: (value, row) => {
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
      title: <b>PAN</b>,
      key: "pan",
      dataIndex: "pan",
      align: 'center',
      width: 180,
      render: (value, row) => {
          const obj = {
            children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.no === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
    {
      title: <b>สัญญาณการผ่านทาง</b>,
      key: "signalText",
      dataIndex: "signalText",
      align: 'center',
      width: 360,
      render: (value, row) => {
          const obj = {
          children: row.no === "Total" ? <div style={{ textAlign: "left", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "left" }}>{_isNull(value)}</div>,
          props: {}
          };
          if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
      }
    },
  ];

  const fields = [
    {
        type: "datePicker",
        option: {
          name: "startDate",
          label: "จากวันที่",
          childrenProps: {
            format: dateFormat,
            placeholder: "เลือกวันที่...",
            showTime: { defaultValue: moment('22:00:00', 'HH:mm:ss').add(-1, 'days')}
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
          initialValue: _isEmpty(initialValue)
            ? moment("22:00:00", "HH:mm:ss").add(-1, 'days')
            : initialValue.startDate,
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
            showTime: { defaultValue: moment('21:59:59', 'HH:mm:ss') }
          },
          rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
          initialValue: _isEmpty(initialValue)
            ? moment("21:59:59", "HH:mm:ss")
            : initialValue.endDate,
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
      type: "select",
      option: {
          name: "directionId",
          label: "ทิศทาง",
          childrenProps: {
                  placeholder: "Direction",
                  optionValue: {
                  values: ["ทั้งหมด", ...plazaDirection],
                  keyValue: "directionId",
              },
          },
          rules: [
              {
                  required: false,
                  message: "กรุณาเลือกทิศทาง!",
              },
          ],
          initialValue: initialValue.directionId ? initialValue.directionId : "ทั้งหมด",
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
  ];

  const header813 = [
    { name: "ลำดับ", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "nTrx", key: "ntrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันเวลาผ่านทาง", key: "date", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ค่าผ่านทาง", key: "amount", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ประเภทการชำระ", key: "paymentType", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "PAN", key: "pan", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "สัญญาณการผ่านทาง", key: "signalText", type: "nullColumn", align: 'center', className: 'text-center' },
  ]

  const addIndex = (res) => {

    const totalAll = {
        no: 'Total',
        plazaAbbreviation: res.rowCount,
        laneAbbreviation: 'Row',
        ntrx: '',
        date: '',
        amount: res.sumAmount,
        paymentType: 'บาท',
        pan: '',
        signalText: ''
    }
    

    return { ...res,
        list: [...res.list, totalAll]
    }
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.15 รายการผ่านทางค้างส่งตัดเงิน"],
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
                dataSource: { list: dataSource.list},
                fileName: "8.15 รายการผ่านทางค้างส่งตัดเงิน",
                header: header813,
            });
        },
      },
    },
  ];

  const getPlazaList = async () => {
    setScroll({ x: 2000, y: 600 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
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

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000015(dataOutput, props.auth.token);
      console.log("res 8.15", res);
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
        directionId: value.directionId === "ทั้งหมด" ? 0 : value.directionId === "ขาเข้าเมือง(ใต้)" ? 2 : 1,
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
    { name: "วันที่ดำเนินการ", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "ทิศทาง", value: dataToPrint.DataList ? dataToPrint.DataList.directionId : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
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
              position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
              pageSize: 16
            }}
        />
      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource.list}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 8,
            TopicText: "8.15 รายการผ่านทางค้างส่งตัดเงิน"
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
)(ReportPassingPaymentOverdue);