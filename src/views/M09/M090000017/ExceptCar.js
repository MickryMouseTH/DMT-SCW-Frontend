/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import Skeleton from "../../../components/loading/Loading"
import {
  AppstoreAddOutlined,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import FormDefault from "../../../components/form/FormDefault";
import {
  GET_DATA_INFO_MANAGE_EXCEPT_CAR,
  ADD_DATA_INFO_MANAGE_EXCEPT_CAR,
  EDIT_DATA_INFO_MANAGE_EXCEPT_CAR,
  DELETE_DATA_INFO_MANAGE_EXCEPT_CAR,
} from "../../../service/api/exceptCar";
import { _isEmpty } from "../../../tools/util";
import { getVehicleModelAPI, getVehicleSubModelAPI, getVehicleColorAPI, getVehicleAgencyAPI } from "../../../service/api/util";

const ManageUsers = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [dataSelete, setDataSelete] = useState({});
  const [loading, setLoading] = useState(false);
  const [vehicleModelList, setVehicleModelList] = useState([]);
  const [vehicleSubModelList, setVehicleSubModelList] = useState([]);
  const [VehicleColorList, setVehicleColorList] = useState([]);
  const [vehicleAgencyList, setVehicleAgencyList] = useState([]);
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({})
  const refFocus = useRef(null);

  const fieldsAdd = [
    {
      type: "input",
      option: {
        name: "licensePlate",
        label: "เลขทะเบียน",
        initialValue: dataSelete.licensePlate,
        childrenProps: {
          placeholder: "ป้อนเลขทะเบียน . . .",
          disabled: !_isEmpty(dataSelete),
        },
        rules: [
          {
            required: true,
            message: "กรุณาป้อนเลขทะเบียน!",
          },
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "modelId",
        label: "ยี่ห้อ",
        initialValue: dataSelete.modelId,
        childrenProps: {
          placeholder: "เลือกยี่ห้อ . . .",
          optionValue: {
            values: vehicleModelList,
            keyName: "descriptionTh",
            keyValue: "vehicleModelId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกยี่ห้อ!",
          },
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "subModelId",
        label: "รุ่น",
        initialValue: dataSelete.subModelId,
        childrenProps: {
          placeholder: "เลือกรุ่น . . .",
          optionValue: {
            values: vehicleSubModelList,
            keyName: "descriptionTh",
            keyValue: "vehicleSubModelId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกรุ่น!",
          },
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "colorId",
        label: "สี",
        initialValue: dataSelete.colorId,
        childrenProps: {
          placeholder: "เลือกสี . . .",
          optionValue: {
            values: VehicleColorList,
            keyName: "descriptionTh",
            keyValue: "vehicleColorId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกสี!",
          },
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "agencyId",
        label: "สังกัด",
        initialValue: dataSelete.agencyId,
        childrenProps: {
          placeholder: "เลือกสังกัด . . .",
          optionValue: {
            values: vehicleAgencyList,
            keyName: "descriptionTh",
            keyValue: "vehicleAgencyId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกสังกัด!",
          },
        ],
      },
    },
  ];

  const fieldsSearch = [
    {
      type: "input",
      option: {
        name: "licensePlate",
        label: "เลขทะเบียน",
        childrenProps: { placeholder: "ป้อนข้อมูลเลขทะเบียนเพื่อค้นหา" },
        rules: [
          { required: false, message: "ป้อนข้อมูลเลขทะเบียนเพื่อค้นหา!" },
        ],
        initialValue: _isEmpty(initialValue) ? "" : initialValue.licensePlate,
      },
    },
  ];

  const columns = [
    {
      title: "ทะเบียนรถ",
      key: "licensePlate",
      dataIndex: "licensePlate",
      width: 100,
      align: "left",
    },
    {
      title: "ยี่ห้อ",
      key: "modelDescription",
      dataIndex: "modelDescription",
      render: (text, record) =>
        <div className="text-left">
          {text}
        </div>,
      width: 70,
      align: "center",
    },

    {
      title: "รุ่น",
      key: "subModelDescription",
      dataIndex: "subModelDescription",
      render: (text, record) =>
        <div className="text-left">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "สี",
      key: "colorDescription",
      dataIndex: "colorDescription",
      render: (text, record) =>
        <div className="text-left">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "สังกัด",
      key: "agencyDescription",
      dataIndex: "agencyDescription",
      render: (text, record) =>
        <div className="text-left">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Action",
      fixed: "right",
      key: "Edit",
      dataIndex: "",
      width: 120,
      align: "center",
      render: (text, record) => (
        <span>
          <Tooltip title="แก้ไข">
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className="mr-5"
              onClick={() => handleShowEditForm(record)}
            >
              Edit
            </Button>
          </Tooltip>

          <Tooltip title="ลบ">
            <Popconfirm
              title="Sure to delete?"
              placement="topRight"
              onConfirm={() => handleOnDelete(record)}
            >
              <Button
                size="small"
                type="primary"
                ghost="true"
                icon={<DeleteFilled />}
                className="del-button mr-5"
              />
            </Popconfirm>
          </Tooltip>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setScrollX({ x: 1300 })
    getVehicleModelList();
    getVehicleSubModelList(-1);
    getVehicleColorList();
    getVehicleAgencyList();
    getDataInfo();
  }, []);

  const getVehicleModelList = async () => {
    try {
      setLoading(true);
      const res = await getVehicleModelAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setVehicleModelList(res.list);
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

  const getVehicleSubModelList = async (vehicleModelId) => {
    try {
      const dataOutput = {
        networkId: 10,
        vehicleModelId: vehicleModelId,
      };
      setLoading(true);
      const res = await getVehicleSubModelAPI(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setVehicleSubModelList(res.list);
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

  const getVehicleColorList = async () => {
    try {
      setLoading(true);
      const res = await getVehicleColorAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setVehicleColorList(res.list);
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
  const getVehicleAgencyList = async () => {
    try {
      setLoading(true);
      const res = await getVehicleAgencyAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setVehicleAgencyList(res.list);
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

  const getDataInfo = async (data = null) => {
    const dataOutput = {
      networkId: 10,
      licensePlate: data ? data.licensePlate : null
    };
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_MANAGE_EXCEPT_CAR(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res.list);
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

  const handleOnSearch = (value) => {
    setInitialValue(value);
    const dataOutput = {
      networkId: 10,
      licensePlate: value.licensePlate ? value.licensePlate : null
    };
    getDataInfo(dataOutput);
  };

  const handleOnAdd = async (value = null) => {
    const dataOutput = {
      networkId: 10,
      licensePlate: value.licensePlate,
      modelId: value.modelId,
      subModelId: value.subModelId,
      colorId: value.colorId,
      agencyId: value.agencyId
    };
    try {
      setLoading(true);
      const res = await ADD_DATA_INFO_MANAGE_EXCEPT_CAR(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          text: res.status.message,
          confirmButtonText: "ตกลง",
        });
        setLoading(false);
        // getDataInfo(value.staffId.trim());
        getDataInfo();
        handleSwitchForm();
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

  const handleOnEdit = (value = null) => {
    const dataOutput = {
      networkId: 10,
      licensePlate: value.licensePlate,
      modelId: value.modelId,
      subModelId: value.subModelId,
      colorId: value.colorId,
      agencyId: value.agencyId
    };

    Swal.fire({
      title: "คุณต้องการบันทึกหรือไม่ ?",
      text: "ข้อมูลของคุณจะถูกบันทึก!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#91098f",
      cancelButtonColor: "#e6e6e6",
      confirmButtonText: "ตกลง",
      cancelButtonText: '<span style="color:black">ยกเลิก</span>',
    }).then(async (result) => {
      if (result.value) {
        try {
          setLoading(true);
          const res = await EDIT_DATA_INFO_MANAGE_EXCEPT_CAR(
            dataOutput,
            props.auth.token
          );
          if (res.status.code === "S200") {
            setLoading(false);
            Swal.fire("สำเร็จ!", "ข้อมูลของคุณถูกบันทึกเรียบร้อย", "success");
            // getDataInfo(value.staffId.trim());
            handleOnSearch(dataOutput)
            handleSwitchForm();
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
      }
    });
  };

  const handleOnDelete = async (record) => {
    const dataOutput = {
      networkId: 10,
      licensePlate: record.licensePlate,
    };
    try {
      setLoading(true);
      const res = await DELETE_DATA_INFO_MANAGE_EXCEPT_CAR(
        dataOutput,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
        if (isSearch === false) {
          handleSwitchForm();
        }
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

  const handleShowEditForm = async (record) => {
    setIsSearch(false);
    setDataSelete({ ...record });
    window.scrollTo(0, 0)
    !_isEmpty(refFocus.current) && refFocus.current.focus();
  };

  const handleSwitchForm = () => {
    setDataSelete({});
    setIsSearch(!isSearch);
  };

  const actionBoutton = [
    isSearch
      ? {
        name: "เพิ่มข้อมูล",
        props: {
          type: "primary",
          onClick: handleSwitchForm,
          disabled: false,
          icon: <AppstoreAddOutlined />,
        },
      }
      : {
        name: "ยกเลิก",
        props: { type: "ghost", onClick: handleSwitchForm, disabled: false },
      },
  ];

  const handleFields = () => {
    return isSearch
      ? fieldsSearch
      : _isEmpty(dataSelete)
        ? fieldsAdd
        : fieldsAdd.filter(
          (item) =>
            item.option.name !== "password" &&
            item.option.name !== "confirmPassword"
        );
  };

  const handleOnFinish = () => {
    return isSearch
      ? handleOnSearch
      : _isEmpty(dataSelete)
        ? handleOnAdd
        : handleOnEdit;
  };
  const handleOnSubmit = () => {
    return isSearch
      ? "ค้นหา"
      : _isEmpty(dataSelete)
        ? "เพิ่มข้อมูล"
        : "บันทึกข้อมูล";
  };
  const handleOnTypeButton = () => {
    return isSearch ? "ghost" : _isEmpty(dataSelete) ? "primary" : "primary";
  };
  const handleAction = () => {
    return isSearch
      ? actionBoutton
      : _isEmpty(dataSelete)
        ? actionBoutton.filter((item) => item.name !== "พิมพ์")
        : actionBoutton.filter((item) => item.name !== "พิมพ์");
  };

  const onValuesChange = (changedValues) => {
    for (const [key] of Object.entries(changedValues)) {
      if (key === "networkId") {
      }
    }
  };

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          fields={handleFields()}
          onFinish={handleOnFinish()}
          onValuesChange={onValuesChange}
          actionBoutton={handleAction()}
          submitText={handleOnSubmit()}
          typeButton={handleOnTypeButton()}
          formWrapper={{ md: 24, lg: 14 }}
          buttonWrapper={{ md: 24, lg: 10 }}
          buttonSpan={{ span: 10 }}
          textAlign={"text-right"}
        />
        <div className="mt-10">
          <Table
            size="small"
            rowKey={(ind) => ind}
            scroll={scrollX}
            columns={columns}
            bordered
            dataSource={dataSource
              // checkAllItem === "ทั้งหมด"
              //   ? _isEmpty(SearchItem)
              //     ?  SearchItem
              //     : SearchItem
              //   : SearchItem
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
