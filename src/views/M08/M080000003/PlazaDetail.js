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
import { GET_PLAZA_DETAIL_M080000003 } from "../../../service/api/report";
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
            title: <b>พบบัตร ไม่พบรถ (08)</b>,
            key: "trx08Plaza",
            dataIndex: "trx08Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx08Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
        },
        {
            title: <b>พบบัตรหลายใบ (09)</b>,
            key: "trx09Plaza",
            dataIndex: "trx09Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx09Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ไม่พบบัตร (22)</b>,
            key: "trx22Plaza",
            dataIndex: "trx22Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx22Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Blacklist (26)</b>,
            key: "trx26Plaza",
            dataIndex: "trx26Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx26Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Unlisted (23)</b>,
            key: "trx23Plaza",
            dataIndex: "trx23Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx23Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รถถอยออก (90)</b>,
            key: "trx90Plaza",
            dataIndex: "trx90Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx90Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>เงินไม่พอ (20)</b>,
            key: "trx20Plaza",
            dataIndex: "trx20Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx20Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รวม</b>,
            key: "trxTotalPlaza",
            dataIndex: "trxTotalPlaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trxTotalPlaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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
        documentTitle: ["8.3 รายงานจำนวนรถยนต์ที่ไม่เป็นรายได้จากระบบเก็บค่าผ่านทางอัตโนมัติ (ต่อด่านเก็บค่าผ่านทาง)"],
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
              pathname: `/report-etc-transaction-not-income/lane-detail/${item.seckeyPlaza}`,
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
        trx08Plaza: res.totalTrx08Plaza,
        trx09Plaza: res.totalTrx09Plaza,
        trx22Plaza: res.totalTrx22Plaza,
        trx26Plaza: res.totalTrx26Plaza,
        trx23Plaza: res.totalTrx23Plaza,
        trx90Plaza: res.totalTrx90Plaza,
        trx20Plaza: res.totalTrx20Plaza,
        trxTotalPlaza: res.totalTrxTotalPlaza,
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
        const res = await GET_PLAZA_DETAIL_M080000003(
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
            pathname: `/report-etc-transaction-not-income`,
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
                    TopicText: "8.3 รายงานจำนวนรถยนต์ที่ไม่เป็นรายได้จากระบบเก็บค่าผ่านทางอัตโนมัติ (ต่อด่านเก็บค่าผ่านทาง)"
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
