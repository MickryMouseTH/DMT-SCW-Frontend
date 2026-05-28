/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Row, Upload, message } from "antd";
import Skeleton from "../../../components/loading/Loading"
import FormDefault from "../../../components/form/FormDefault/FormDefault";

import { UploadOutlined } from '@ant-design/icons';
import { GET_DATA_INFO_M050000006 } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero } from "../../../tools/util";

const { Text } = Typography;

const CheckBalanceEtc = (props) => {
  const [loading, setLoading] = useState(false);
  const [obuTypeList, setObuTypeList] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceTime, setBalanceTime] = useState('');
  const [initialValue, setInitialValue] = useState({});


  useEffect(() => {
    setObuTypeList(["M-Pass", "Easy-Pass"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fields = [

    {
      type: "select",
      option: {
        name: "obuTypeId",
        label: "ประเภท OBU",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...obuTypeList],
            keyValue: "obuTypeId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.obuTypeId,
      },
    },
    {
      type: "input",
      option: {
        name: "pan",
        label: "หมายเลขบัตร (PAN)",
        childrenProps: { placeholder: "ป้อนหมายเลข (PAN)...", maxLength: "" },
        rules: [
          {
            required: false,
            message: "กรุณาป้อนหมายเลข (PAN)!"
          }
        ],
        initialValue: initialValue.pan,
      },
    },
    {
      type: "input",
      option: {
        name: "smartcard",
        label: "หมายเลข (S/N)",
        childrenProps: { placeholder: "ป้อนหมายเลข (S/N)...", maxLength: "" },
        rules: [
          {
            required: false,
            message: "กรุณาป้อนหมายเลข (S/N)!"
          }
        ],
        initialValue: initialValue.smartcard,
      },
    },
    {
      type: "input",
      option: {
        name: "taxId",
        label: "Tax ID",
        childrenProps: { placeholder: "ป้อนหมายเลข (Tax ID)...", maxLength: "" },
        rules: [
          {
            required: false,
            message: "กรุณาป้อนหมายเลข (Tax ID)!"
          }
        ],
        initialValue: initialValue.taxId,
      },
    }
  ];

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      obuTypeId: value.obuTypeId === "ทั้งหมด" ? null : value.obuTypeId === "M-Pass" ? 1 : 2,
      pan: value.pan,
      smartcard: value.smartcard,
      taxId: value.taxId
    };
    getDataInfo(dataOutput);
  };


  const getDataInfo = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M050000006(dataOutput, props.auth.token);
      console.log("res 5.6", res);
      if (res.status.code === "S200") {
        setLoading(false);
        setBalanceAmount(res.balanceAmount);
        setBalanceTime(res.balanceTime);
        if (res.balanceAmount === "") {
          Swal.fire({
            icon: "error",
            title: "Not found data. ",
            text: "ไม่พบข้อมูลผู้ใช้",
          }).then(async (result) => {
            if (result.value) {
              setLoading(false);
            }
          });
        }
      } else {
        setBalanceAmount("");
        setBalanceTime("");
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

  const action = [
    {}
  ];

  return (
    <Skeleton loading={loading} active>

      <FormDefault
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
        fields={fields}
        onFinish={handleOnFinish}
        action={action}
      />

      <Row className='d-flex justify-content-left mt-10'>
        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>ยอดเงินคงเหลือ ( DC DATABASE )</Text>
      </Row>
      <div className='border text-center' style={{ paddingTop: '3px', height: '180px', marginRight: '10px' }}>
        <Row className='d-flex justify-content-center align-items-center mt-20 mb-20'>
          <Text style={{ fontSize: '80px', marginRight: '10px' }}>{balanceAmount}</Text>
        </Row>
      </div>
      <div className='border text-center' style={{ paddingTop: '3px', height: '100px', marginRight: '10px' }}>
        <Row className='d-flex justify-content-center align-items-center mt-20 mb-20'>
          <Text style={{ fontSize: '35px', marginRight: '10px' }}>{balanceTime}</Text>
        </Row>
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
)(CheckBalanceEtc);
