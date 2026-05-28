/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { _isEmpty, _isNull } from "../../../tools/util";
import { Table,  Row } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_TOLL_AUDIT_MTC_SUB_ADJ_M060000006 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const masterShift = ["1", "2", "3"];

const TollAuditMtcSupAdjust = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});

  const columnsSubAdj = [
    {
      title: <b>ลำดับ</b>,
      key: "index",
      dataIndex: "index",
      align: "center",
      width: 40,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => {
                history.push({
                  pathname: `/reports/toll-audit-mtc/sup-adj-detail/${record.seckey}`,
                  value: props.location.value,
                });
              }}
            >
              {_isNull(text)}
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
            history.push({
              pathname: `/reports/toll-audit-mtc/sup-adj-detail/${record.seckey}`,
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
      render: (text, record) => (
        <div
          style={{ textAlign: "left", cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: `/reports/toll-audit-mtc/sup-adj-detail/${record.seckey}`,
              value: props.location.value,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>ผลัด</b>,
      key: "shift",
      dataIndex: "shift",
      align: "center",
      width: 40,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: `/reports/toll-audit-mtc/sup-adj-detail/${record.seckey}`,
              value: props.location.value,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>เลขถุงเงิน</b>,
      key: "bagNo",
      dataIndex: "bagNo",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: `/reports/toll-audit-mtc/sup-adj-detail/${record.seckey}`,
              value: props.location.value,
            });
          }}
        >
          {_isNull(text)}
        </div>
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
            history.push({
              pathname: `/reports/toll-audit-mtc/sup-adj-detail/${record.seckey}`,
              value: props.location.value,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>ตรวจสอบแล้ว</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>โดย</b>,
          key: "auditBy",
          dataIndex: "auditBy",
          align: "center",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>วันที่</b>,
          key: "auditDate",
          dataIndex: "auditDate",
          align: "center",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          ),
        },
        {
          title: <b>หมายเหตุ</b>,
          key: "auditRemark",
          dataIndex: "auditRemark",
          align: "center",
          width: 100,
          render: (text) => (
            <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
          ),
        },
      ],
    },
  ];

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

  const getDataTollAuditMTCSubAdj = async (shift) => {
    try {
      setLoading(true);
      const body = {
        seckey: `${props.match.params.id}`,
      };
      const res = await GET_DATA_TOLL_AUDIT_MTC_SUB_ADJ_M060000006(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        if (shift) {
          let totalSupAdjust = 0;
          const list = res.list.filter((v) => v.shift === shift);
          list.forEach((element) => {
            totalSupAdjust += element.supAdjust;
          });

          res.list = list;
          res.totalSupAdjust = totalSupAdjust;
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
    getDataTollAuditMTCSubAdj();
  }, []);

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const shift = value.shift === "ทั้งหมด" ? null : value.shift;
    getDataTollAuditMTCSubAdj(shift);
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
        >{` รายการแก้ไขโดยพนักงานควบคุม (Sup.Adjust) ${dataSource.header ? dataSource.header : ""
          }`}</h3>
      </Row>
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          scroll={{ x: 550 }}
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsSubAdj}
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
                  <Table.Summary.Cell key={2}>
                    <div style={{ textAlign: "right" }}>
                      <b>{_isNull(dataSource.totalSupAdjust)}</b>
                    </div>
                  </Table.Summary.Cell>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TollAuditMtcSupAdjust);
