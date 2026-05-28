import React, { useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  _timeZoneThai,
  _isEmpty,
} from "../../../tools/util";
import { Typography, Table, Button } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { CREATE_FILE_M080000013, DOWNLOAD_FILE_M080000013 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const ReportEtcForTaxInvoice = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});

  const columnsOne = [
    {
      title: <b>No.</b>,
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>File</b>,
      key: "fileName",
      dataIndex: "fileName",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-left">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>ดาวน์โหลด</b>,
      key: "pathName",
      dataIndex: "pathName",
      align: 'center',
      width: 60,
      render: (text, record) => (
        _isEmpty(record.pathName) ? "" : <Button size="small" onClick={() => handleDownload(record)}>ดาวน์โหลด</Button>
      ),
    },
  ];

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่ !" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.date
      },
    }
  ];


  const handleDownload = async (item) => {
    if (item.pathName) {
      const sendItem = {
        fileName: item.fileName,
        pathName: item.pathName,
      };
      try {
        await DOWNLOAD_FILE_M080000013(sendItem, props.auth.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have file",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const addIndex = (res) => {

    return {
      ...res,
      listExport: [...res.list,]
    }
  }

  const getDataList = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await CREATE_FILE_M080000013(dataOutput, props.auth.token);
      console.log("res 8.13", res);
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
    setInitialValue(value);
    const dataOutput = {
      date: _timeZoneThai(value.date),
    };
    getDataList(dataOutput);
  };

  
  const action = [
    {
    }
  ];

  return (
    <Skeleton loading={loading} active>

      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="สร้างไฟล์"
        onFinish={handleOnFinish}
        action={action}
      />
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsOne}
          bordered
          dataSource={dataSource.list}
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
)(ReportEtcForTaxInvoice);
