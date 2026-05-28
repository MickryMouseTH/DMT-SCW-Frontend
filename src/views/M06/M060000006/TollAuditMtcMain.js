/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _exportFileExcel,
  _setYearThai,
} from "../../../tools/util";
import { Table, Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_TOLL_AUDIT_MTC_M060000006 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { header66 } from "../../../tools/excel/header";
import { footer66 } from "../../../tools/excel/footer";
import PrintReport from "../../../components/print/PrintReport";

import chartStyles from "../../../components/chart/chart.css";
import BarGraph from "../../../components/chart/d3BarGraph";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const TollAuditMtcMain = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataToPrint, setDataToPrint] = useState({});
  const [initialValue, setInitialValue] = useState({});
  const [tsbList, setTsbList] = useState([]);
  const [masterPain, setMasterPain] = useState([]);

  const columnsMain = [
    {
      title: <b>ด่าน</b>,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
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
      title: <b>วันที่</b>,
      key: "date",
      dataIndex: "date",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>Sup.Adjust</b>,
      key: "supAdjust",
      dataIndex: "supAdjust",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/toll-audit-mtc/sup-adj/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>TOD-SOD</b>,
      key: "todSod",
      dataIndex: "todSod",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/toll-audit-mtc/tod-sod/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>MCC-TOD</b>,
      key: "mccTod",
      dataIndex: "mccTod",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: `/reports/toll-audit-mtc/mcc-tod/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>MCC-SOD</b>,
      key: "mccSod",
      dataIndex: "mccSod",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: `/reports/toll-audit-mtc/mcc-sod/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>จำนวนการนำส่ง</b>,
      key: "numberTod",
      dataIndex: "numberTod",
      align: "center",
      width: 140,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ตรวจสอบแล้ว</b>,
      key: "percentAudit",
      dataIndex: "percentAudit",
      align: "center",
      width: 140,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}%</div>
      ),
    },
  ];

  const columnsMainTotal = [
    "totalSupAdjust",
    "totalTodSod",
    "totalMccTod",
    "totalMccSod",
    "totalNumberTod",
    "averagePercentAudit",
  ];

  const fields = [
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...tsbList],
            keyName: "tsbAbbreviation",
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
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
      },
    },
  ];

  const headerText = [
    {
      name: "ด่าน",
      value: dataSource.tsbId
        ? tsbList.filter((tp) => tp.tsbId === dataSource.tsbId)[0]
          ?.tsbAbbreviation
        : "ทั้งหมด",
    },
    {
      name: "วันที่",
      value: dataToPrint.date
        ? _setYearThai(dataToPrint.date,dateFormat)
        : "",
    },
  ];

  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.6 Toll Audit MTC Report"],
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
        onClick: () =>
          _exportFileExcel({
            dataSource: dataSource,
            fileName: "6.6 Toll Audit MTC Report",
            header: header66,
            footer: footer66,
          }),
        disabled: dataSource.list.length < 1,
      },
    },
  ];

  const getTSBList = async () => {
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        const painChart = res.list.map((tp) => tp.tsbAbbreviation);
        setLoading(false);
        setTsbList(res.list);
        setMasterPain(painChart);
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

  useEffect(() => {
    getTSBList();
  }, []);

  const getDataTollAuditMTC = useCallback(
    async (data) => {
      try {
        setLoading(true);
        let body = data
          ? data
          : {
            date: moment("00:00:00", "HH:mm:ss").format(
              "YYYY-MM-DD[T]HH:mm:ss.SSS[+07]"
            ),
            tsbId: null,
          };
        setDataToPrint(body);
        const res = await GET_DATA_TOLL_AUDIT_MTC_M060000006(
          body,
          props.auth.token
        );
        if (res.status.code === "S200") {
          setLoading(false);
          res.totalDescTh = "รวม";
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
      setDataToPrint(props.location.value);
      getDataTollAuditMTC(dataOutput);
    } else {
      getDataTollAuditMTC();
    }
  }, [getDataTollAuditMTC]);

  const tableSummaryRowRender = (listRender = [], cellIndex = 2) => {
    return listRender.map((title, index) => (
      <Table.Summary.Cell key={index + cellIndex}>
        <div key={index + cellIndex} style={{ textAlign: "right" }}>
          {_isNull(dataSource[title])}
          {title === "averagePercentAudit" ? "%" : ""}
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
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
    };
    getDataTollAuditMTC(dataOutput);
  };

  const mockupReadinessBargraph = () => {
    const xAxisTsb = masterPain;
    const output = [];
    xAxisTsb.forEach((element) => {
      const dataFilter = dataSource.list.filter(
        (v) => v.plazaAbbreviation === element
      );
      if (dataFilter.length > 0) {
        output.push({ name: element, value: dataFilter[0].percentAudit / 100 });
      } else {
        output.push({ name: element, value: 0 / 100 });
      }
    });
    return output;
  };

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
          style={{ marginTop: 20 }}
          scroll={{ x: 550 }}
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsMain}
          bordered
          dataSource={dataSource.list}
          pagination={false}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell key={1} colSpan={2}>
                    <div style={{ textAlign: "center" }}>
                      <b>รวม</b>
                    </div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsMainTotal)}
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={dataSource}
          header={header66}
          footer={footer66}
          columnPerPage={header66.length}
          propsHeader={{
            headerText,
            colSpan: 12,
            position: "d-flex justify-content-start",
            TopicText: "6.6 ตรวจสอบรายได้ระบบ MTC",
          }}
        />
      </div>
      <div className={chartStyles.mainWrapper}>
        <div
          style={{
            background: "var(--color-bg-surface)",
            borderRadius: "10px",
            margin: "10px 10px",
          }}
        >
          <p
            className={chartStyles.subHeader}
            style={{ paddingTop: "15px", color: "var(--color-text-primary)", fontSize: "16px" }}
          >
            สถานะการตรวจสอบ
          </p>
          <BarGraph
            data={mockupReadinessBargraph()}
            pain={masterPain}
            fillColor={"#00A069"}
            title={"สถานะการตรวจสอบรายได้ระบบ MTC"}
            yAxisName={"อัตราการตรวจสอบ"}
            chartSettings={{ height: 270, marginTop: 40 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(TollAuditMtcMain);
