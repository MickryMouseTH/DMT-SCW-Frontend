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
import { GET_DATA_INFO_M060000016D, GET_DATA_INFO_M060000016D_getPaymentmethodListAPI } from "../../../service/api/report";
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
const SummaryTrafficExceptReport = (props) => {
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
      title: "ปริมาณรถที่เก็บเงินไม่ได้ (คัน)",
      align: 'center',
      children: [
        {
          title: "รถยกเว้น",
          align: 'center',
          children: [
            {
              title: "ป 1",
              key: "exceptClass1Trx",
              dataIndex: "exceptClass1Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "ป 2",
              key: "exceptClass2Trx",
              dataIndex: "exceptClass2Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "exceptClassTotalTrx",
              dataIndex: "exceptClassTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "รถขบวน",
          align: 'center',
          children: [
            {
              title: "ป 1",
              key: "hpmcClass1Trx",
              dataIndex: "hpmcClass1Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "ป 2",
              key: "hpmcClass2Trx",
              dataIndex: "hpmcClass2Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "hpmcClassTotalTrx",
              dataIndex: "hpmcClassTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "รถฝ่าด่าน",
          align: 'center',
          children: [
            {
              title: "ป 1",
              key: "vioClass1Trx",
              dataIndex: "vioClass1Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "ป 2",
              key: "vioClass2Trx",
              dataIndex: "vioClass2Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "vioClassTotalTrx",
              dataIndex: "vioClassTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "บัตร DMT",
          align: 'center',
          children: [
            {
              title: "ป 1",
              key: "dmtClass1Trx",
              dataIndex: "dmtClass1Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "ป 2",
              key: "dmtClass2Trx",
              dataIndex: "dmtClass2Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "dmtClassTotalTrx",
              dataIndex: "dmtClassTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "รถออกซ้าย",
          align: 'center',
          children: [
            {
              title: "ป 1",
              key: "leftClass1Trx",
              dataIndex: "leftClass1Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "ป 2",
              key: "leftClass2Trx",
              dataIndex: "leftClass2Trx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "leftClassTotalTrx",
              dataIndex: "leftClassTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
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
      const res = await GET_DATA_INFO_M060000016D_getPaymentmethodListAPI(null, props.auth.token);
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
      exceptClass1Trx: res.exceptClass1TrxTotal,
      exceptClass2Trx: res.exceptClass2TrxTotal,
      exceptClassTotalTrx: res.exceptClassTotalTrxTotal,
      hpmcClass1Trx: res.hpmcClass1TrxTotal,
      hpmcClass2Trx: res.hpmcClass2TrxTotal,
      hpmcClassTotalTrx: res.hpmcClassTotalTrxTotal,
      vioClass1Trx: res.vioClass1TrxTotal,
      vioClass2Trx: res.vioClass2TrxTotal,
      vioClassTotalTrx: res.vioClassTotalTrxTotal,
      dmtClass1Trx: res.dmtClass1TrxTotal,
      dmtClass2Trx: res.dmtClass2TrxTotal,
      dmtClassTotalTrx: res.dmtClassTotalTrxTotal,
      leftClass1Trx: res.leftClass1TrxTotal,
      leftClass2Trx: res.leftClass2TrxTotal,
      leftClassTotalTrx: res.leftClassTotalTrxTotal,
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
      const res = await GET_DATA_INFO_M060000016D(data, props.auth.token);
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
    documentTitle: ["6.16.4 รายงานปริมาณจราจรที่เก็บเงินไม่ได้"],
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
    { name: "รถยกเว้น ป 1", key: "exceptClass1Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถยกเว้น ป 2", key: "exceptClass2Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถยกเว้น MTC รวม", key: "exceptClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถขบวน ป 1", key: "hpmcClass1Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถขบวน ป 2", key: "hpmcClass2Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถขบวน รวม", key: "hpmcClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถฝ่าด่าน ป 1", key: "vioClass1Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถฝ่าด่าน ป 2", key: "vioClass2Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถฝ่าด่าน รวม", key: "vioClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "บัตร DMT ป 1", key: "dmtClass1Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "บัตร DMT ป 2", key: "dmtClass2Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "บัตร DMT รวม", key: "dmtClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถออกซ้าย ป 1", key: "leftClass1Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถออกซ้าย ป 2", key: "leftClass2Trx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "รถออกซ้าย รวม", key: "leftClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-right' },
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
            fileName: "6.16.4 รายงานปริมาณจราจรที่เก็บเงินไม่ได้",
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
                      <Text>{_isNull(Number(dataSource.exceptClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={2}>
                      <Text>{_isNull(Number(dataSource.exceptClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={3}>
                      <Text>{_isNull(Number(dataSource.exceptClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.hpmcClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.hpmcClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.hpmcClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                      <Text>{_isNull(Number(dataSource.vioClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>{_isNull(Number(dataSource.vioClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={9}>
                      <Text>{_isNull(Number(dataSource.vioClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={10}>
                      <Text>{_isNull(Number(dataSource.dmtClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={11}>
                      <Text>{_isNull(Number(dataSource.dmtClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={12}>
                      <Text>{_isNull(Number(dataSource.dmtClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={13}>
                      <Text>{_isNull(Number(dataSource.leftClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={14}>
                      <Text>{_isNull(Number(dataSource.leftClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={15}>
                      <Text>{_isNull(Number(dataSource.leftClassTotalTrxTotal))}</Text>
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
              TopicText: "6.16.4 รายงานปริมาณจราจรที่เก็บเงินไม่ได้"
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
)(SummaryTrafficExceptReport);
