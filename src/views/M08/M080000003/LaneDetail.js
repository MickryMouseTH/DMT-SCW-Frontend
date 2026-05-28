import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
// import moment from "moment";
import { useReactToPrint } from "react-to-print";
import {
//   _exportFileExcel,
//   _timeZoneThai,
  _isEmpty,
  _isNull,
} from "../../../tools/util";
import { Table, Button, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { GET_LANE_DETAIL_M080000003 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDFLane from "./PrintPDFLane";

const LaneDetail = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState({ list: [] });
    const [initialValue, 
        // setInitialValue
    ] = useState({});
    const [
        //   scroll
        , setScroll] = useState({});


    useEffect(() => {
        getLaneDetail();
        handleOnFinish();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columnsOne = [
        {
            title: <b>Lane</b>,
            key: "laneName",
            dataIndex: "laneName",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.laneName === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.laneName === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>พบบัตร ไม่พบรถ (08)</b>,
            key: "trx08Lane",
            dataIndex: "trx08Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx08Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
        },
        {
            title: <b>พบบัตรหลายใบ (09)</b>,
            key: "trx09Lane",
            dataIndex: "trx09Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx09Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ไม่พบบัตร (22)</b>,
            key: "trx22Lane",
            dataIndex: "trx22Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx22Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Blacklist (26)</b>,
            key: "trx26Lane",
            dataIndex: "trx26Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx26Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Unlisted (23)</b>,
            key: "trx23Lane",
            dataIndex: "trx23Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx23Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รถถอยออก (90)</b>,
            key: "trx90Lane",
            dataIndex: "trx90Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx90Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>เงินไม่พอ (20)</b>,
            key: "trx20Lane",
            dataIndex: "trx20Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx20Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รวม</b>,
            key: "trxTotalLane",
            dataIndex: "trxTotalLane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trxTotalLane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
    ];

    const fields = [];

    // const header81 = [
    //     { name: "Lane", key: "laneName", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "M-Pass", key: "mpassLaneTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "EasyPass", key: "easyPassLaneTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
    //     { name: "Total Traffic", key: "totalLaneTraffic", type: "nullColumn", align: 'center', className: 'text-center' },
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
        if (item.seckeyLane) {
        try {
            await props.history.push({
              pathname: `/report-etc-transaction-not-income/hour-detail/${item.seckeyLane}`,
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
        laneName: 'Total',
        trx08Lane: res.totalTrx08Lane,
        trx09Lane: res.totalTrx09Lane,
        trx22Lane: res.totalTrx22Lane,
        trx26Lane: res.totalTrx26Lane,
        trx23Lane: res.totalTrx23Lane,
        trx90Lane: res.totalTrx90Lane,
        trx20Lane: res.totalTrx20Lane,
        trxTotalLane: res.totalTrxTotalLane,
    }
    

    return { ...res,
        list: [...res.list, totalAll],  
        listExport: [...res.list, totalAll]
    }
  }

  const getLaneDetail = async () => {
    try {
        setScroll({ x: 1300, y:500 });
        setLoading(true);
        const body = {
          seckeyPlaza: `${props.match.params.id}`,
        };
        const res = await GET_LANE_DETAIL_M080000003(
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
        { name: "ด่าน", value: dataSource.headerLanePlaza },
        { name: "วันที่ดำเนินการ", value: dataSource.headerLaneDate }
    ];

    const goBack = () => {
        props.history.push({
            pathname: `/report-etc-transaction-not-income/plaza-detail/${dataSource.backPlazaPath}`,
            value: props.location.value
        });
    }

  return (
    <Skeleton loading={loading} active>
         <Row className='d-flex justify-content-between mt-5'>
          <Col>
            <Row className='d-flex mt-5'>
              <h3 onClick={check}>
                {"ข้อมูลของด่าน "}
                {`${dataSource.headerLane ? dataSource.headerLane : ""}`}{" "}
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
            <PrintPDFLane
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
)(LaneDetail);

