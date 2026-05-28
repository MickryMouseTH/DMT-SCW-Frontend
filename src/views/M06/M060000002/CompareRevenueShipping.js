/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table, Button, Row } from "antd";
import Skeleton from "../../../components/loading/Loading"

import summaryData from "./SummaryData";
import {
  _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import {
  GET_DATA_INFO_M060000002,
  GET_DATA_SEND_TO_FINANCE_M060000002,
  GET_DATA_SEND_TO_SUPERVISOR_M060000002,
} from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import moment from "moment";
import { header62 } from "../../../tools/excel/header";
import { footer62 } from "../../../tools/excel/footer";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const CompareRevenueShipping = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scrollX, setScrollX] = useState({});
  const [checkDriff, setCheckDriff] = useState(false);
  const [dateExport, setDate] = useState(moment("00:00:00", "HH:mm:ss"));
  const [disabled, setDisabled] = useState(true);
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const [statusAudit, setStatusAudit] = useState("");

  const fields = [
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
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
      type: "datePicker",
      option: {
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
      },
    },
    {
      type: "checkbox",
      option: {
        name: "checkbox",
        label: "เฉพาะที่มียอดแตกต่าง",
        onChange: (e) => onChange(e),
        checked: checkDriff,
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 30,
      align: "center",
      fixed: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-right">{text}</div>
            </Text>
          ),
        };
      },
    },

    {
      title: "ด่าน",
      fixed: "left",
      key: "tsbAbbreviation",
      dataIndex: "tsbAbbreviation",
      width: 30,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "bg_default",
          },
          children: <Text type="secondary">{text}</Text>,
        };
      },
    },
    {
      title: "เงินสด",
      align: "center",
      children: [
        {
          title: "MCC",
          dataIndex: "amountFromShipping",
          key: "amountFromShipping",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "SOD",
          dataIndex: "amountFromSystem",
          key: "amountFromSystem",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "ต่าง",
          dataIndex: "amountDiff",
          key: "amountDiff",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "คูปอง",
      align: "center",
      children: [
        {
          title: "MCC",
          dataIndex: "amountFromShippingCoupon",
          key: "amountFromShippingCoupon",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "SOD",
          dataIndex: "amountFromSystemCoupon",
          key: "amountFromSystemCoupon",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "ต่าง",
          dataIndex: "amountDiffCoupon",
          key: "amountDiffCoupon",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "ก่อน Vat",
          dataIndex: "amountNoVatCoupon",
          key: "amountNoVatCoupon",
          width: 80,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "QR KBANK",
      align: "center",
      children: [
        {
          title: "BANK",
          dataIndex: "amountQrKbankBank",
          key: "amountQrKbankBank",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "SOD",
          dataIndex: "amountQrKbankSod",
          key: "amountQrKbankSod",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "ต่าง",
          dataIndex: "amountQrKbankDiff",
          key: "amountQrKbankDiff",
          width: 40,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "QR KTB",
      align: "center",
      children: [
        {
          title: "BANK",
          dataIndex: "amountQrKtbBank",
          key: "amountQrKtbBank",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "SOD",
          dataIndex: "amountQrKtbSod",
          key: "amountQrKtbSod",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "ต่าง",
          dataIndex: "amountQrKtbDiff",
          key: "amountQrKtbDiff",
          width: 40,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "EMV KTB",
      align: "center",
      children: [
        {
          title: "BANK",
          dataIndex: "amountEmvKtbBank",
          key: "amountEmvKtbBank",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "SOD",
          dataIndex: "amountEmvKtbSod",
          key: "amountEmvKtbSod",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "ต่าง",
          dataIndex: "amountEmvKtbDiff",
          key: "amountEmvKtbDiff",
          width: 40,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            // style={{ textAlign: "right", cursor: "pointer" }}
            // onClick={() => handleDetail(record)}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "หมายเหตุ บ.ขนส่งเงิน",
      dataIndex: "remarkShipping",
      key: "remarkShipping",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div
          style={{ textAlign: "left" }}
        // style={{ textAlign: "left", cursor: "pointer" }}
        // onClick={() => handleDetail(record)}
        >
          {_isNull(text)}
        </div>
      ),
    },

    {
      title: "หมายเหตุจากระบบ",
      dataIndex: "remarkSystem",
      key: "remarkSystem",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div
          style={{ textAlign: "left" }}
        // style={{ textAlign: "left", cursor: "pointer" }}
        // onClick={() => handleDetail(record)}
        >
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const headerText = [
    {
      name: "กลุ่มด่าน",
      value: dataToPrint.plazaName ? dataToPrint.plazaName : "",
    },
    {
      name: "วันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.date,"DD/MM/YYYY")
        : "",
    },
  ];

  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        date: _timeZoneThai(props.location.value.date),
        tsbId:
          props.location.value.tsbId === "ทั้งหมด"
            ? null
            : props.location.value.tsbId,
      };
      setDate(props.location.value.date);
      getDataInfo(dataOutput);
    }
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleDetail = async (item) => {
  //   if (item.seckey) {
  //     try {
  //       await props.history.push({
  //         pathname: `/reports/compare-revenue-shipping-companies-with-system/tod-detail/${item.seckey}`,
  //         value: initialValue,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "No Data",
  //       text: "Don't have seckey",
  //     }).then(async (result) => {
  //       if (result.value) {
  //         setLoading(false);
  //       }
  //     });
  //   }
  // };

  const getPlazaList = async () => {
    setScrollX({ x: 1300 });
    try {
      // setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        // setLoading(false);
        setPlazaList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            // setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000002(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
        setDisabled(res.checkDisable);
        setStatusAudit(res.statusAudit);
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

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      date: _timeZoneThai(value.date),
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      staffId: value.staffId ? value.staffId : null,
      bagNo: value.bagNo ? value.bagNo : null,
      checkDiff: checkDriff,
    };
    setDate(value.date);
    getDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {
    const tsbPlaza = plazaList.find((e) => e.tsbId === DataList.tsbId);

    setDataToPrint({
      DataList,
      plazaName: tsbPlaza ? tsbPlaza.tsbNameTh : "ทั้งหมด",
    });
  };

  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.2 Compare Revenue Shipping Companies With System"],
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
            dataSource: dataSource,
            fileName: "6.2 Compare Revenue Shipping Companies With System",
            header: header62,
            footer: footer62,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];

  const onChange = (e) => {
    setCheckDriff(e.target.checked);
  };

  const SendToFinance = async () => {
    const datainfo = {
      date: _timeZoneThai(dateExport),
    };
    setLoading(true);
    try {
      const res = await GET_DATA_SEND_TO_FINANCE_M060000002(
        datainfo,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ส่งข้อมูลสำเร็จ",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
            // setDataSource({ "list": [] });
            setDisabled(true);
            setStatusAudit(res.statusAudit);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: "ส่งข้อมูลไม่สำเร็จ",
          allowOutsideClick: false,
          allowEscapeKey: false,
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

  const SendToSupervisor = async () => {
    const datainfo = {
      date: _timeZoneThai(dateExport),
    };
    setLoading(true);
    try {
      const res = await GET_DATA_SEND_TO_SUPERVISOR_M060000002(
        datainfo,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ส่งข้อมูลสำเร็จ",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
            // setDataSource({ "list": [] });
            setDisabled(true);
            setStatusAudit(res.statusAudit);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: "ส่งข้อมูลไม่สำเร็จ",
          allowOutsideClick: false,
          allowEscapeKey: false,
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

  return (
    <Skeleton loading={loading} active>
      <FormDefault
        fields={fields}
        onFinish={handleOnFinish}
        action={action}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
      />
      <div className="mt-10">
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.list}
          summary={summaryData}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.list) ? false : true,
            position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
          }}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={dataSource}
          header={header62}
          footer={footer62}
          columnPerPage={header62.length}
          propsHeader={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 12,
            TopicText:
              "6.2 เปรียบเทียบรายได้ บริษัทขนส่ง กับ ข้อมูลจจากระบบ (Audit)",
          }}
          oneColumnfooter={true}
          columnTotalChange={{
            tsbAbbreviation: "รวมทั้งหมด",
          }}
        />
      </div>
      <Row justify="end" className="pt-20">
        <Row
          xs={18}
          md={18}
          lg={18}
          style={{ marginRight: 30 }}
          className="text-right"
        >
          <h3>{`สถานะ : `}</h3>
          <div>&nbsp;&nbsp;</div>
          <h3> {`${statusAudit ? statusAudit : ""}`} </h3>
        </Row>
        <Button
          type="primary"
          hidden={user_data.staffGroupId !== 61}
          disabled={disabled}
          onClick={SendToSupervisor}
        >
          เสนออนุมัติ
        </Button>
        <Button
          type="primary"
          hidden={user_data.staffGroupId !== 60}
          disabled={disabled}
          onClick={SendToFinance}
        >
          ส่งไปบัญชี
        </Button>
      </Row>
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
)(CompareRevenueShipping);
