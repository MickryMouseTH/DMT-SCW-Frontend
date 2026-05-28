/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintPDF from "./PrintPDF"
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M04000008 } from "../../../service/api/report";
import moment from "moment";
import { header48Excel } from "../../../tools/excel/header";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const SummaryTrafficAndRevenueDaily = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scrollX, setScrollX] = useState({});
  const [userData, setUserData] = useState({})

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่ : ",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เปิดดำเนินการ!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่ :",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เปิดดำเนินการ!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate,
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
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
      title: "ด่าน",
      fixed: "left",
      key: "plazaName",
      dataIndex: "plazaName",
      width: 60,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "bg_default",
          },
          children: (
            <Text type="secondary"  >
              <div className="text-left">{(text)}</div>
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

  
  const columns2 = [
    {
      title: "รถยกเว้น",
      dataIndex: "trafficExempt",
      key: "trafficExempt",
      width: 40,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "บัตร DMT",
      dataIndex: "trafficDmt",
      key: "trafficDmt",
      width: 40,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รถขบวน",
      dataIndex: "trafficHpmc",
      key: "trafficHpmc",
      width: 40,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รถฝ่าด่าน",
      dataIndex: "trafficVio",
      key: "trafficVio",
      width: 40,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "อื่นๆ",
      dataIndex: "trafficOther",
      key: "trafficOther",
      width: 40,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รวม",
      dataIndex: "trafficTotal",
      key: "trafficTotal",
      width: 40,
      align: "center",
      fixed: false,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const headerText = [
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,'DD/MM/YYYY') : "" },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,'DD/MM/YYYY') : "" },
    { name: "รหัสผู้พิมพ์", value: userData.staffId ? userData.staffId : "" }
  ];

  useEffect(() => {
    setScrollX({ x: 1600 })
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    setUserData(user_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const sortData = (value) => {    
    
    const listFooterTotal = {
      plazaName: "รวม",
      mtcTrafficCash: value.mtcTrafficCashTotal,
      mtcRevenueCash: value.mtcRevenueCashTotal,
      mtcTrafficCoupon: value.mtcTrafficCouponTotal,
      mtcRevenueCoupon: value.mtcRevenueCouponTotal,
      mtcTrafficEmv: value.mtcTrafficEmvTotal,
      mtcRevenueEmv: value.mtcRevenueEmvTotal,
      mtcTrafficQr: value.mtcTrafficQrTotal,
      mtcRevenueQr: value.mtcRevenueQrTotal,
      easypassTraffic: value.easypassTrafficTotal,
      easypassRevenue: value.easypassRevenueTotal,
      mpassTraffic: value.mpassTrafficTotal,
      mpassRevenue: value.mpassRevenueTotal,
      mtcTrafficTotal: value.mtcTrafficTotalTotal,
      mtcRevenueTotal: value.mtcRevenueTotalTotal,
      etcTrafficTotal: value.etcTrafficTotalTotal,
      etcRevenueTotal: value.etcRevenueTotalTotal,
      trafficTotal: value.trafficTotalTotal,
      revenueTotal: value.revenueTotalTotal,
    }
    
    const HeaderExport = {
      plazaName: 'รถยกเว้น',
      mtcTrafficCash: 'บัตร DMT',
      mtcRevenueCash: 'รถขบวน',
      mtcTrafficCoupon: 'รถฝ่าด่าน',
      mtcRevenueCoupon: 'อื่นๆ',
      mtcTrafficEmv: 'รวม'
    }

    const refacterResult = value.list2.map((item) => {
      return {
        plazaName: item.trafficExempt,
        mtcTrafficCash: item.trafficDmt,
        mtcRevenueCash: item.trafficHpmc,
        mtcTrafficCoupon: item.trafficVio,
        mtcRevenueCoupon: item.trafficOther,
        mtcTrafficEmv: item.trafficTotal
      }
    })

    return {
      ...value,
      list: [...value.list],
      list2: [...value.list2],
      listPdf: [...value.list,listFooterTotal],
      listExport: [...value.list, {}, {},
        HeaderExport, ...refacterResult]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M04000008(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(sortData(res));
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
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
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

    setDataToPrint(
      {
        DataList
      })
  }


  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.8 สรุปปริมาณจราจร/รายได้รายวัน"],
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
            dataSource: { list: dataSource.listExport },
            fileName: "4.8 สรุปปริมาณจราจร/รายได้รายวัน",
            header: header48Excel,
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
                  <Table.Summary.Cell colSpan={2}>
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
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          style={{ marginTop: 30 }}
          size="small"
          rowKey={(row, ind) => ind}
          columns={columns2}
          bordered
          dataSource={dataSource.list2}
          pagination={false}
        />
      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataFisrtTable={dataSource.listPdf}
          dataSecondTable={dataSource.list2}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "4.8 สรุปปริมาณจราจร/รายได้รายวัน"
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
