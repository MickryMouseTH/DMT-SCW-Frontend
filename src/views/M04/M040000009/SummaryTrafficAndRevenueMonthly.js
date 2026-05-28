/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _exportFileExcel, _isNull, _isEmpty } from "../../../tools/util";
import { getYearListAPI,  getPlazaListAPI,  getMonthListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M04000009 } from "../../../service/api/report";
import moment from "moment";
import { header49,header49Excel } from "../../../tools/excel/header";
import { footer49 } from "../../../tools/excel/footer";

const { Text } = Typography;

const SummaryTrafficAndRevenueDaily = (props) => {
  const [plazaList, setsPlazaList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scrollX, setScrollX] = useState({});
  const [plazaName, setPlazaName] = useState('');
  const [userData, setUserData] = useState({})

  const fields = [
    {
      type: "select",
      option: {
        name: "monthId",
        label: "เดือน",
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
        initialValue: initialValue.monthId ? initialValue.monthId : Number(moment().format('MM')),
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
    {
      type: "select",
      option: {
        name: "plaza",
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
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.plaza
      },
    }
  ];

  const columns = [
    {
      title: "วันที่",
      dataIndex: "day",
      key: "day",
      width: 50,
      align: "center",
      fixed: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" >
              <div className="text-center">{(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "MTC",
      align: "center",
      children: [
        {
          title: "เงินสด",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "mtcTrafficCash",
              key: "mtcTrafficCash",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "mtcRevenueCash",
              key: "mtcRevenueCash",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        },
        {
          title: "คูปอง",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "mtcTrafficCoupon",
              key: "mtcTrafficCoupon",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "mtcRevenueCoupon",
              key: "mtcRevenueCoupon",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        },
        {
          title: "EMV",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "mtcTrafficEmv",
              key: "mtcTrafficEmv",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "mtcRevenueEmv",
              key: "mtcRevenueEmv",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        },
        {
          title: "QRCode",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "mtcTrafficQr",
              key: "mtcTrafficQr",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "mtcRevenueQr",
              key: "mtcRevenueQr",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        }
      ],
    },
    {
      title: "ETC",
      align: "center",
      children: [
        {
          title: "Easy Pass",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "easypassTraffic",
              key: "easypassTraffic",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "easypassRevenue",
              key: "easypassRevenue",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        },
        {
          title: "M-PASS",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "mpassTraffic",
              key: "mpassTraffic",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "mpassRevenue",
              key: "mpassRevenue",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        }
      ],
    },
    {
      title: "รวม",
      align: "center",
      children: [
        {
          title: "MTC",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "mtcTrafficTotal",
              key: "mtcTrafficTotal",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "mtcRevenueTotal",
              key: "mtcRevenueTotal",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        },
        {
          title: "ETC",
          align: "center",
          children: [
            {
              title: "ปริมาณ",
              dataIndex: "etcTrafficTotal",
              key: "etcTrafficTotal",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            },
            {
              title: "รายได้",
              dataIndex: "etcRevenueTotal",
              key: "etcRevenueTotal",
              width: 60,
              align: "center",
              render: (text, record) => (
                <div
                  style={{ textAlign: "right", cursor: "pointer" }}
                >
                  {_isNull(text)}
                </div>
              ),
            }
          ],
        }
      ],
    },
    {
      title: "รวมทั้งหมด",
      align: "center",
      children: [
        {
          title: "ปริมาณ",
          dataIndex: "trafficTotal",
          key: "trafficTotal",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right", cursor: "pointer" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "รายได้",
          dataIndex: "revenueTotal",
          key: "revenueTotal",
          width: 60,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right", cursor: "pointer" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    }
  ];

  
  const getMonthList = async () => {
    setScrollX({ x: 1300 })
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

  const getPlazaList = async () => {
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPlazaList(res.list);
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
    { name: "เดือน", value: dataToPrint.DataList ? dataToPrint.monthName : "" },
    { name: "ปี", value: dataToPrint.DataList ? dataToPrint.yearName : "" },
    { name: "อาคารด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "รหัสผู้พิมพ์", value: userData.staffId ? userData.staffId : ""}
  ];

  useEffect(() => {
    setScrollX({ x: 1600 });
    getPlazaList();
    getMonthList();
    getYearList();
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    setUserData(user_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M04000009(data, props.auth.token);
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

  const handleOnFinish = (value) => {

    handleChangeIdToName(value)
    setInitialValue(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 31) {
      const dataOutput = {
        plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
        monthId: value.monthId === "" ? null : value.monthId,
        yearId: value.yearId === "" ? null : value.yearId,
      };
      getDataInfo(dataOutput);
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

  const handleChangeIdToName = (DataList) => {

    const month = monthList.find((e) => e.monthId === DataList.monthId)
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint(
      {
        DataList,
        monthName: month ? month.monthNameTh : "",
        yearName: year ? year.yearNameTh : "",
        plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      })
      setPlazaName(plaza ? plaza.plazaNameTh : "ทั้งหมด");
  }


  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.9 สรุปปริมาณจราจร/รายได้รายเดือน"],
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
            fileName: "4.9 สรุปปริมาณจราจร/รายได้รายเดือน",
            header: header49Excel,
            footer: footer49,
            columnOneCell: true
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];


  return (
    <Skeleton loading={loading} active>
      <FormDefault fields={fields}
        onFinish={handleOnFinish}
        action={action}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
      />
      <div className="mt-10">
      <b>อาคารด่าน : {plazaName}</b>
      </div>
      <div className="mt-10">
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.list}
          summary={() => {
            return (
              <>
                <Table.Summary.Row >
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "center" }}><b>รวม</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcTrafficCashTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcRevenueCashTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcTrafficCouponTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcRevenueCouponTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcTrafficEmvTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcRevenueEmvTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcTrafficQrTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcRevenueQrTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.easypassTrafficTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.easypassRevenueTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mpassTrafficTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mpassRevenueTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcTrafficTotalTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.mtcRevenueTotalTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.etcTrafficTotalTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.etcRevenueTotalTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.trafficTotalTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(Number(dataSource.revenueTotalTotal))}</b>
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
          pagination={false}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={dataSource}
          header={header49}
          footer={footer49}
          columnPerPage={header49.length}
          rowPerPage={23}
          propsClass="print-border-footer text-right"
          propsHeader={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "4.9 สรุปปริมาณจราจร/รายได้รายเดือน"
          }}
          oneColumnfooter={true}
          columnTotalChange={{
            day: "รวม"
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
)(SummaryTrafficAndRevenueDaily);
