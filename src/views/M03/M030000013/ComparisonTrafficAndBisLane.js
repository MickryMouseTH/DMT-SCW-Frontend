/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Chart } from "react-google-charts";
import { Row } from "antd";

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M030000013 } from "../../../service/api/report";
import { getYearListAPI, getMonthListAPI } from "../../../service/api/util";
import {
  _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero
} from "../../../tools/util";
// import NoImage from '../../../assets/img/no-image.jpg'

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const ComparisonTrafficAndBisLane = (props) => {
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [data, setData] = useState({ list: [] });
  const [options, setOptions] = useState([]);

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
    }
  ];

  useEffect(() => {
    getMonthList();
    getYearList();
    const data = [
      ["ช่องทาง", "% ความคลาดเคลื่อน"],
      [" ", 0]
    ];
    setData(data);
    const options = {
      chart: {
        title: ""
      },
    };
    setOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const addData = (res) => {
    if (res.list.length === 0) {
      return [["ช่องทาง", "% ความคลาดเคลื่อน"], [" ", 0]];
    } else {
      const list = res.list.map((item) => {
        return [...[item.lane, item.percent]]
      })
      return [["ช่องทาง", "% ความคลาดเคลื่อน"], ...list];
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000013(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setData(addData(res));
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
    setInitialValue(value);
    const dataOutput = {
      month: value.monthId === "" ? null : value.monthId,
      year: value.yearId === "" ? null : value.yearId,
    };
    getDataInfo(dataOutput);
  };

  const action = [{}];

  return (
    <div>

      {loading ? (
        <Row justify='center' align='bottom' style={{}}>
          <h1 style={{ color: 'gray' }}>กำลังทำงานโปรดรอสักครู่...</h1>
        </Row>
      ) : (
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
        </div>
      )}
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisonTrafficAndBisLane);
