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
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_DAILY_M030000014 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { header314 } from "../../../tools/excel/header";
import PrintReport from "../../../components/print/PrintReport";

const dateFormat = "DD/MM/YYYY";

const CompareScwBisDaily = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataToPrint, setDataToPrint] = useState({});
  const [initialValue, setInitialValue] = useState({});
  const [plazaList, setsPlazaList] = useState([]);

  const columnsMain = [
    {
      title: <b>ลำดับ</b>,
      key: "order",
      dataIndex: "order",
      align: "center",
      width: 25,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>วันที่</b>,
      key: "date",
      dataIndex: "date",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>ด่าน</b>,
      key: "plazaName",
      dataIndex: "plazaName",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "left", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: <b>ช่องทาง</b>,
      key: "laneName",
      dataIndex: "laneName",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "left", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
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
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
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
      width: 100,
      render: (text, record) => (
        <div
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
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
          onClick={() => {
            initialValue.seckey = record.seckey;
            history.push({
              pathname: `/reports/compare-scw-bis-hourly/${record.seckey}`,
              value: initialValue,
            });
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
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
    {
      type: "select",
      option: {
        name: "plazaId",
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
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.plazaId
        // initialValue.plazaId ? initialValue.plazaId : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "laneId",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.laneId,
      },
    },
  ];

  const headerText = [
    {
      name: "วันที่",
      value: dataToPrint.date ? _setYearThai(dataToPrint.date,dateFormat) : ""
    },
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : ""},
    { name: "ช่องทาง", value: dataToPrint.laneId ? dataToPrint.laneId : ""},
  ];

  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.14 รายงานเปรียบเทียบปริมาณจราจรระบบหลัก กับ ระบบสำรอง(BIS)"],
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
            fileName: "3.14 รายงานเปรียบเทียบปริมาณจราจรระบบหลัก กับ ระบบสำรอง(BIS)",
            header: header314,
          }),
        disabled: dataSource.list.length < 1,
      },
    },
  ];

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

  useEffect(() => {
    getPlazaList();
  }, []);

  const getDataInfo = useCallback(
    async (data) => {
      try {
        setLoading(true);
        let body = data
          ? data
          : {
            date: moment("00:00:00", "HH:mm:ss").format(
              "YYYY-MM-DD[T]HH:mm:ss.SSS[+07]"
            ),
            plazaId: null,
            laneId: null,
          };
        setDataToPrint(body);
        const res = await GET_DATA_INFO_DAILY_M030000014(
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
    },
    [props]
  );

  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const plaza = plazaList.find((e) => e.plazaId === props.location.value.plazaId);
      const dataOutput = {
        date: _timeZoneThai(props.location.value.date),
        plazaId: props.location.value.plazaId === "ทั้งหมด"
            ? null
            : props.location.value.plazaId,
        plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
        laneId: props.location.value.laneId === ""
            ? null
            : props.location.value.laneId,
      };
      setDataToPrint(props.location.value);
      getDataInfo(dataOutput);
    } else {
      getDataInfo();
    }
  }, [getDataInfo]);

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const plaza = plazaList.find((e) => e.plazaId === value.plazaId);
    const dataOutput = {
      date: moment(_timeZoneThai(value.date)).format(
        "YYYY-MM-DD[T]00:00:00.000[+07]"
      ),
      plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      laneId: value.laneId === "ทั้งหมด" ? null : value.laneId,
    };
    getDataInfo(dataOutput);
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
          pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={dataSource}
          header={header314}
          columnPerPage={header314.length}
          propsHeader={{
            headerText,
            TopicText: "3.14 รายงานเปรียบเทียบปริมาณจราจรระบบหลัก กับ ระบบสำรอง(BIS)",
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

export default connect(mapStateToProps, mapDispatchToProps)(CompareScwBisDaily);
