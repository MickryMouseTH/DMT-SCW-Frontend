import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import {
//   _exportFileExcel,
//   _timeZoneThai,
  _isEmpty,
  _isNull,
} from "../../../tools/util";
import { Table, Button, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { GET_HOUR_DETAIL_M080000003 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDFHour from "./PrintPDFHour";

const HourDetail = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState({ list: [], listFinal: [] });
    const [
        //   scroll
        , setScroll] = useState({});

    useEffect(() => {
        getHourDetail();
        handleOnFinish();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columnsOne = [
        {
            title: <b>Hour</b>,
            key: "hourId",
            dataIndex: "hourId",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.hourId === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>พบบัตร ไม่พบรถ (08)</b>,
            key: "trx08Hour",
            dataIndex: "trx08Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx08Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
        },
        {
            title: <b>พบบัตรหลายใบ (09)</b>,
            key: "trx09Hour",
            dataIndex: "trx09Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx09Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ไม่พบบัตร (22)</b>,
            key: "trx22Hour",
            dataIndex: "trx22Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx22Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Blacklist (26)</b>,
            key: "trx26Hour",
            dataIndex: "trx26Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx26Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Unlisted (23)</b>,
            key: "trx23Hour",
            dataIndex: "trx23Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx23Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รถถอยออก (90)</b>,
            key: "trx90Hour",
            dataIndex: "trx90Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx90Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>เงินไม่พอ (20)</b>,
            key: "trx20Hour",
            dataIndex: "trx20Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx20Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รวม</b>,
            key: "trxTotalHour",
            dataIndex: "trxTotalHour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trxTotalHour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
    ];

    const fields = [];

    // const header81 = [
    //     { name: "Hour", key: "hourId", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "M-Pass", key: "mpassHourTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "EasyPass", key: "easyPassHourTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "Total Traffic", key: "totalHourTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
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

    const addIndex = (res) => {

        const totalAll = {
            hourId: 'Total',
            trx08Hour: res.totalTrx08Hour,
            trx09Hour: res.totalTrx09Hour,
            trx22Hour: res.totalTrx22Hour,
            trx26Hour: res.totalTrx26Hour,
            trx23Hour: res.totalTrx23Hour,
            trx90Hour: res.totalTrx90Hour,
            trx20Hour: res.totalTrx20Hour,
            trxTotalHour: res.totalTrxTotalHour,
        }
        

        return { ...res,
            list: [...res.list, totalAll],  
            listFinal: [...res.listFinal, totalAll],
            listExport: [...res.list, totalAll]
        }
    }

    const getHourDetail = async () => {
        try {
            setScroll({ x: 1300, y:500 });
            setLoading(true);
            const body = {
                seckeyLane: `${props.match.params.id}`,
            };
            const res = await GET_HOUR_DETAIL_M080000003(
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

    const handleOnFinish = (value) => {

    };

    const headerText = [
        { name: "ด่าน", value: dataSource.headerHourPlaza },
        { name: "ช่องทาง", value: dataSource.headerHourLane },
        { name: "วันที่ดำเนินการ", value: dataSource.headerHourDate },
    ];

    const goBack = () => {
        props.history.push({
            pathname: `/report-etc-transaction-not-income/lane-detail/${dataSource.backLanePath}`,
            value: props.location.value
        });
    }

    const check = () => {
        console.log(dataSource)
    }

    return (
        <Skeleton loading={loading} active>
            <Row className='d-flex justify-content-between mt-5'>
            <Col>
                <Row className='d-flex mt-5'>
                <h3 onClick={check}>
                    {"ข้อมูลของช่องทาง "}
                    {`${dataSource.headerHour ? dataSource.headerHour : ""}`}{" "}
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
                <PrintPDFHour
                ref={printReportRef}
                dataSource={dataSource.listFinal}
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
)(HourDetail);
