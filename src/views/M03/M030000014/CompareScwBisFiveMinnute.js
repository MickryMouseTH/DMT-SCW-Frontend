/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { _isEmpty, _isNull } from "../../../tools/util";
import { Table,  Row } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_FIVE_MINNUTE_M030000014 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const CompareScwBisFiveMinnute = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });

  const columnsSubAdj = [
    {
      title: <b>ลำดับ</b>,
      key: "order",
      dataIndex: "order",
      align: "center",
      width: 50,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              {_isNull(text)}
            </div>
          ),
        };
      },
    },
    {
      title: <b>นาทีที่</b>,
      key: "minnute",
      dataIndex: "minnute",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>จำนวนรถผ่านทาง</b>,
      key: "scwTraffic",
      dataIndex: "scwTraffic",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>BIS นับ</b>,
      key: "bisTraffic",
      dataIndex: "bisTraffic",
      align: "center",
      width: 40,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>ผลต่าง</b>,
      key: "diff",
      dataIndex: "diff",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
        >
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const fields = [];

  const handleOnClickBack = () => {
    props.history.push({
      pathname: `/reports/compare-scw-bis-hourly/${props.match.params.id}`,
      value: props.location.value
    });
  };
  
  const action = [{}];

  const getData = async () => {
    try {
      setLoading(true);
      const body = {
        seckey: `${props.match.params.id}`,
      };
      const res = await GET_DATA_INFO_FIVE_MINNUTE_M030000014(
        body,
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Skeleton loading={loading} active>
      
      <Row>
        <h3>{` วันที่ : ${dataSource.date ? dataSource.date : ""
          }`}</h3>
      </Row>
      <Row>
        <h3>{` ด่าน : ${dataSource.plazaName ? dataSource.plazaName : ""
          }`}</h3>
      </Row>
      <Row>
        <h3>{` ช่องทาง : ${dataSource.laneName ? dataSource.laneName : ""
          }`}</h3>
      </Row>
      <Row>
        <h3>{` ชั่วโมงที่ : ${dataSource.hour ? dataSource.hour : ""
          }`}</h3>
      </Row>
      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ย้อนกลับ"
        onFinish={handleOnClickBack}
        action={action}
      />
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          scroll={{ x: 550 }}
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsSubAdj}
          bordered
          dataSource={dataSource.list}
          pagination={false}
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
)(CompareScwBisFiveMinnute);
