/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004G, DOWNLOAD_FILE_PDF_M07000004G } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI, getMonthListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";
const { Text } = Typography;

const MonthlyTollRevenueTrafficYearReport747 = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
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
      width: 100,
      align: "center",
      render: (text) => (
        <div style={{ textAlign: "left" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Toll Revenue",
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
          title: "Total (Vpm.)",
          key: "trafficOriginalTotal",
          dataIndex: "trafficOriginalTotal",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "Avg. (Vpd.)",
          key: "trafficOriginalAvg",
          dataIndex: "trafficOriginalAvg",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "Traffic of the Northern Extension Tollway",
      align: 'center',
      children: [
        {
          title: "Total (Vpm.)",
          key: "trafficNorthernTotal",
          dataIndex: "trafficNorthernTotal",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "Avg. (Vpd.)",
          key: "trafficNorthernAvg",
          dataIndex: "trafficNorthernAvg",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "Traffic of the Laksi (North), LKN",
      align: 'center',
      children: [
        {
          title: "Total (Vpm.)",
          key: "trafficLaksiTotal",
          dataIndex: "trafficLaksiTotal",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "Avg. (Vpd.)",
          key: "trafficLaksiAvg",
          dataIndex: "trafficLaksiAvg",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
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


  const headerText = [
    { name: "ปี", value: dataToPrint.DataList ? String(dataToPrint.yearId - 543) : "" },
  ];

  useEffect(() => {
    getYearList();
    getMonthList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    const total = {
      month: 'Total/Avg.',
      revenueTotal: res.revenueTotalSum,
      revenueAverage: res.revenueAverageSum,
      trafficOriginalTotal: res.trafficOriginalTotalSum,
      trafficOriginalAvg: res.trafficOriginalAvgSum,
      trafficNorthernTotal: res.trafficNorthernTotalSum,
      trafficNorthernAvg: res.trafficNorthernAvgSum,
      trafficLaksiTotal: res.trafficLaksiTotalSum,
      trafficLaksiAvg: res.trafficLaksiAvgSum,
    }
    return {
      ...res, list: list,
      listExport: [...res.list, total]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004G(data, props.auth.token);
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
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    setDataToPrint(
      {
        DataList,
        yearId: year ? year.yearId : "",
      })
  };

  const handleDownload = async (source) => {
    try {
      await DOWNLOAD_FILE_PDF_M07000004G(source, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
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
  //   documentTitle: ["7.4.7 Monthly Toll Revenue & Traffic Report Year"],
  // });

  const headerExcel = [
    { name: "Month", key: "month", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Total (Baht)", key: "revenueTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Average (Baht/Day)", key: "revenueAverage", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Original Tollway Total (Vpm.)", key: "trafficOriginalTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Original Tollway Avg. (Vpd.)", key: "trafficOriginalAvg", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Northern Extension Tollway Total (Vpm.)", key: "trafficNorthernTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Northern Extension Tollway Avg. (Vpd.)", key: "trafficNorthernAvg", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Laksi (North),LKN Total (Vpm.)", key: "trafficLaksiTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Traffic of the Laksi (North),LKN Avg. (Vpd.)", key: "trafficLaksiAvg", type: "nullColumn", align: 'center', className: 'text-right' },
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
            fileName: "7.4.7 Monthly Toll Revenue & Traffic Report Year",
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
                      <Text>{_isNull(Number(dataSource.trafficOriginalTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.trafficOriginalAvgSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.trafficNorthernTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.trafficNorthernAvgSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                      <Text>{_isNull(Number(dataSource.trafficLaksiTotalSum))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>{_isNull(Number(dataSource.trafficLaksiAvgSum))}</Text>
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
              colSpan: 24,
              TopicText: "7.4.7 Monthly Toll Revenue & Traffic Report Year"
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
)(MonthlyTollRevenueTrafficYearReport747);
