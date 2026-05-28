/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table, Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000006C } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import {
  getTSBList_API
} from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;
const ReportTrafficEtcByLane = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [minuteList, setMinuteList] = useState([]);
  const [tsbList, setTsbList] = useState([]);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "TSB Name",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: [...tsbList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : "",
      },
    },
    {
      type: "datePicker",
      option: {
        name: "operationDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.operationDate,
      },
    },
    {
      type: "select",
      option: {
        name: "minute",
        label: "ค้นหาราย",
        childrenProps: {
          placeholder: "ค้นหาราย",
          optionValue: {
            values: [...minuteList],
            keyValue: "minute",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกประเภทการชำระ!",
          },
        ],
        initialValue: initialValue.minute ? initialValue.minute : "60 Minute",
      },
    }
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 40,
      align: "center",
      fixed: true,
      show: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ช่วงเวลา",
      dataIndex: "time",
      key: "time",
      width: 120,
      align: "center",
      fixed: true,
      show: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].show : false) : false,
      key: "trafficTxt1",
      dataIndex: "trafficTxt1",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].show : false) : false,
      key: "trafficTxt2",
      dataIndex: "trafficTxt2",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].show : false) : false,
      key: "trafficTxt3",
      dataIndex: "trafficTxt3",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].show : false) : false,
      key: "trafficTxt4",
      dataIndex: "trafficTxt4",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].show : false) : false,
      key: "trafficTxt5",
      dataIndex: "trafficTxt5",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].show : false) : false,
      key: "trafficTxt6",
      dataIndex: "trafficTxt6",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].show : false) : false,
      key: "trafficTxt7",
      dataIndex: "trafficTxt7",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].show : false) : false,
      key: "trafficTxt8",
      dataIndex: "trafficTxt8",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].show : false) : false,
      key: "trafficTxt9",
      dataIndex: "trafficTxt9",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].show : false) : false,
      key: "trafficTxt10",
      dataIndex: "trafficTxt10",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].show : false) : false,
      key: "trafficTxt11",
      dataIndex: "trafficTxt11",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].show : false) : false,
      key: "trafficTxt12",
      dataIndex: "trafficTxt12",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].show : false) : false,
      key: "trafficTxt13",
      dataIndex: "trafficTxt13",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].show : false) : false,
      key: "trafficTxt14",
      dataIndex: "trafficTxt14",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].show : false) : false,
      key: "trafficTxt15",
      dataIndex: "trafficTxt15",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].show : false) : false,
      key: "trafficTxt16",
      dataIndex: "trafficTxt16",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].show : false) : false,
      key: "trafficTxt17",
      dataIndex: "trafficTxt17",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].show : false) : false,
      key: "trafficTxt18",
      dataIndex: "trafficTxt18",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].show : false) : false,
      key: "trafficTxt19",
      dataIndex: "trafficTxt19",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].show : false) : false,
      key: "trafficTxt20",
      dataIndex: "trafficTxt20",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].show : false) : false,
      key: "trafficTxt21",
      dataIndex: "trafficTxt21",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].show : false) : false,
      key: "trafficTxt22",
      dataIndex: "trafficTxt22",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].show : false) : false,
      key: "trafficTxt23",
      dataIndex: "trafficTxt23",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].show : false) : false,
      key: "trafficTxt24",
      dataIndex: "trafficTxt24",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].show : false) : false,
      key: "trafficTxt25",
      dataIndex: "trafficTxt25",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].show : false) : false,
      key: "trafficTxt26",
      dataIndex: "trafficTxt26",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].show : false) : false,
      key: "trafficTxt27",
      dataIndex: "trafficTxt27",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].show : false) : false,
      key: "trafficTxt28",
      dataIndex: "trafficTxt28",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].show : false) : false,
      key: "trafficTxt29",
      dataIndex: "trafficTxt29",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : "") : "",
      show: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].show : false) : false,
      key: "trafficTxt30",
      dataIndex: "trafficTxt30",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
  ].filter(item => item.show);

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.tsbName : "" },
    { name: "วันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.operationDate,"DD/MM/YYYY") : "", },
    { name: "ค้นหาราย", value: dataToPrint.DataList ? dataToPrint.minute : "" },
  ];

  useEffect(() => {
    setMinuteList(["1 Minute", "5 Minute", "10 Minute", "15 Minute", "30 Minute", "60 Minute"]);
    getTsbList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTsbList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setTsbList(res.list);
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

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000006C(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
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

  const handleChangeIdToName = (DataList) => {
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint(
      {
        DataList,
        tsbName: tsb ? tsb.tsbNameTh : "",
        minute: DataList.minute ? DataList.minute : ""
      })
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    let minute = null;
    if (value.minute === "1 Minute") {
      minute = 1;
    } else if (value.minute === "5 Minute") {
      minute = 5;
    } else if (value.minute === "10 Minute") {
      minute = 10;
    } else if (value.minute === "15 Minute") {
      minute = 15;
    } else if (value.minute === "30 Minute") {
      minute = 30;
    } else if (value.minute === "60 Minute") {
      minute = 60;
    }
    const dataOutput = {
      operationDate: _timeZoneThai(value.operationDate),
      tsbId: value.tsbId === "" ? null : value.tsbId,
      minute: minute
    };
    getDataInfo(dataOutput);

  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.6.3 ข้อมูลปริมาณที่ใช้บริการช่องทาง ETC"],
  });

  const headerExcel = [
    { show: true, name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-center' },
    { show: true, name: "ช่วงเวลา", key: "time", type: "nullColumn", align: 'center', className: 'text-center' },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : ""),
      key: "trafficTxt1", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : ""),
      key: "trafficTxt2", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : ""),
      key: "trafficTxt3", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : ""),
      key: "trafficTxt4", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : ""),
      key: "trafficTxt5", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : ""),
      key: "trafficTxt6", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : ""),
      key: "trafficTxt7", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : ""),
      key: "trafficTxt8", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : ""),
      key: "trafficTxt9", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : ""),
      key: "trafficTxt10", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : ""),
      key: "trafficTxt11", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : ""),
      key: "trafficTxt12", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[12].columnName : ""),
      key: "trafficTxt13", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[13].columnName : ""),
      key: "trafficTxt14", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[14].columnName : ""),
      key: "trafficTxt15", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[15].columnName : ""),
      key: "trafficTxt16", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[16].columnName : ""),
      key: "trafficTxt17", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[17].columnName : ""),
      key: "trafficTxt18", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[18].columnName : ""),
      key: "trafficTxt19", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[19].columnName : ""),
      key: "trafficTxt20", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[20].columnName : ""),
      key: "trafficTxt21", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[21].columnName : ""),
      key: "trafficTxt22", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[22].columnName : ""),
      key: "trafficTxt23", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[23].columnName : ""),
      key: "trafficTxt24", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[24].columnName : ""),
      key: "trafficTxt25", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[25].columnName : ""),
      key: "trafficTxt26", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[26].columnName : ""),
      key: "trafficTxt27", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[27].columnName : ""),
      key: "trafficTxt28", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[28].columnName : ""),
      key: "trafficTxt29", type: "nullColumn", align: 'center', className: 'text-right'
    },
    {
      show: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].show : false),
      name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[29].columnName : ""),
      key: "trafficTxt30", type: "nullColumn", align: 'center', className: 'text-right'
    },
  ].filter(item => item.show);

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
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.list },
            fileName: "7.6.3 ข้อมูลปริมาณที่ใช้บริการช่องทาง ETC",
            header: headerExcel,
          });
        },
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
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
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 25,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
          />
        </div>
        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 6,
              TopicText: "7.6.3 ข้อมูลปริมาณที่ใช้บริการช่องทาง ETC"
            }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTrafficEtcByLane);
