import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { _timeZoneThai, _isEmpty, _isNull } from "../../../tools/util";
import { Table, Typography, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_DAILY_TOLL_COLLECTION_M060000005 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const DailyReconcliationReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});

  const columnsTimePeriod = [
    {
      title: "",
      key: "",
      align: "center",
      children: [
        {
          title: <b>Plaza</b>,
          key: "plazaName",
          dataIndex: "plazaName",
          align: "center",
          width: 100,
          render(text) {
            return {
              props: {
                className: "secondary bg_default",
              },
              children: (
                <Text type="secondary" align="center">
                  {_isNull(text)}
                </Text>
              ),
            };
          },
        },
        {
          title: <b>TOLL</b>,
          key: "",
          align: "center",
          children: [
            {
              title: <b>TOTAL</b>,
              key: "amQr",
              dataIndex: "amQr",
              align: "center",
              width: 60,
              render: (text) => (
                <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              ),
            },
            {
              title: <b>%</b>,
              key: "amMpass",
              dataIndex: "amMpass",
              align: "center",
              width: 60,
              render: (text) => (
                <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              ),
            },
          ],
        },
        {
          title: <b>TOTAL</b>,
          key: "amEpass",
          dataIndex: "amEpass",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
      ],
    },
    {
      title: <b>06:00-14:00</b>,
      key: "amCach",
      dataIndex: "amCach",
      align: "center",
      children: [
        {
          title: <b>A.M.</b>,
          key: "amCach",
          dataIndex: "amCach",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
      ],
    },
    {
      title: <b>06:00-14:00</b>,
      key: "amCach",
      dataIndex: "amCach",
      align: "center",
      children: [
        {
          title: <b>P.M.</b>,
          key: "amCoupon",
          dataIndex: "amCoupon",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
      ],
    },
    {
      title: <b>06:00-14:00</b>,
      key: "amCach",
      dataIndex: "amCach",
      align: "center",
      children: [
        {
          title: <b>NIGHT</b>,
          key: "amEmv",
          dataIndex: "amEmv",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
      ],
    },
    {
      title: <b>TOLL</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>PERCENTAGES</b>,
          key: "",
          align: "center",
          children: [
            {
              title: <b>NB. & SB.</b>,
              key: "amQr",
              dataIndex: "amQr",
              align: "center",
              width: 60,
              render: (text) => (
                <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              ),
            },
            {
              title: <b>ORI & EXT</b>,
              key: "amMpass",
              dataIndex: "amMpass",
              align: "center",
              width: 60,
              render: (text) => (
                <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              ),
            },
          ],
        },
      ],
    },
    {
      title: "",
      key: "",
      align: "center",
      children: [
        {
          title: "",
          key: "",
          align: "center",
          children: [
            {
              title: <b>TTL. SYS.</b>,
              key: "amMpass",
              dataIndex: "amMpass",
              align: "center",
              width: 60,
              render: (text) => (
                <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              ),
            },
          ],
        },
      ],
    },
  ];

  const columnsTimePeriodTotal = [
    "amCachTotal",
    "amCouponTotal",
    "amEmvTotal",
    "amQrTotal",
    "amMpassTotal",
    "amEpassTotal",
    "pmCachTotal",
    "pmCouponTotal",
    "pmEmvTotal",
    "pmQrTotal",
    "pmMpassTotal",
    "pmEpassTotal",
    "nightCachTotal",
    "nightCouponTotal",
    "nightEmvTotal",
    "nightQrTotal",
    "nightMpassTotal",
    "nightEpassTotal",
  ];

  const columnsTimePeriodPercent = [
    "amCachPercent",
    "amCouponPercent",
    "amEmvPercent",
    "amQrPercent",
    "amMpassPercent",
    "amEpassPercent",
    "pmCachPercent",
    "pmCouponPercent",
    "pmEmvPercent",
    "pmQrPercent",
    "pmMpassPercent",
    "pmEpassPercent",
    "nightCachPercent",
    "nightCouponPercent",
    "nightEmvPercent",
    "nightQrPercent",
    "nightMpassPercent",
    "nightEpassPercent",
  ];

  const columnsTotal = [
    {
      title: <b>Plaza</b>,
      key: "plazaName",
      dataIndex: "plazaName",
      align: "center",
      width: 130,
      ellipsis: true,
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              {_isNull(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: <b>Total</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>CASH</b>,
          key: "totalCach",
          dataIndex: "totalCach",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>Coupon</b>,
          key: "totalCoupon",
          dataIndex: "totalCoupon",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>EMV</b>,
          key: "totalEmv",
          dataIndex: "totalEmv",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>QRCode</b>,
          key: "totalQr",
          dataIndex: "totalQr",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>Mpass</b>,
          key: "totalMpass",
          dataIndex: "totalMpass",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>EasyPass</b>,
          key: "totalEpass",
          dataIndex: "totalEpass",
          align: "center",
          width: 60,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
      ],
    },
  ];

  const columnsTotalTotal = [
    "totalCachTotal",
    "totalCouponTotal",
    "totalEmvTotal",
    "totalQrTotal",
    "totalMpassTotal",
    "totalEpassTotal",
  ];

  const columnsTotalPercent = [
    "totalCachPercent",
    "totalCouponPercent",
    "totalEmvPercent",
    "totalQrPercent",
    "totalMpassPercent",
    "totalEpassPercent",
  ];

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
      },
    },
  ];

  const action = [{}];

  const getDataDailyTollCollction = useCallback(
    async (
      data = {
        date: moment("00:00:00", "HH:mm:ss").format(
          "YYYY-MM-DD[T]HH:mm:ss.SSS[+07]"
        ),
      }
    ) => {
      try {
        setLoading(true);
        const res = await GET_DATA_DAILY_TOLL_COLLECTION_M060000005(
          { shiftDate: data.date },
          props.auth.token
        );
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
    },
    [props]
  );

  const tableSummaryRowRender = (listRender = [], cellIndex = 2) => {
    return listRender.map((title, index) => (
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "right" }}>
          {_isNull(dataSource[title])}
        </div>
      </Table.Summary.Cell>
    ));
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      date: moment(_timeZoneThai(value.date)).format(
        "YYYY-MM-DD[T]00:00:00.000[+07]"
      ),
    };
    getDataDailyTollCollction(dataOutput);
  };

  useEffect(() => {
    getDataDailyTollCollction();
  }, [getDataDailyTollCollction]);

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
          style={{ marginTop: -30 }}
          size="small"
          rowKey={(row, ind) => ind}
          scroll={{ x: 1500 }}
          columns={columnsTimePeriod}
          bordered
          dataSource={dataSource.list}
          pagination={false}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}>
                      <b>Total</b>
                    </div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsTimePeriodTotal)}
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}>
                      <b>Percent</b>
                    </div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsTimePeriodPercent)}
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <Row gutter={24}>
        <Col lg={14}>
          <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
            <Table
              style={{ marginTop: 30 }}
              scroll={{ x: 550 }}
              size="small"
              rowKey={(row, ind) => ind}
              columns={columnsTotal}
              bordered
              dataSource={dataSource.listTotal}
              pagination={false}
              summary={(pageData) => {
                let grandTotal = 0;
                columnsTotalTotal.forEach((element) => {
                  grandTotal += dataSource[element];
                });
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell key={1}>
                        <div style={{ textAlign: "right" }}>
                          <b>Total</b>
                        </div>
                      </Table.Summary.Cell>
                      {tableSummaryRowRender(columnsTotalTotal)}
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell key={1}>
                        <div style={{ textAlign: "right" }}>
                          <b>Grand Total</b>
                        </div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell key={2} colSpan={6}>
                        <div style={{ textAlign: "right" }}>
                          <b>{_isNull(grandTotal)}</b>
                        </div>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell key={1}>
                        <div style={{ textAlign: "right" }}>
                          <b>Percent</b>
                        </div>
                      </Table.Summary.Cell>
                      {tableSummaryRowRender(columnsTotalPercent)}
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </div>
        </Col>
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
)(DailyReconcliationReport);
