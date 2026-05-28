/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { _isEmpty, _isNull } from "../../../tools/util";
import {
  Table,
  Typography,
  Row,
  // Col,
  // Button,
} from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_TOLL_AUDIT_MTC_TOD_SOD_M060000006 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const { Text } = Typography;
const masterShift = ["1", "2", "3"];

const TollAuditMtcTodSod = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});

  const columnsTocSod = [
    {
      title: <b>ลำดับ</b>,
      key: "index",
      dataIndex: "index",
      align: "center",
      width: 40,
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <div style={{ textAlign: "right" }}>
              <Text type="secondary" align="right">
                {_isNull(text)}
              </Text>
            </div>
          ),
        };
      },
    },
    {
      title: <b>รหัสพนักงาน</b>,
      key: "staffId",
      dataIndex: "staffId",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            const sendItem = {
              seckey: record.seckey,
              tod: record.tod,
              sod: record.sod,
              dif: record.dif,
              id: props.match.params.id,
            };
            history.push({
              pathname: `/reports/toll-audit-mtc/tod-sod-detail/${text}`,
              state: { ...sendItem },
              value: props.location.value,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>ชื่อ-นามสกุล</b>,
      key: "staffName",
      dataIndex: "staffName",
      align: "center",
      width: 200,
      render: (text) => (
        <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ผลัด</b>,
      key: "shift",
      dataIndex: "shift",
      align: "center",
      width: 40,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>เลขถุงเงิน</b>,
      key: "bagNo",
      dataIndex: "bagNo",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>TOD</b>,
      key: "tod",
      dataIndex: "tod",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>SOD</b>,
      key: "sod",
      dataIndex: "sod",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>ส่วนต่าง</b>,
      key: "dif",
      dataIndex: "dif",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
  ];

  const columnsTocSodTotal = ["totalTod", "totalSod", "totalDif"];

  const fields = [
    {
      type: "select",
      option: {
        name: "shift",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...masterShift],
          },
        },
        initialValue: initialValue.shift ? initialValue.shift : "ทั้งหมด",
      },
    },
  ];

  const handleOnClickBack = () => {
    props.history.push({
      pathname: `/reports/toll-audit-mtc`,
      value: props.location.value
    });
  };
  
  const action = [{
    name: "ย้อนกลับ",
    props: {
      type: "default",
      ghost: false,
      onClick: handleOnClickBack,
    },
  },
  ];

  const getDataTollAuditMTCTodSod = async (shift) => {
    try {
      setLoading(true);
      const body = {
        seckey: `${props.match.params.id}`,
      };
      const res = await GET_DATA_TOLL_AUDIT_MTC_TOD_SOD_M060000006(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        if (shift) {
          let totalTod = 0;
          let totalSod = 0;
          let totalDif = 0;
          const list = res.list.filter((v) => v.shift === shift);
          list.forEach((element) => {
            totalTod += element.tod;
            totalSod += element.sod;
            totalDif += element.dif;
          });
          res.list = list;
          res.totalTod = totalTod;
          res.totalSod = totalSod;
          res.totalDif = totalDif;
        }
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

  useEffect(() => {
    getDataTollAuditMTCTodSod();
  }, []);

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
    const shift = value.shift === "ทั้งหมด" ? null : value.shift;
    getDataTollAuditMTCTodSod(shift);
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
      <Row>
        <h3
          style={{ marginTop: -30 }}
        >{` รายการนำส่งเงินเทียบกับยอดจากระบบ (TOD-SOD) ${dataSource.header ? dataSource.header : ""
          }`}</h3>
      </Row>
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          scroll={{ x: 550 }}
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsTocSod}
          bordered
          dataSource={dataSource.list}
          pagination={false}
          summary={(pageData) => {
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell key={1} colSpan={5}>
                    <div style={{ textAlign: "center" }}>
                      <b>รวม</b>
                    </div>
                  </Table.Summary.Cell>
                  {tableSummaryRowRender(columnsTocSodTotal)}
                </Table.Summary.Row>
              </>
            );
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

export default connect(mapStateToProps, mapDispatchToProps)(TollAuditMtcTodSod);
