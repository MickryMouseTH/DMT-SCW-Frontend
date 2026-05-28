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
import { GET_LANE_DETAIL_M080000002 } from "../../../service/api/report";
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
            title: <b>M-Pass</b>,
            key: "mpassLaneTraffic",
            dataIndex: "mpassLaneTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.mpassLaneTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>EasyPass</b>,
            key: "easyPassLaneTraffic",
            dataIndex: "easyPassLaneTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.easyPassLaneTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Total Traffic</b>,
            key: "totalLaneTraffic",
            dataIndex: "totalLaneTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.totalLaneTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>M-Pass revenue</b>,
            key: "mpassLaneRevenue",
            dataIndex: "mpassLaneRevenue",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                  props: {}
                };
                if (row.mpassLaneRevenue === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
          },
          {
            title: <b>EasyPass revenue</b>,
            key: "easyPassLaneRevenue",
            dataIndex: "easyPassLaneRevenue",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                  props: {}
                };
                if (row.easyPassLaneRevenue === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
          },
          {
            title: <b>Total revenue</b>,
            key: "totalLaneRevenue",
            dataIndex: "totalLaneRevenue",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => handleDetail(row)} >{_isNull(value)}</div>,
                  props: {}
                };
                if (row.totalLaneRevenue === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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
        if (item.seckeyLane) {
        try {
            await props.history.push({
              pathname: `/traffic-and-revenue-by-etc/hour-detail/${item.seckeyLane}`,
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
        mpassLaneTraffic: res.totalLaneMPass,
        easyPassLaneTraffic: res.totalLaneEasyPass,
        totalLaneTraffic: res.totalLaneTraffic,
        mpassLaneRevenue: res.totalLaneMPassRevenue,
        easyPassLaneRevenue: res.totalLaneEasyPassRevenue,
        totalLaneRevenue: res.totalLaneRevenue,
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
        const res = await GET_LANE_DETAIL_M080000002(
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
            pathname: `/traffic-and-revenue-by-etc/plaza-detail/${dataSource.backPlazaPath}`,
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
)(LaneDetail);
