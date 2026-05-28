import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  // _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M080000001 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const TrafficByEtcReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [], listFinal: [] });
  const [initialValue, setInitialValue] = useState({});
  const [
    //   scroll
    , setScroll] = useState({});
  const [tsbList, setTsbList] = useState([]);
  const [ dataToPrint, setDataToPrint] = useState({});
  
  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        tsbId:
          props.location.value.tsbId === 0
            ? null
            : props.location.value.tsbId,
      };
      getDataDailyTollCollction(dataOutput);
    }
    getTSBList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
        title: <b>Date</b>,
        key: "dateString",
        dataIndex: "dateString",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
              props: {}
            };
            if (row.dateString === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>M-Pass</b>,
        key: "mpassTraffic",
        dataIndex: "mpassTraffic",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.dateString === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
              props: {}
            };
            if (row.mpassTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>EasyPass</b>,
        key: "easyPassTraffic",
        dataIndex: "easyPassTraffic",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.dateString === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
              props: {}
            };
            if (row.easyPassTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
    {
        title: <b>Total Traffic</b>,
        key: "totalTraffic",
        dataIndex: "totalTraffic",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
            const obj = {
              children: row.dateString === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
              props: {}
            };
            if (row.totalTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
    },
  ];

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate
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
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate
      },
    },
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...tsbList],
            keyName: "tsbNameTh",
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
  ];

// const header81 = [
//     { name: "Date", key: "dateString", type: "nullColumn", align: 'center', className: 'text-center' },
//     { name: "M-Pass", key: "mpassTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
//     { name: "EasyPass", key: "easyPassTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
//     { name: "Total Traffic", key: "totalTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
//   ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.1 Number of vehicles that are paid using DSRC OBU"],
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
    // {
    //   name: "ส่งออก",
    //   props: {
    //     type: "primary",
    //     onClick: () => {
    //         _exportFileExcel({
    //             dataSource: { list: dataSource.listExport},
    //             fileName: "8.1 Number of vehicles that are paid using DSRC OBU",
    //             header: header81,
    //         });
    //     },
    //   },
    // },
  ];

  const handleDetail = async (item) => {
    if (item.seckey) {
      try {
        await props.history.push({
          pathname: `/traffic-by-etc/plaza-detail/${item.seckey}`,
          value: initialValue,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't select this row",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const getTSBList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setTsbList(res.list);
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

    const totalAll = {
        dateString: 'Total',
        mpassTraffic: res.sumTotalMPass,
        easyPassTraffic: res.sumTotalEasyPass,
        totalTraffic: res.sumTotalTraffic,
    }
    

    return { ...res,
        list: [...res.list, totalAll],
        listFinal: [...res.listFinal, totalAll],     
        listExport: [...res.list, totalAll]
    }
  }

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000001(dataOutput, props.auth.token);
      console.log("res 8.1", res);
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
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
    console.log("Print -> ",DataList)
  };

  // const handleOnFinish = (value) => {
  //   handleChangeIdToName(value);
  //   setInitialValue(value);

  //   const dataOutput = {
  //     startDate: _timeZoneThai(value.startDate),
  //     endDate: _timeZoneThai(value.endDate),
  //     plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
  //     laneId: _isEmpty(value.laneId) ? null : value.laneId,
  //   };
  //   getDataDailyTollCollction(dataOutput);
  // };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 31) {
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      };
      getDataDailyTollCollction(dataOutput);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch. ",
        text: "Start date and End date out of lenght 31 days",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.tsbName ? dataToPrint.tsbName : "" },
    { name: "วันที่ดำเนินการ", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY") : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY") : "", }
  ];

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
      <div className={_isEmpty(dataSource.listFinal) ? "mt-10" : "mt-0"}>
        <Table
            size="small"
            rowKey={(row, ind) => ind}
            columns={columnsOne}
            bordered
            dataSource={dataSource.listFinal}
            pagination={false}
        />
      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource.listFinal}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "8.1 ปริมาณรถผ่านทางแบบ ETC"
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
)(TrafficByEtcReport);
