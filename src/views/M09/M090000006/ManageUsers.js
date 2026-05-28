/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Button, Popconfirm, Tooltip } from "antd";
import Skeleton from "../../../components/loading/Loading"

import {
  UsergroupAddOutlined,
  EditOutlined,
  DeleteFilled,
  RedoOutlined,
} from "@ant-design/icons";

import FormDefault from "../../../components/form/FormDefault";

import {
  GET_DATA_INFO_ManageUser,
  EDIT_DATA_INFO_ManageUser,
  DELETE_DATA_INFO_ManageUser,
  ADD_DATA_INFO_ManageUser,
  GET_DATA_LIST_UserGroup,
  RESET_PASSWORD_ManageUser,
} from "../../../service/api/user";

import { _isEmpty, nameLanguage, _setYearThai } from "../../../tools/util";

const ManageUsers = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [staffSelete, setStaffSelete] = useState({});
  const [loading, setLoading] = useState(false);
  const [staffGroup, setStaffGroup] = useState([]);
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({})
  const refFocus = useRef(null);

  const fieldsAdd = [
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        initialValue: staffSelete.staffId,
        childrenProps: {
          placeholder: "ป้อนรหัสพนักงาน . . .",
          disabled: !_isEmpty(staffSelete),
        },
        rules: [
          {
            required: true,
            message: "กรุณาป้อนรหัสพนักงาน!",
            pattern: "^-?[0-9]",
          },
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "staffGroupId",
        label: "กลุ่มพนักงาน",
        initialValue: staffSelete.staffGroupId,
        childrenProps: {
          placeholder: "เลือกกลุ่มพนักงาน . . .",
          optionValue: {
            values: staffGroup,
            keyName: "descriptionTh",
            keyValue: "staffGroupId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกกลุ่มพนักงาน!",
          },
        ],
      },
    },
    {
      type: "inputpassword",
      option: {
        name: "password",
        label: "รหัสผ่าน",
        childrenProps: { placeholder: "ป้อนรหัสผ่าน . . ." },
        rules: [{ required: true, message: "กรุณาป้อนรหัสผ่าน!" }],
      },
    },
    {
      type: "inputpassword",
      option: {
        name: "confirmPassword",
        label: "ยืนยันรหัสผ่าน",
        childrenProps: { placeholder: "ยืนยันรหัสผ่าน . . ." },
        rules: [
          { required: true, message: "กรุณายืนยันรหัสผ่าน!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("ยืนยันรหัสผ่านไม่ถูกต้อง!");
            },
          }),
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "titleEn",
        label: "คำนำหน้าชื่อภาษาอังกฤษ",
        initialValue: staffSelete.titleEn,
        childrenProps: {
          placeholder: "เลือกคำนำหน้าชื่อภาษาอังกฤษ . . .",
          optionValue: {
            values: ["Mr.", "Mrs.", "M."],
            keyName: ["Mr.", "Mrs.", "M."],
            keyValue: ["Mr.", "Mrs.", "M."],
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกคำนำหน้าชื่อภาษาอังกฤษ!",
          },
        ],
      },
    },
    {
      type: "input",
      option: {
        name: "nameEn",
        label: "ชื่อภาษาอังกฤษ",
        initialValue: staffSelete.nameEn,
        childrenProps: { placeholder: "ป้อนชื่อภาษาอังกฤษ . . .", ref: refFocus, },
        rules: [
          { required: true, message: "Please input name english language!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const regexEN = nameLanguage("en");
              if (regexEN.test(value)) {
                return Promise.reject("กรุณาป้อนข้อมูลเป็นภาษาอังกฤษ!");
              }
              return Promise.resolve();
            },
          }),
        ],
      },
    },
    {
      type: "input",
      option: {
        name: "surnameEn",
        label: "นามสกุลภาษาอังกฤษ",
        initialValue: staffSelete.surnameEn,
        childrenProps: { placeholder: "ป้อนนามสกุลภาษาอังกฤษ . . ." },
        rules: [
          { required: true, message: "Please input surname english language!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const regexEN = nameLanguage("en");
              if (regexEN.test(value)) {
                return Promise.reject("กรุณาป้อนข้อมูลเป็นภาษาอังกฤษ!");
              }
              return Promise.resolve();
            },
          }),
        ],
      },
    },
    {
      type: "select",
      option: {
        name: "titleTh",
        label: "คำนำหน้าชื่อภาษาไทย",
        initialValue: staffSelete.titleTh,
        childrenProps: {
          placeholder: "เลือกคำนำหน้าชื่อภาษาไทย . . .",
          optionValue: {
            values: ["นาย.", "นาง.", "นางสาว."],
            keyName: ["man", "woman", "girl"],
            keyValue: ["man", "woman", "girl"],
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกคำนำหน้าชื่อภาษาไทย!",
          },
        ],
      },
    },
    {
      type: "input",
      option: {
        name: "nameTh",
        label: "ชื่อภาษาไทย",
        initialValue: staffSelete.nameTh,
        childrenProps: { placeholder: "ป้อนชื่อภาษาไทย . . ." },
        rules: [
          { required: true, message: "กรุณาป้อนชื่อเป็นภาษาไทย!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const regexEN = nameLanguage("th");
              if (regexEN.test(value)) {
                return Promise.reject("กรุณาป้อนข้อมูลเป็นภาษาไทย!");
              }
              return Promise.resolve();
            },
          }),
        ],
      },
    },
    {
      type: "input",
      option: {
        name: "surnameTh",
        label: "นามสกุลภาษาไทย",
        initialValue: staffSelete.surnameTh,
        childrenProps: { placeholder: "ป้อนนามสกุลภาษาไทย . . ." },
        rules: [
          { required: true, message: "กรุณาป้อนนามสกุลเป็นภาษาไทย!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const regexEN = nameLanguage("th");
              if (regexEN.test(value)) {
                return Promise.reject("กรุณาป้อนข้อมูลเป็นภาษาไทย!");
              }
              return Promise.resolve();
            },
          }),
        ],
      },
    },
    {
      type: "input",
      option: {
        name: "cardSerialNo",
        label: "เลขบัตรพนักงาน",
        initialValue: staffSelete.cardSerialNo,
        childrenProps: {
          placeholder: "ป้อนเลขบัตรพนักงาน . . .",
        },
        rules: [
          {
            required: true,
            message: "กรุณาป้อนเลขบัตรพนักงาน!",
            // pattern: "^-?[0-9]",
          },
        ],
      },
    },
  ];

  const fieldsSearch = [
    {
      type: "select",
      option: {
        name: "staffGroupId",
        label: "กลุ่มพนักงาน",
        childrenProps: {
          placeholder: "โปรดเลือกกลุ่มพนักงาน . . .",
          optionValue: {
            values: ["ทั้งหมด", ...staffGroup],
            keyName: "descriptionTh",
            keyValue: "staffGroupId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกกลุ่มพนักงาน!",
          },
        ],
        initialValue: _isEmpty(initialValue) ? "ทั้งหมด" : initialValue.staffGroupId,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "ป้อนข้อมูลรหัสพนักงานเพื่อค้นหา" },
        rules: [
          { required: false, message: "ป้อนข้อมูลรหัสพนักงานเพื่อค้นหา!" },
        ],
        initialValue: _isEmpty(initialValue) ? "" : initialValue.staffId,
      },
    },
  ];

  const columns = [
    {
      title: "รหัสพนักงาน",
      key: "staffId",
      dataIndex: "staffId",
      width: 60,
      align: "left",
    },
    {
      title: "ชื่อ",
      key: "fullNameTh",
      dataIndex: "fullNameTh",
      width: 70,
      align: "left",
    },
    {
      title: "รหัสกลุ่มพนักงาน",
      key: "staffGroupId",
      dataIndex: "staffGroupId",
      width: 60,
      align: "center",
    },
    {
      title: "ชื่อกลุ่มพนักงาน",
      key: "staffGroupName",
      dataIndex: "staffGroupName",
      width: 100,
      align: "left",
    },
    {
      title: "แก้ไขโดย",
      key: "lastUpdateBy",
      dataIndex: "lastUpdateBy",
      width: 90,
      align: "left",
    },
    {
      title: "แก้ไขเมื่อวันที่",
      key: "lastUpdateDatetime",
      dataIndex: "lastUpdateDatetime",
      render: (text) =>
      _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
      width: 80,
      align: "center",
    },
    {
      title: "เลขบัตรพนักงาน",
      key: "cardSerialNo",
      dataIndex: "cardSerialNo",
      width: 70,
      align: "left",
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
          <Tooltip title="รายละเอียด">
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

          <Tooltip title="ลบพนักงาน">
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

          <Tooltip title="รีเซ็ตรหัสผ่าน">
            <Popconfirm
              title="คุณต้องการรีเซ็ตรหัสผ่าน ใช่หรือไม่?"
              placement="topRight"
              onConfirm={() => handleOnResetPassword(record)}
            >
              <Button
                size="small"
                type="primary"
                ghost="true"
                icon={<RedoOutlined />}
                className="del-button"
              />
            </Popconfirm>
          </Tooltip>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setScrollX({ x: 1300 })
    getDataStaffGroup();
    getDataInfo();
  }, []);

  const getDataStaffGroup = async () => {
    const data = {
      networkId: 10,
    };
    try {
      setLoading(true);
      const res = await GET_DATA_LIST_UserGroup(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setStaffGroup(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch StaffGroupList . ",
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
      staffGroupId: data ? data.staffGroupId : null,
      staffId: data ? data.staffId : null
    };
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_ManageUser(dataOutput, props.auth.token);
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
      staffGroupId: value.staffGroupId === "ทั้งหมด" ? null : value.staffGroupId,
      staffId: value.staffId ? value.staffId : null
    };
    getDataInfo(dataOutput);
  };

  const handleOnAdd = async (value = null) => {
    const dataOutput = {
      networkId: 10,
      staffId: value.staffId.trim(),
      password: value.password,
      confirmPassword: value.confirmPassword,
      staffGroupId: value.staffGroupId,
      titleEn: value.titleEn,
      nameEn: value.nameEn,
      surnameEn: value.surnameEn,
      titleTh: value.titleTh,
      nameTh: value.nameTh,
      surnameTh: value.surnameTh,
      cardSerialNo: value.cardSerialNo
    };
    try {
      setLoading(true);
      const res = await ADD_DATA_INFO_ManageUser(dataOutput, props.auth.token);
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
      staffId: value.staffId.trim(),
      staffGroupId: value.staffGroupId,
      titleEn: value.titleEn,
      nameEn: value.nameEn,
      surnameEn: value.surnameEn,
      titleTh: value.titleTh,
      nameTh: value.nameTh,
      surnameTh: value.surnameTh,
      cardSerialNo: value.cardSerialNo
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
          const res = await EDIT_DATA_INFO_ManageUser(
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
      staffId: record.staffId,
    };
    try {
      setLoading(true);
      const res = await DELETE_DATA_INFO_ManageUser(
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

  const handleOnResetPassword = async (record) => {
    const dataOutput = {
      networkId: 10,
      staffId: record.staffId,
    };
    try {
      setLoading(true);
      const res = await RESET_PASSWORD_ManageUser(
        dataOutput,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "รีเซ็ตรหัสผ่านสำเร็จ",
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
    setStaffSelete({ ...record });
    window.scrollTo(0, 0)
    !_isEmpty(refFocus.current) && refFocus.current.focus();
  };

  const handleSwitchForm = () => {
    setStaffSelete({});
    setIsSearch(!isSearch);
  };

  const actionBoutton = [
    isSearch
      ? {
        name: "เพิ่มข้อมูลพนักงาน",
        props: {
          type: "primary",
          onClick: handleSwitchForm,
          disabled: false,
          icon: <UsergroupAddOutlined />,
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
      : _isEmpty(staffSelete)
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
      : _isEmpty(staffSelete)
        ? handleOnAdd
        : handleOnEdit;
  };
  const handleOnSubmit = () => {
    return isSearch
      ? "ค้นหา"
      : _isEmpty(staffSelete)
        ? "เพิ่มข้อมูล"
        : "บันทึกข้อมูล";
  };
  const handleOnTypeButton = () => {
    return isSearch ? "ghost" : _isEmpty(staffSelete) ? "primary" : "primary";
  };
  const handleAction = () => {
    return isSearch
      ? actionBoutton
      : _isEmpty(staffSelete)
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
