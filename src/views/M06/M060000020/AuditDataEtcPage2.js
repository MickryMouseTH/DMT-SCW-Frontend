/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading";
import { GET_DATA_OVERDUE_M060000020, DOWNLOAD_FILE_EXCEL_M060000020 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";

const { Text } = Typography;

const AuditDataEtc = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ลำดับ",
      fixed: true,
      key: "order",
      dataIndex: "order",
      width: 30,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่เวลาผ่านทาง",
      key: "trxDatetime",
      dataIndex: "trxDatetime",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ด่าน",
      dataIndex: "plazaName",
      key: "plazaName",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ช่องทาง",
      dataIndex: "laneName",
      key: "laneName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ประเภทการจ่าย",
      dataIndex: "paymentMethodName",
      key: "paymentMethodName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "PAN",
      dataIndex: "pan",
      key: "pan",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "fareAmount",
      key: "fareAmount",
      width: 50,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  useEffect(() => {
    setScroll({ x: 1500, y: 600 });
    getDataInfo(props.location.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_OVERDUE_M060000020(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
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

  const goBack = () => {
    props.history.push({
      pathname: `/reports/audit-data-etc`,
      value: props.location.value
    });
  }

  const handleDownload = async () => {
    try {
      await DOWNLOAD_FILE_EXCEL_M060000020(dataSource, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Skeleton loading={loading} active>
      <div>
        <Col>
          <Row className='d-flex mt-5'>
            <h3>
              {" "}
              {`${dataSource.header ? dataSource.header : ""}`}{" "}
            </h3>
          </Row>
          <Row className='d-flex justify-content-between mt-5'>
            <Col>
              <Button onClick={goBack}>
                Back
              </Button>
            </Col>
            <Col>
              <Row className='d-flex justify-content-end mt-5 mb-5'>
                <Button onClick={handleDownload}>
                  Export Excel
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            // scroll={scroll}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            // pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={6} className="text-right" index={1}>
                      <Text>รวมทั้งหมด</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.trxEasypassTotal)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={2} className="text-center" index={1}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={1}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={3} className="text-left" index={1}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
    </Skeleton >
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditDataEtc);
