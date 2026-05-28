/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import { Row } from "antd";

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M030000012 } from "../../../service/api/report";
import {
  getPlazaListAPI,
} from "../../../service/api/util";
import {
  _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero
} from "../../../tools/util";
// import NoImage from '../../../assets/img/no-image.jpg'

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const ComparisonTrafficAndBisDaily = (props) => {
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [data, setData] = useState({ list: [] });
  const [options, setOptions] = useState([]);

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.startDate,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
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
        // initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "lane",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.lane,
      },
    },
  ];

  useEffect(() => {
    getPlazaList();
    const data = [
      ["วันเวลา", "SCW", "BIS"],
      ["", 0, 0]
    ];
    setData(data);
    const options = {
      title: "",
      hAxis: { title: "วันเวลา", titleTextStyle: { color: "#333" } },
      vAxis: { title: "ปริมาณจราจร", minValue: 0 },
      chartArea: { width: "80%", height: "70%" },
    };
    setOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const addData = (res) => {
    if (res.list.length === 0) {
      return [["วันเวลา", "SCW", "BIS"], ["", 0, 0]];
    } else {
      const list = res.list.map((item) => {
        return [...[item.date, item.scwTraffic, item.bisTraffic]]
      })
      return [["วันเวลา", "SCW", "BIS"], ...list];
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000012(data, props.auth.token);
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
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: _isEmpty(value.lane) ? null : value.lane,
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
        chartType="AreaChart"
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
)(ComparisonTrafficAndBisDaily);
