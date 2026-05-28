/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004F, DOWNLOAD_FILE_PDF_M07000004F } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI, getMonthListAPI } from "../../../service/api/util";
// import PrintPDF from "./PrintPDF";
import './style.css';
const { Text } = Typography;

const MonthlyTollRevenueTrafficYearReport746 = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "select",
      option: {
        name: "startMonthId",
        label: "เดือนเริ่มต้น",
        childrenProps: {
          placeholder: "เลือกเดือน...",
          optionValue: {
            values: [...monthList],
            keyName: "monthNameTh",
            keyValue: "monthId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกเดือน!",
          },
        ],
        initialValue: initialValue.startMonthId ? initialValue.startMonthId : Number(moment().format('MM')),
      },
    },
    {
      type: "select",
      option: {
        name: "endMonthId",
        label: "เดือนสิ้นสุด",
        childrenProps: {
          placeholder: "เลือกเดือน...",
          optionValue: {
            values: [...monthList],
            keyName: "monthNameTh",
            keyValue: "monthId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกเดือน!",
          },
        ],
        initialValue: initialValue.endMonthId ? initialValue.endMonthId : Number(moment().format('MM')),
      },
    },
    {
      type: "select",
      option: {
        name: "yearId",
        label: "ปี",
        childrenProps: {
          placeholder: "เลือกปี...",
          optionValue: {
            values: [...yearList],
            keyName: "yearNameTh",
            keyValue: "yearId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกปี!",
          },
        ],
        initialValue: initialValue.yearId ? initialValue.yearId :
          moment().format('YYYY') > 2543 ? moment().format('YYYY') : Number(moment().format('YYYY')) + 543,
      },
    },
  ];

  const columns = [
    {
      title: "Month",
      fixed: true,
      key: "month",
      dataIndex: "month",
      width: 50,
      align: "center",
      render: (text) => (
        <div style={{ textAlign: "left" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Toll Revenue (Original & Northern Extension Tollway)",
      align: "center",
      children: [
        {
          title: "Total (Baht)",
          dataIndex: "revenueTotal",
          key: "revenueTotal",
          width: 60,
          align: "center",
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Average (Baht/Day)",
          dataIndex: "revenueAverage",
          key: "revenueAverage",
          width: 60,
          align: "center",
          render: (text) => (
            <div style={{ textAlign: "right" }}>
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "Traffic of the Original Tollway",
      align: 'center',
      children: [
        {
          title: "Northbound",
          align: 'center',
          children: [
            {
              title: "Total (Vpm.)",
              key: "trafficOriginalNorthboundTotal",
              dataIndex: "trafficOriginalNorthboundTotal",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Avg. (Vpd.)",
              key: "trafficOriginalNorthboundAvg",
              dataIndex: "trafficOriginalNorthboundAvg",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "Southbound",
          align: 'center',
          children: [
            {
              title: "Total (Vpm.)",
              key: "trafficOriginalSouthboundTotal",
              dataIndex: "trafficOriginalSouthboundTotal",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Avg. (Vpd.)",
              key: "trafficOriginalSouthboundAvg",
              dataIndex: "trafficOriginalSouthboundAvg",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
      ],
    },
    {
      title: "Traffic of the Northern Extension Tollway",
      align: 'center',
      children: [
        {
          title: "Northbound",
          align: 'center',
          children: [
            {
              title: "Total (Vpm.)",
              key: "trafficNorthernNorthboundTotal",
              dataIndex: "trafficNorthernNorthboundTotal",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Avg. (Vpd.)",
              key: "trafficNorthernNorthboundAvg",
              dataIndex: "trafficNorthernNorthboundAvg",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "Southbound",
          align: 'center',
          children: [
            {
              title: "Total (Vpm.)",
              key: "trafficNorthernSouthboundTotal",
              dataIndex: "trafficNorthernSouthboundTotal",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Avg. (Vpd.)",
              key: "trafficNorthernSouthboundAvg",
              dataIndex: "trafficNorthernSouthboundAvg",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
      ],
    },
  ];

  const getYearList = async () => {
    try {
      setLoading(true);
      const res = await getYearListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setYearList(res.list);
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

  const getMonthList = async () => {
    try {
      setLoading(true);
      const res = await getMonthListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setMonthList(res.list);
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

  // const headerText = [
  //   { name: "ปี", value: dataToPrint.DataList ? String(dataToPrint.yearId - 543) : "" },
  // ];

  useEffect(() => {
    getYearList();
    getMonthList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    const totalAll1 = {
      month: 'Total/Avg.',
      revenueTotal: res.revenueTotalSum,
      revenueAverage: res.revenueAverageSum,
      trafficOriginalNorthboundTotal: res.trafficOriginalNorthboundTotalSum,
      trafficOriginalNorthboundAvg: res.trafficOriginalNorthboundAvgSum,
      trafficOriginalSouthboundTotal: res.trafficOriginalSouthboundTotalSum,
      trafficOriginalSouthboundAvg: res.trafficOriginalSouthboundAvgSum,
      trafficNorthernNorthboundTotal: res.trafficNorthernNorthboundTotalSum,
      trafficNorthernNorthboundAvg: res.trafficNorthernNorthboundAvgSum,
      trafficNorthernSouthboundTotal: res.trafficNorthernSouthboundTotalSum,
      trafficNorthernSouthboundAvg: res.trafficNorthernSouthboundAvgSum,
    }
    const totalAll2 = {
      month: '',
      revenueTotal: '',
      revenueAverage: '',
      trafficOriginalNorthboundTotal: '',
      trafficOriginalNorthboundAvg: 'TRF(OR.)',
      trafficOriginalSouthboundTotal: res.trfOriginalAmount,
      trafficOriginalSouthboundAvg: res.trfOriginalPercent,
      trafficNorthernNorthboundTotal: '',
      trafficNorthernNorthboundAvg: 'TRF(NE.)',
      trafficNorthernSouthboundTotal: res.trfNorthernAmount,
      trafficNorthernSouthboundAvg: res.trfNorthernPercent,
    }
    const totalAll3 = {
      month: '',
      revenueTotal: '',
      revenueAverage: '',
      trafficOriginalNorthboundTotal: '',
      trafficOriginalNorthboundAvg: 'ADT',
      trafficOriginalSouthboundTotal: res.adtOriginal1,
      trafficOriginalSouthboundAvg: res.adtOriginal2,
      trafficNorthernNorthboundTotal: '',
      trafficNorthernNorthboundAvg: 'ADT',
      trafficNorthernSouthboundTotal: res.adtNorthern1,
      trafficNorthernSouthboundAvg: res.adtNorthern2,
    }
    return {
      ...res, list: list,
      listExport: [...res.list, totalAll1, totalAll2, totalAll3]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004F(data, props.auth.token);
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

  const handleDownload = async (source) => {
    try {
      await DOWNLOAD_FILE_PDF_M07000004F(source, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      yearId: value.yearId === "" ? null : value.yearId,
      startMonthId: value.startMonthId === "" ? null : value.startMonthId,
      endMonthId: value.endMonthId === "" ? null : value.endMonthId,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    // handlePrint();
    handleDownload(dataSource);
  };

  const printReportRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => printReportRef.current,
  //   documentTitle: ["7.4.6 Monthly Toll Revenue & Traffic Report Year"],
  // });

  const headerExcel = [
    { name: "Month", key: "month", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Total (Baht)", key: "revenueTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Average (Baht/Day)", key: "revenueAverage", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Original Tollway Northbound Total (Vpm.)", key: "trafficOriginalNorthboundTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Original Tollway Northbound Avg. (Vpd.)", key: "trafficOriginalNorthboundAvg", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Original Tollway Southbound Total (Vpm.)", key: "trafficOriginalSouthboundTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Original Tollway Southbound Avg. (Vpd.)", key: "trafficOriginalSouthboundAvg", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Northern Extension Tollway Northbound Total (Vpm.)", key: "trafficNorthernNorthboundTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Northern Extension Tollway Northbound Avg. (Vpd.)", key: "trafficNorthernNorthboundAvg", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Northern Extension Tollway Southbound Total (Vpm.)", key: "trafficNorthernSouthboundTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Northern Extension Tollway Southbound Avg. (Vpd.)", key: "trafficNorthernSouthboundAvg", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: () =>
          handlePrintFile(),
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
            fileName: "7.4.6 Monthly Toll Revenue & Traffic Report Year",
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
                      <Text>Total/Avg.</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.revenueTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={2}>
                      <Text>{_isNull(Number(dataSource.revenueAverageSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={3}>
                      <Text>{_isNull(Number(dataSource.trafficOriginalNorthboundTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.trafficOriginalNorthboundAvgSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.trafficOriginalSouthboundTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.trafficOriginalSouthboundAvgSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                      <Text>{_isNull(Number(dataSource.trafficNorthernNorthboundTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>{_isNull(Number(dataSource.trafficNorthernNorthboundAvgSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={9}>
                      <Text>{_isNull(Number(dataSource.trafficNorthernSouthboundTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={10}>
                      <Text>{_isNull(Number(dataSource.trafficNorthernSouthboundAvgSum))}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={4} className="text-center" index={0}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>TRF(OR.)</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.trfOriginalAmount))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.trfOriginalPercent))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>TRF(NE.)</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={9}>
                      <Text>{_isNull(Number(dataSource.trfNorthernAmount))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={10}>
                      <Text>{_isNull(Number(dataSource.trfNorthernPercent))}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={4} className="text-center" index={0}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>ADT</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.adtOriginal1))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.adtOriginal2))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>ADT</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={9}>
                      <Text>{_isNull(Number(dataSource.adtNorthern1))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={10}>
                      <Text>{_isNull(Number(dataSource.adtNorthern2))}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
        {/* <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource.listExport}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 24,
              TopicText: "7.4.6 Monthly Toll Revenue & Traffic Report Year"
            }}
          />
        </div> */}
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
)(MonthlyTollRevenueTrafficYearReport746);
