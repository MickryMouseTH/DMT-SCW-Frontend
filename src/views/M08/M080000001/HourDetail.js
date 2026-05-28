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
import { GET_HOUR_DETAIL_M080000001 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDFHour from "./PrintPDFHour";

const HourDetail = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState({ list: [] });
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
            title: <b>M-Pass</b>,
            key: "mpassHourTraffic",
            dataIndex: "mpassHourTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }}  >{_isNull(value)}</div>,
                props: {}
                };
                if (row.mpassHourTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>EasyPass</b>,
            key: "easyPassHourTraffic",
            dataIndex: "easyPassHourTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }}  >{_isNull(value)}</div>,
                props: {}
                };
                if (row.easyPassHourTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Total Traffic</b>,
            key: "totalHourTraffic",
            dataIndex: "totalHourTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }}  >{_isNull(value)}</div>,
                props: {}
                };
                if (row.totalHourTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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
            mpassHourTraffic: res.totalHourMPass,
            easyPassHourTraffic: res.totalHourEasyPass,
            totalHourTraffic: res.totalHourTraffic,
        }
        

        return { ...res,
            list: [...res.list, totalAll],  
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
            const res = await GET_HOUR_DETAIL_M080000001(
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
            pathname: `/traffic-by-etc/lane-detail/${dataSource.backLanePath}`,
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
                <PrintPDFHour
                ref={printReportRef}
                dataSource={dataSource.list}
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
)(HourDetail);
