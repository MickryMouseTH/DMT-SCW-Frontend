import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import {
//   _exportFileExcel,
//   _timeZoneThai,
  _isEmpty,
  _isNull,
} from "../../../tools/util";
import { Table, Button, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { GET_PLAZA_DETAIL_M080000002 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDFPlaza from "./PrintPDFPlaza";

const PlazaDetail = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState({ list: [] });
    const [initialValue, 
        // setInitialValue
    ] = useState({});
    const [
        //   scroll
        , setScroll] = useState({});


    useEffect(() => {
        getPlazaDetail();
        handleOnFinish();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columnsOne = [
        {
            title: <b>Plaza</b>,
            key: "tsbName",
            dataIndex: "tsbName",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.tsbName === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>M-Pass</b>,
            key: "mpassPlazaTraffic",
            dataIndex: "mpassPlazaTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.mpassPlazaTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>EasyPass</b>,
            key: "easyPassPlazaTraffic",
            dataIndex: "easyPassPlazaTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.easyPassPlazaTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Total Traffic</b>,
            key: "totalPlazaTraffic",
            dataIndex: "totalPlazaTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.totalPlazaTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>M-Pass revenue</b>,
            key: "mpassPlazaRevenue",
            dataIndex: "mpassPlazaRevenue",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                  props: {}
                };
                if (row.mpassPlazaRevenue === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
          },
          {
            title: <b>EasyPass revenue</b>,
            key: "easyPassPlazaRevenue",
            dataIndex: "easyPassPlazaRevenue",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                  props: {}
                };
                if (row.easyPassPlazaRevenue === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
          },
          {
            title: <b>Total revenue</b>,
            key: "totalPlazaRevenue",
            dataIndex: "totalPlazaRevenue",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                  props: {}
                };
                if (row.totalPlazaRevenue === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
          },
    ];

    const fields = [];

    // const header81 = [
    //     { name: "Plaza", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "M-Pass", key: "mpassPlazaTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "EasyPass", key: "easyPassPlazaTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "Total Traffic", key: "totalPlazaTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    // ]

    const handlePrintFile = () => {
        handlePrint();
    };

    const printReportRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printReportRef.current,
        documentTitle: ["8.2 Revenue by ETC"],
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
        //     name: "ส่งออก",
        //     props: {
        //         type: "primary",
        //         onClick: () => {
        //             _exportFileExcel({
        //                 dataSource: { list: dataSource.listExport},
        //                 fileName: "8.1 Number of vehicles that are paid using DSRC OBU",
        //                 header: header81,
        //             });
        //         },
        //     },
        // },
    ];

    const handleDetail = async (item) => {
        if (item.seckeyPlaza) {
        try {
            await props.history.push({
              pathname: `/traffic-and-revenue-by-etc/lane-detail/${item.seckeyPlaza}`,
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

  const addIndex = (res) => {

    const totalAll = {
        tsbName: 'Total',
        mpassPlazaTraffic: res.totalPlazaMPass,
        easyPassPlazaTraffic: res.totalPlazaEasyPass,
        totalPlazaTraffic: res.totalPlazaTraffic,
        mpassPlazaRevenue: res.totalPlazaMPassRevenue,
        easyPassPlazaRevenue: res.totalPlazaEasyPassRevenue,
        totalPlazaRevenue: res.totalPlazaRevenue,
    }
    

    return { ...res,
        list: [...res.list, totalAll],  
        listExport: [...res.list, totalAll]
    }
  }

  const getPlazaDetail = async () => {
    try {
        setScroll({ x: 1300, y:500 });
        setLoading(true);
        const body = {
          seckey: `${props.match.params.id}`,
        };
        const res = await GET_PLAZA_DETAIL_M080000002(
          body,
          props.auth.token
        );
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

    const check = () => {
        console.log(dataSource);
    }

    const handleOnFinish = (value) => {

    };

    const headerText = [
        { name: "ด่าน", value: dataSource.headerPlazaName },
        { name: "วันที่ดำเนินการ", value: dataSource.headerPlazaDate }
    ];

    const goBack = () => {
        props.history.push({
            pathname: `/traffic-and-revenue-by-etc`,
            value: {
              startDate: moment(`${dataSource.startDatePath}`, "DD MM YYYY HH:mm:ss", "Asia/Bangkok"),
              endDate: moment(`${dataSource.endDatePath}`, "DD MM YYYY HH:mm:ss", "Asia/Bangkok"),
              tsbId: dataSource.tsbPath
            },
        });
    }

  return (
    <Skeleton loading={loading} active>
         <Row className='d-flex justify-content-between mt-5'>
          <Col>
            <Row className='d-flex mt-5'>
              <h3 onClick={check}>
                {"ข้อมูลวันที่ : "}
                {`${dataSource.headerPlaza ? dataSource.headerPlaza : ""}`}{" "}
              </h3>
            </Row>
            <Row className='d-flex mt-5'>
              <Button onClick={goBack}>
                Back
            </Button>
            </Row>
          </Col>
          <Col>
            <Row className='mr-90'>
              <FormDefault
                buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
                formWrapper={{ md: 24, lg: 19, xl: 21 }}
                typeButton="primary"
                submitText=""
                fields={fields}
                onFinish={handleOnFinish}
                action={action}
              />
            </Row>
          </Col>
        </Row>
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
            <Table
                size="small"
                rowKey={(row, ind) => ind}
                columns={columnsOne}
                bordered
                dataSource={dataSource.list}
                pagination={false}
            />
        </div>
        <div className="d-none">
            <PrintPDFPlaza
                ref={printReportRef}
                dataSource={dataSource.list}
                HeaderBar={{
                    headerText,
                    position: "d-flex justify-content-start",
                    colSpan: 5,
                    TopicText: "8.2 รายได้จากระบบเก็บค่าผ่านทางอัตโนมัติ"
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
)(PlazaDetail);