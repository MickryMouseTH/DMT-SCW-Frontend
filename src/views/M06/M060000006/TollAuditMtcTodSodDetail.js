/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { _isEmpty, _isNull } from "../../../tools/util";
import { Table,  Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_TOLL_AUDIT_MTC_TOD_SOD_DETAIL_M060000006 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
// import ButtonBack from "../../../components/button/ButtonBack";

const styleResponsiveTable = { sm: 24, xs: 24, md: 13, lg: 13 };
// const styleResponsiveHeader = { sm: 24, xs: 24, md: 12, lg: 12 };

const TollAuditMtcTodSodDetail = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });

  useEffect(() => {
    _isEmpty(props.location.state)
      ? goBack()
      : getDataTollAuditMTCTodSodDetail(props.location.state);
  }, []);

  const goBack = () => {
    history.push({
      pathname: `/reports/toll-audit-mtc`,
    });
  };

  // const handleOnClickBack = () => {
  //   history.goBack();
  // };

  const columnsTocSodDetailComputed = [
    {
      title: <b>Computed</b>,
      key: "tod",
      dataIndex: "tod",
      align: "center",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>Declared</b>,
      key: "sod",
      dataIndex: "sod",
      align: "center",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      title: <b>Diff</b>,
      key: "dif",
      dataIndex: "dif",
      align: "center",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
  ];

  const columnsTocSodDetailDeclared = [
    {
      title: <b>Declared detail</b>,
      key: "declaredDetail",
      dataIndex: "declaredDetail",
      align: "center",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      ),
    },
    {
      key: "qty",
      dataIndex: "qty",
      align: "center",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
    {
      key: "amount",
      dataIndex: "amount",
      align: "center",
      width: 150,
      render: (text) => (
        <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      ),
    },
  ];

  const getDataTollAuditMTCTodSodDetail = async (data) => {
    try {
      setLoading(true);
      const body = {
        seckey: `${data?.seckey}`,
        tod: `${data?.tod}`,
        sod: `${data?.sod}`,
        dif: `${data?.dif}`,
      };
      const res = await GET_DATA_TOLL_AUDIT_MTC_TOD_SOD_DETAIL_M060000006(
        body,
        props.auth.token
      );
      // console.log("6.6 Search---------------->", res)
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

  const handleOnClickBack = () => {
    props.history.push({
      pathname: `/reports/toll-audit-mtc/tod-sod/${props.location.state.id}`,
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

  return (
    <Skeleton loading={loading} active>
      <Row className="d-flex justify-content-around">
        <Col>
          <Row>
            <h3>{`รายการนำส่งเงินเทียบกับยอดจากระบบ (TOD-SOD)`}</h3>
          </Row>
          <Row>
            <h3> {`${dataSource.header2 ? dataSource.header2 : ""}`}</h3>
          </Row>
          <Row>
            <h3> {`${dataSource.header1 ? dataSource.header1 : ""}`}</h3>
          </Row>
        </Col>
        <Col>
          <Row>
            <FormDefault
              buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
              formWrapper={{ md: 24, lg: 19, xl: 21 }}
              typeButton="primary"
              submitText=""
              action={action}
            />
          </Row>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...styleResponsiveTable}>
          <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
            <Table
              size="small"
              rowKey={(row, ind) => ind}
              columns={columnsTocSodDetailComputed}
              bordered
              dataSource={[dataSource]}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...styleResponsiveTable}>
          <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
            <Table
              style={{ marginTop: 30 }}
              size="small"
              rowKey={(row, ind) => ind}
              columns={columnsTocSodDetailDeclared}
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
                      <Table.Summary.Cell key={2}>
                        <div style={{ textAlign: "right" }}>
                          <b>{_isNull(dataSource.totalAmount)}</b>
                        </div>
                      </Table.Summary.Cell>
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
)(TollAuditMtcTodSodDetail);
