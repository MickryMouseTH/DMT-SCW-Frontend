/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004I } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI } from "../../../service/api/util";
import PrintReport from "./PrintReport";

const TrafficVolumeOnTollwayReport = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [yearList, setYearList] = useState([]);
  // ----- Fields search ------ //

  const fields = [
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
    },
  ];

  const columns = [
    {
      title: "Period",
      fixed: true,
      key: "period",
      dataIndex: "period",
      width: 100,
      align: "center",
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Class of Traffic",
      fixed: true,
      key: "classOfTraffic",
      dataIndex: "classOfTraffic",
      align: 'center',
      width: 50,
      render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
    },
    {
      title: "Toll Plaza",
      align: 'center',
      children: [
        {
          title: "Original Tollway Northbound",
          align: 'center',
          children: [
            {
              title: "Din Daeng",
              key: "nbDinDaeng",
              dataIndex: "nbDinDaeng",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Sutthisan",
              key: "nbSutthisan",
              dataIndex: "nbSutthisan",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "LP (N)",
              key: "nbLpn",
              dataIndex: "nbLpn",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Ratchada Pisek",
              key: "nbRatchadaPisek",
              dataIndex: "nbRatchadaPisek",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Bangkhen",
              key: "nbBangkhen",
              dataIndex: "nbBangkhen",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "Total NB",
          key: "nbTotal",
          dataIndex: "nbTotal",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "Original Tollway Southbound",
          align: 'center',
          children: [
            {
              title: "Don Muang",
              key: "sbDonMuang",
              dataIndex: "sbDonMuang",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Laksi",
              key: "sbLaksi",
              dataIndex: "sbLaksi",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "CW",
              key: "sbCw",
              dataIndex: "sbCw",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "LP (S)",
              key: "sbLps",
              dataIndex: "sbLps",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "Total SB",
          key: "sbTotal",
          dataIndex: "sbTotal",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "Total NB & SB",
          key: "nbSbTotal",
          dataIndex: "nbSbTotal",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        }, {
          title: "Northern Extension",
          align: 'center',
          children: [
            {
              title: "Anusorn Sathan NB",
              key: "neAnusornSathan",
              dataIndex: "neAnusornSathan",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Don Muang SB",
              key: "neDonMuang",
              dataIndex: "neDonMuang",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Total NB&SB TN + TS",
              key: "neTotal",
              dataIndex: "neTotal",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "Laksi NB",
              key: "neLaksi",
              dataIndex: "neLaksi",
              align: 'center',
              width: 60,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
      ],
    },
  ];

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

  const headerText = [
    { name: "ปี", value: dataToPrint.DataList ? String(dataToPrint.yearId) : "" },
  ];

  useEffect(() => {
    setScroll({ x: 2500 });
    getYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addIndex = (res) => {
    // const list = res.list.map((item, index) => {
    //   return { ...item, index: index + 1 }
    // })
    return {
      ...res,
      listExport: [...res.list]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004I(data, props.auth.token);
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
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    setDataToPrint(
      {
        DataList,
        yearId: year ? year.yearId : "",
      })
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      yearId: value.yearId === "" ? null : value.yearId,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.4.9 TRAFFIC VOLUME ON TOLLWAY"],
  });

  const headerExcel = [
    { name: "Period", key: "period", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Class of Traffic", key: "classOfTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Din Daeng", key: "nbDinDaeng", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Sutthisan", key: "nbSutthisan", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "LP (N)", key: "nbLpn", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Ratchada Pisek", key: "nbRatchadaPisek", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Bangkhen", key: "nbBangkhen", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total NB", key: "nbTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Don Muang", key: "sbDonMuang", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Laksi", key: "sbLaksi", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "CW", key: "sbCw", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "LP (S)", key: "sbLps", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total SB", key: "sbTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total NB & SB", key: "nbSbTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Anusorn Sathan NB", key: "neAnusornSathan", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Don Muang SB", key: "neDonMuang", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total NB&SB TN + TS", key: "neTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Laksi NB", key: "neLaksi", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

  const headerPDF = [
    { name: "Period", key: "period", type: "nullColumn", align: 'center', className: 'text-center', width: 70 },
    { name: "Class of Traffic", key: "classOfTraffic", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
    { name: "Din Daeng", key: "nbDinDaeng", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Sutthisan", key: "nbSutthisan", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "LP (N)", key: "nbLpn", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Ratchada Pisek", key: "nbRatchadaPisek", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Bangkhen", key: "nbBangkhen", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total NB", key: "nbTotal", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Don Muang", key: "sbDonMuang", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Laksi", key: "sbLaksi", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "CW", key: "sbCw", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "LP (S)", key: "sbLps", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total SB", key: "sbTotal", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total NB & SB", key: "nbSbTotal", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Anusorn Sathan NB", key: "neAnusornSathan", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Don Muang SB", key: "neDonMuang", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total NB&SB TN + TS", key: "neTotal", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Laksi NB", key: "neLaksi", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
  ]

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
            dataSource: { list: dataSource.listExport },
            fileName: "7.4.9 TRAFFIC VOLUME ON TOLLWAY",
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
            pagination={false}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.listExport ? dataSource.listExport.length : 0)),
            }}
            header={headerPDF}
            footer={[]}
            propsHeader={{
              headerText,
              TopicText: "7.4.9 TRAFFIC VOLUME ON TOLLWAY",
            }}
            columnPerPage={headerPDF.length}
            // propsClass="print-border-footer"
            rowPerPage={30} //จำนวนเเถวในเเต่ละหน้าของข้อมูล เมื่อ ปริ้น PDF default คือ 10 หากไม่ได้ใส่
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
)(TrafficVolumeOnTollwayReport);
