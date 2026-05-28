/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography } from "antd";
import Skeleton from "../../../components/loading/Loading";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { SAVE_CUSTOMER_M080000022 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";


const RecordCustomerInformationTaxPage2 = (props) => {

  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [customerTypeList, setCustomerTypeList] = useState([]);

  const fields = [
    {
      type: "select",
      option: {
        name: "customerType",
        label: "CUSTOMER TYPE",
        childrenProps: {
          placeholder: "เลือก CUSTOMER TYPE...",
          optionValue: {
            values: [...customerTypeList],
            keyValue: "customerType",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือก CUSTOMER TYPE!",
          },
        ],
        initialValue: initialValue.customerType ? initialValue.customerType : "",
      },
    },
    {
      type: "input",
      option: {
        name: "sapId",
        label: "รหัสลูกค้า SAP",
        childrenProps: { placeholder: "รหัสลูกค้า SAP..." },
        rules: [{ required: true, message: "กรุณาป้อน รหัสลูกค้า SAP!" }],
        initialValue: initialValue.sapId,
      },
    },
    {
      type: "input",
      option: {
        name: "taxNo",
        label: "หมายเลขประจำตัวผู้เสียภาษี",
        childrenProps: { placeholder: "รหัสลูกค้า หมายเลขประจำตัวผู้เสียภาษี..." },
        rules: [
          { required: true, message: "กรุณาป้อน หมายเลขประจำตัวผู้เสียภาษี!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.taxNo,
      },
    },
    {
      type: "input",
      option: {
        name: "branchNo",
        label: "สาขา",
        childrenProps: { placeholder: "สาขา..." },
        rules: [
          { required: false, message: "กรุณาป้อน สาขา!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.branchNo,
      },
    },
  ];

  useEffect(() => {
    setCustomerTypeList(["บุคคลธรรมดา", "นิติบุคคล"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      customerType: value.customerType === "บุคคลธรรมดา" ? "P" : "C",
      sapId: value.sapId,
      taxNo: value.taxNo,
      branchNo: value.branchNo,
    };
    saveCustomer(dataOutput);
  };

  const saveCustomer = async (data = null) => {
    try {
      setLoading(true);
      const res = await SAVE_CUSTOMER_M080000022(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        goBack();
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
      pathname: `/reports/record-customer-information-tax`,
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
          submitText="เพิ่มลูกค้า"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
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
)(RecordCustomerInformationTaxPage2);
