/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table, Popconfirm, Tooltip } from "antd";
import Skeleton from "../../../components/loading/Loading";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_LIST_TRX_M080000021, SAVE_CANCEL_M080000021 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import {
  CloseOutlined,
} from "@ant-design/icons";


const dateFormat = "DD/MM/YYYY";
const dateFormatTrx = "DD/MM/YYYY HH:mm";
const { Text } = Typography;

const RefundEtcPage2 = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [initialValue, setInitialValue] = useState({});

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกจากวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกจากวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.startDate,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกถึงวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกถึงวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.endDate,
      },
    },
    {
      type: "input",
      option: {
        name: "pan",
        label: "หมายเลข PAN",
        childrenProps: { placeholder: "PAN..." },
        rules: [{ required: true, message: "กรุณาป้อน PAN!" }],
        initialValue: initialValue.pan,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "Plaza",
      fixed: true,
      key: "plazaName",
      dataIndex: "plazaName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Lane",
      fixed: true,
      key: "laneName",
      dataIndex: "laneName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่เวลาผ่านทาง",
      key: "trxDate",
      dataIndex: "trxDate",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormatTrx))}
        </div>
      ),
    },
    {
      title: "PAN",
      dataIndex: "pan",
      key: "pan",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
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
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 80,
      align: "center",
      render: (text, record) => (
        <span>

          <Tooltip title="ยกเลิก">
            <Popconfirm
              title="Sure to delete?"
              placement="topRight"
              onConfirm={() => handleCancel(record)}
            >
              <Button
                size="small"
                type="primary"
                ghost="true"
                icon={<CloseOutlined />}
                className="del-button mr-5"
              >
                ยกเลิก
              </Button>
            </Popconfirm>
          </Tooltip>

        </span>
      ),
    },
  ];

  useEffect(() => {
    setScroll({ x: 1500, y: 600 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = async (data) => {
    try {
      setLoading(true);
      const res = await SAVE_CANCEL_M080000021(data, props.auth.token);
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "ยกเลิกสำเร็จ! ",
        });
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

  const handleOnFinish = (value) => {
    setInitialValue(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      pan: value.pan,
    };
    getDataInfo(dataOutput);
  };

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_LIST_TRX_M080000021(data, props.auth.token);
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
      pathname: `/reports/refund-etc`,
      value: props.location.value
    });
  }

  const action = [
    {
      name: "Back",
      props: {
        type: "ghost",
        ghost: false,
        onClick: goBack,
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
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
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
)(RefundEtcPage2);
