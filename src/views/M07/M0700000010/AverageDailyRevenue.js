import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
// import { exportExcelJs } from "../../../tools/exceljs";
import moment from 'moment'
import { useReactToPrint } from "react-to-print";
import {
  _exportFileExcel,
  _timeZoneThai, _isEmpty, _isNull, _setYearThai
} from "../../../tools/util";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M070000010 } from "../../../service/api/report";
// import { getTSBList_API } from "../../../service/api/util";
// import { header710 } from "../../../tools/excel/header";
import FormDefault from "../../../components/form/FormDefault";
import PrintReport from "../../../components/print/PrintReport";
const dateFormat = "DD/MM/YYYY";

const AverageDailyRevenue = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [Listlength, setListlength] = useState({ list: [] })
  const [scrollX,
    setScrollX
  ] = useState({})
  const [dataToPrint,
    // setDataToPrint
  ] = useState({})
  // const [tsbList, setTsbList] = useState([]);
  // const [masterPain, setMasterPain] = useState([]);

  const Columns = [
    {
      title: <b>Toll Plaza</b>,
      key: "plaza",
      dataIndex: "plaza",
      align: "center",
      width: 100,
      render: (value) => {
        const obj = {
          children: value,
          props: {}
        };
        if (value !== "") { obj.props.colSpan = 1; obj.props.rowSpan = FindListLength(value); }
        // if(value !== "") {obj.props.colSpan = 1;obj.props.rowSpan = 5;}
        else { obj.props.colSpan = 1; obj.props.rowSpan = 0; }
        return obj;
      }
    },
    {
      title: <b>Date</b>,
      key: "todcount",
      align: 'center',
      children: [
        {
          title: <b>จ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/14/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.cash)}</div>
            }
          ]
        },
        {
          title: <b>อ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/15/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.coupon)}</div>
            }
          ]
        },
        {
          title: <b>พ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/16/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.emv)}</div>
            }
          ]
        },
        {
          title: <b>พฤ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/17/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.qrcode)}</div>
            }
          ]
        },
        {
          title: <b>ศ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/18/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.easypass)}</div>
            }
          ]
        },
        {
          title: <b>ส.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/19/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.mpass)}</div>
            }
          ]
        },
        {
          title: <b>อ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/20/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.mpass)}</div>
            }
          ]
        },
        {
          title: <b>Sub Total</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: <b></b>,
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.mpass)}</div>
            }
          ]
        },
        {
          title: <b>จ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/14/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.cash)}</div>
            }
          ]
        },
        {
          title: <b>อ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/15/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.coupon)}</div>
            }
          ]
        },
        {
          title: <b>พ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/16/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.emv)}</div>
            }
          ]
        },
        {
          title: <b>พฤ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/17/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.qrcode)}</div>
            }
          ]
        },
        {
          title: <b>ศ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/18/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.easypass)}</div>
            }
          ]
        },
        {
          title: <b>ส.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/19/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.mpass)}</div>
            }
          ]
        },
        {
          title: <b>อ.</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: '5/20/2020',
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.mpass)}</div>
            }
          ]
        },
        {
          title: <b>Sub Total</b>,
          key: "sodcount",
          dataIndex: "sodcount",
          align: 'center',
          width: 60,
          children: [
            {
              title: <b></b>,
              key: "",
              dataIndex: "",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text.mpass)}</div>
            }
          ]
        },
      ],
    },
  ]

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
  ];

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["	"],
  });

  useEffect(() => {
    // getTSBList();

    getDataDailyTollCollction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FindListLength = (data) => {
    const result = Listlength && Listlength.list.filter((item) => item.plaza === data)
    return !_isEmpty(result[0]) ? !_isEmpty(result[0].list) ? result[0].list.length : 1 : 1
  }

  // const getTSBList = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getTSBList_API(null, props.auth.token);
  //     if (res.status.code === "S200") {
  //       const painChart = res.list.map((tp) => tp.tsbAbbreviation);
  //       setLoading(false);
  //       setTsbList(res.list);
  //       setMasterPain(painChart);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed to fetch. ",
  //         text: res.status.message,
  //       }).then(async (result) => {
  //         if (result.value) {
  //           setLoading(false);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   const sortData = (res) => {

  //   return { ...res, list:'' }
  // }

  const sortData = (data) => {

    const resultSort = data.list.map((item, idx) => {
      const dataEmp = {
        plaza: data.list[idx].tollplaza
      }
      return [dataEmp, ...item.list]
    })

    const resultExport = resultSort.map((item) => {
      return _isNull(item)
    }).flat(Infinity);

    return { ...data, listData: resultExport}
  }

  const getDataDailyTollCollction = useCallback(async (data = { date: moment("00:00:00", "HH:mm:ss").format("YYYY-MM-DD[T]HH:mm:ss.SSS[+07]") }) => {
    setScrollX({ x: 1300 })
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M070000010({ shiftDate: data.date }, props.auth.token);
      console.log("GET_DATA_INFO_M070000010", res)
      ColumnList(res)
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(sortData(res))
        // setDataSource(res)
        setListlength(res)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      date: moment(_timeZoneThai(value.date)).format("YYYY-MM-DD[T]00:00:00.000[+07]"),
    };
    getDataDailyTollCollction(dataOutput);
  };

  const headerText = [
    { name: "Operational Date", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.date,dateFormat) : "" },
  ];

  const TextBold = (text) => {
    const result = dataSource.list.filter((item) => item.tollplaza === text ? item.tollplaza : null)

    return !_isEmpty(result[0])
      ? <div style={{ textAlign: "left", fontWeight: 'bold',color:'black' }}>{_isNull(result[0].tollplaza)}</div>
      : <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
  }

  const ColumnList = (res) => {
    const obj = !_isEmpty(res.list[0]) ? res.list[0].list[0] : []
    let arr = [];
    for (const [keyTitle] of Object.entries(obj)) {
      if (keyTitle !== 'plaza')
        arr = [...arr, {
          title: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ? 'Sub Total' : moment(keyTitle).format('dd'),
          key: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ? keyTitle : "",
          dataIndex: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ? keyTitle : "",
          align: 'center',
          width: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ? 80 : 60,
          render: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ?
            (text, record) => {
              for (const [,value] of Object.entries(record)) {
                if (value === "Total" || value === "Sub-total") 
                return <div style={{ textAlign: "right", color: 'black' }}><i>{_isNull(text)}</i></div>
                else return <div style={{ textAlign: "right", color: 'black' }}><i>{_isNull(text)}</i></div>
              }
            }
            : null,
          children: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ?
            null : [
              {
                title: keyTitle,
                key: keyTitle,
                dataIndex: keyTitle,
                align: 'center',
                width: 80,
                render: (text, record) => {
                  for (const [,value] of Object.entries(record)) {
                    if (value === "Total" || value === "Sub-total"|| value === "Grand Total") 
                    return <div style={{ textAlign: "right", color: 'black' }}><i>{_isNull(text)}</i></div>
                    else return <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  }
                }
              }
            ]
        }]
    }

    arr = [{
      title: 'Toll Plaza',
      key: 'plaza',
      dataIndex: 'plaza',
      align: 'center',
      width: 150,
      render: (text) => {
        if(text === "Sub-total"||text==="Total"||text==="Grand Total")
        return <div style={{ textAlign: "right", color: 'black' }}><i>{_isNull(text)}</i></div>
        else return TextBold(text)
      }
    },
    {
      title: 'Date',
      key: '',
      dataIndex: '',
      align: 'center',
      width: 80,
      children: [
        ...arr
      ]
    }
    ]
    console.log("arr",arr)
    return arr
  }

  const reforgeHeader = (res,type) => {
    const obj = !_isEmpty(res.list[0]) ? res.list[0].list[0] : []
    let arr = [];
    for (const [keyTitle] of Object.entries(obj)) {
      if (keyTitle !== 'plaza')
        arr = [...arr, {
          name: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ? 'Sub Total' : moment(keyTitle).format('dd'),
          key: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ? keyTitle : "",
          align: 'center',
          type: "nullColumn",
          children: keyTitle === 'subTotal1' || keyTitle === 'subTotal2' ?
            null : [
              {
                name: keyTitle,
                key: keyTitle,
                align: 'center',
                type: "nullColumn",
                width: 80,
              }
            ]
        }]
    }

    const arrExcel = [{
      name: 'Toll Plaza',
      key: 'plaza',
      align: 'center',
      width: 150,
      type: "customColumn",
    },
    ...arr
  ]

  const arrPDF = [{
    name: 'Toll Plaza',
    key: 'plaza',
    align: 'center',
    width: 150,
    className: 'text-left',
    type: "nullColumn",
    textCustom:[{name:'Sub-total',class:'fontBoldPDFRight'},{name:'Total',class:'fontBoldPDFRight'},
      {name:'Original Tollway NB',class:'fontBoldPDF'},{name:'Original Tollway SB',class:'fontBoldPDF'}
      ,{name:'North Extension',class:'fontBoldPDF'}] 
  },
  {
    name: 'Date',
    key: '',
    align: 'center',
    children: [
      ...arr
    ]
  }
]

    console.log("arr pdf",arrPDF)
    console.log("arr arrExcel",arrExcel)
    return type === "excel" ? arrExcel : arrPDF
  }

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
        onClick: () =>
          _exportFileExcel({
            dataSource: {list: dataSource.listData?dataSource.listData:[]},
            fileName: "7.10 Average Daily Revenue",
            header: reforgeHeader(dataSource,'excel'),
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
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
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          // style={{ marginTop: -30 }}
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scrollX}
          columns={!_isEmpty(dataSource.list) ? ColumnList(dataSource) : Columns}
          bordered
          dataSource={dataSource.listData}
          pagination={false}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={{list: dataSource.listData?dataSource.listData:[]}}
          header={reforgeHeader(dataSource,'pdf')}
          propsClass="text-right"
          rowPerPage={15}
          propsHeader={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 6,
            TopicText: "7.10 รายได้เฉลี่ยต่อวัน"
          }}
        />
      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AverageDailyRevenue)
