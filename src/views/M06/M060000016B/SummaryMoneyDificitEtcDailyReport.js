/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M060000016B, GET_DATA_INFO_M060000016B_getPaymentmethodListAPI } from "../../../service/api/report";
import {
  getTSBList_API,
  getSubVehicleTypeList_API,
  getShiftList_API,
} from "../../../service/api/util";
import {
  _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;
const SummaryMoneyDificitEtcDailyReport = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [paymentmethodList, setsPaymentmethodList] = useState([]);
  const [subVehicleTypeList, setSubVehicleTypeList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกจากวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกจากวันที่!" }],
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
          picker: "date",
          placeholder: "เลือกถึงวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกถึงวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.endDate,
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
    {
      type: "select",
      option: {
        name: "paymentmethodId",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "ประเภทการชำระ...",
          optionValue: {
            values: ["ทั้งหมด", ...paymentmethodList],
            keyName: "paymentmethodDescriptionTh",
            keyValue: "paymentmethodId",
          },
        },
        rules: [{ required: false, message: "กรุณาเลือกประเภทการชำระ!" }],
        initialValue: initialValue.paymentmethodId ? initialValue.paymentmethodId : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "shiftId",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกผลัด!",
          },
        ],
        initialValue: initialValue.shiftId ? initialValue.shiftId : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "vehicleId",
        label: "ประเภทรถ",
        childrenProps: {
          placeholder: "เลือกประเภทรถ...",
          optionValue: {
            values: ["ทั้งหมด", ...subVehicleTypeList],
            keyName: "descriptionTh",
            keyValue: "subVehicleTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทรถ!",
          },
        ],
        // initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.vehicleId
        initialValue: initialValue.vehicleId ? initialValue.vehicleId : "ทั้งหมด",
      },
    },
  ];

  const columns = [
    {
      title: "วันที่",
      fixed: true,
      key: "date",
      dataIndex: "date",
      width: 120,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ETC System",
      align: 'center',
      children: [
        {
          title: "ปริมาณรถที่เก็บเงินได้ (คัน)",
          align: 'center',
          children: [
            {
              title: "Easy Pass",
              key: "easypassTrx",
              dataIndex: "easypassTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "M-PASS",
              key: "mpassTrx",
              dataIndex: "mpassTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "etcTotalTrx",
              dataIndex: "etcTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "จำนวนเงิน (บาท)",
          align: 'center',
          children: [
            {
              title: "Easy Pass",
              key: "easypassRevenue",
              dataIndex: "easypassRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "M-PASS",
              key: "mpassRevenue",
              dataIndex: "mpassRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "etcTotalRevenue",
              dataIndex: "etcTotalRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "จำนวนเงินที่เรียกเก็บจากธนาคาร (บาท)",
          key: "bank1Revenue",
          dataIndex: "bank1Revenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "จำนวนเงินที่เรียกเก็บจากธนาคาร เพิ่มเติม (บาท)",
          key: "bank2Revenue",
          dataIndex: "bank2Revenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "รวมยอดเงินเรียกเก็บตาม",
          key: "bankTotalRevenue",
          dataIndex: "bankTotalRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "ผลต่างระหว่าง SCW 3.4 กับ SCW 8.16",
          key: "diffPassingRevenue",
          dataIndex: "diffPassingRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "จำนวนเงินตาม Statement ธนาคาร",
          key: "bankStatementRevenue",
          dataIndex: "bankStatementRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "ผลต่าง (บาท) +/(-)",
          key: "diffBankRevenue",
          dataIndex: "diffBankRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
  ];

  useEffect(() => {
    getTsbList();
    getPaymentmethodList();
    getSubVehicleType();
    getShiftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTsbList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setTsbList(res.list);
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

  const getPaymentmethodList = async () => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000016B_getPaymentmethodListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPaymentmethodList(res.list);
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

  const getSubVehicleType = async () => {
    try {
      setLoading(true);
      const res = await getSubVehicleTypeList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setSubVehicleTypeList(res.list);
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

  const getShiftList = async () => {
    setScroll({ x: 1500 });
    try {
      setLoading(true);
      const res = await getShiftList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setShiftList(res.list);
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
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    
    const totalAll = {
      date: 'TOTAL',
      easypassTrx: res.easypassTrxTotal,
      mpassTrx: res.mpassTrxTotal,
      etcTotalTrx: res.etcTotalTrxTotal,
      easypassRevenue: res.easypassRevenueTotal,
      mpassRevenue: res.mpassRevenueTotal,
      etcTotalRevenue: res.etcTotalRevenueTotal,
      bank1Revenue: res.bank1RevenueTotal,
      bank2Revenue: res.bank2RevenueTotal,
      bankTotalRevenue: res.bankTotalRevenueTotal,
      diffPassingRevenue: res.diffPassingRevenueTotal,
      bankStatementRevenue: res.bankStatementRevenueTotal,
      diffBankRevenue: res.diffBankRevenueTotal,
    }
    return {
      ...res, list: list,
      listExport: [...res.list, totalAll]
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000016B(data, props.auth.token);
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
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    const paymentmethod = paymentmethodList.find((e) => e.paymentmethodId === DataList.paymentmethodId);
    const shift = shiftList.find((e) => e.shiftId === DataList.shiftId);
    const vehicle = subVehicleTypeList.find((e) => e.subVehicleTypeId === DataList.vehicleId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
      paymentmethodName: paymentmethod ? paymentmethod.paymentmethodDescriptionTh : "ทั้งหมด",
      shiftName: shift ? shift.abbreviation : "ทั้งหมด",
      vehicleName: vehicle ? vehicle.descriptionTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      paymentmethodId: value.paymentmethodId === "ทั้งหมด" ? null : value.paymentmethodId,
      shiftId: value.shiftId === "ทั้งหมด" ? null : value.shiftId,
      vehicleId: value.vehicleId === "ทั้งหมด" ? null : value.vehicleId,
    };
    getDataInfo(dataOutput);
  };


  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.16.2 รายงานสรุปรายได้ประจำวัน ETC"],
  });

  const headerText = [
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dateFormat)
        : "",
    },
    { name: "ด่าน", value: dataToPrint.tsbName ? dataToPrint.tsbName : "" },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.paymentmethodName ? dataToPrint.paymentmethodName : "",
    },
    {
      name: "ผลัด",
      value: dataToPrint.shiftName ? dataToPrint.shiftName : "",
    },
    {
      name: "ประเภทรถ",
      value: dataToPrint.vehicleName ? dataToPrint.vehicleName : "",
    },
  ];

  const headerExcel = [
    { name: "วันที่", key: "date", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) Easy Pass", key: "easypassTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) M-PASS", key: "mpassTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) รวม", key: "etcTotalTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนเงิน (บาท) Easy Pass", key: "easypassRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนเงิน (บาท) M-PASS", key: "mpassRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนเงิน (บาท) รวม", key: "etcTotalRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนเงินที่เรียกเก็บจากธนาคาร (บาท)", key: "bank1Revenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนเงินที่เรียกเก็บจากธนาคาร เพิ่มเติม (บาท)", key: "bank2Revenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รวมยอดเงินเรียกเก็บตาม", key: "bankTotalRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ผลต่างระหว่าง SCW 3.4 กับ SCW 8.16", key: "diffPassingRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนเงินตาม Statement ธนาคาร", key: "bankStatementRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ผลต่าง (บาท) +/(-)", key: "diffBankRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

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
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.listExport },
            fileName: "6.16.2 รายงานสรุปรายได้ประจำวัน ETC",
            header: headerExcel,
          });
        },
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
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      <Text>TOTAL</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.easypassTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={2}>
                      <Text>{_isNull(Number(dataSource.mpassTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={3}>
                      <Text>{_isNull(Number(dataSource.etcTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.easypassRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.mpassRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.etcTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                      <Text>{_isNull(Number(dataSource.bank1RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>{_isNull(Number(dataSource.bank2RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={9}>
                      <Text>{_isNull(Number(dataSource.bankTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={10}>
                      <Text>{_isNull(Number(dataSource.diffPassingRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={11}>
                      <Text>{_isNull(Number(dataSource.bankStatementRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={12}>
                      <Text>{_isNull(Number(dataSource.diffBankRevenueTotal))}</Text>
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
              TopicText: "6.16.2 รายงานสรุปรายได้ประจำวัน ETC"
            }}
          />
        </div>
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
)(SummaryMoneyDificitEtcDailyReport);
