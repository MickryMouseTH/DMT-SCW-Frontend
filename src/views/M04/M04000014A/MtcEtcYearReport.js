/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table} from "antd";
import Skeleton from "../../../components/loading/Loading"

import {
  _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M04000014A } from "../../../service/api/report";
import moment from "moment";
import PrintPDF from "./PrintPDF"
const dateFormat = "DD/MM/YYYY";

const MtcEtcYearReport = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        // initialValue: initialValue.startDate,
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
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
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        // initialValue: initialValue.endDate,
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : // ? moment('00:00:00','HH:mm:ss')
          initialValue.endDate,
      },
    },
  ];

  const columns = [
    {
      title: "เดือน",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 70,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "center", fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "จำนวนรายการ (เที่ยว)",
      align: 'center',
      children: [
        {
          title: "MTC",
          key: "trxMtc",
          dataIndex: "trxMtc",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "ETC",
          key: "trxEtc",
          dataIndex: "trxEtc",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "รวม",
          key: "trxTotal",
          dataIndex: "trxTotal",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "% การใช้",
      align: 'center',
      children: [
        {
          title: "MTC",
          key: "percentMtc",
          dataIndex: "percentMtc",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "ETC",
          key: "percentEtc",
          dataIndex: "percentEtc",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "ETC ผ่านได้",
      align: 'center',
      children: [
        {
          title: "M-Pass",
          key: "trxOkMpass",
          dataIndex: "trxOkMpass",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "EasyPass",
          key: "trxOkEasypass",
          dataIndex: "trxOkEasypass",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "รวม",
          key: "trxOkTotal",
          dataIndex: "trxOkTotal",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "ETC ผ่านไม่ได้",
      align: 'center',
      children: [
        {
          title: "ไม่พบบัตร",
          key: "trxNotFound",
          dataIndex: "trxNotFound",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "เงินไม่พอ",
          key: "trxNotMoney",
          dataIndex: "trxNotMoney",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "รวม",
          key: "trxNotTotal",
          dataIndex: "trxNotTotal",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "% ช่องทาง ETC",
      align: 'center',
      children: [
        {
          title: "ETC ผ่านได้",
          key: "percentOk",
          dataIndex: "percentOk",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "ETC ผ่านไม่ได้",
          key: "percentNot",
          dataIndex: "percentNot",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "ฝ่าด่าน",
      key: "violation",
      dataIndex: "violation",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
  ];

  const headerText = [
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
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerExcel = [
    { name: "เดือน", key: "detail", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนรายการ (เที่ยว) MTC", key: "trxMtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) ETC", key: "trxEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) รวม", key: "trxTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% การใช้ MTC", key: "percentMtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% การใช้ ETC", key: "percentEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านได้ M-Pass", key: "trxOkMpass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านได้ EasyPass", key: "trxOkEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านได้ รวม", key: "trxOkTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ ไม่พบบัตร", key: "trxNotFound", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ เงินไม่พอ", key: "trxNotMoney", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ รวม", key: "trxNotTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% ช่องทาง ETC ผ่านได้", key: "percentOk", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% ช่องทาง ETC ผ่านไม่ได้", key: "percentNot", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ฝ่าด่าน", key: "violation", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M04000014A(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
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
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.14 ข้อมูลปริมาณการผ่านทาง MTC เทียบกับ ETC รายวัน เฉพาะ 4 ล้อ"],
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
            dataSource: { list: dataSource.list },
            fileName: "4.14 ข้อมูลปริมาณการผ่านทาง MTC เทียบกับ ETC รายวัน เฉพาะ 4 ล้อ",
            header: headerExcel,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={false}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={false}
          />
        </div>
      </div>
      
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 12,
            TopicText: "4.14 ข้อมูลปริมาณการผ่านทาง MTC เทียบกับ ETC รายวัน เฉพาะ 4 ล้อ"
          }} />
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MtcEtcYearReport);
