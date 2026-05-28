/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Button, Popconfirm, Tooltip} from "antd";
import Skeleton from "../../../components/loading/Loading"

import { UsergroupAddOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';

import FormDefault from "../../../components/form/FormDefault";

import {
  GET_DATA_INFO_ManageUserGroup, ADD_DATA_INFO_ManageUserGroup,
  DELETE_DATA_INFO_ManageUserGroup, EDIT_DATA_INFO_ManageUserGroup,
  GET_DATA_LIST_UserGroup
} from "../../../service/api/user";

import { _isEmpty, regexMix, _setYearThai } from '../../../tools/util'


const UserRoleGroup = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [staffSelete, setStaffSelete] = useState({});
  const [loading, setLoading] = useState(false);
  const [listUserGroup, setListUSerGroup] = useState([]);
  const [SearchItem, setSearchItem] = useState([])
  const [checkAllItem, setCheckAllItem] = useState("")
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({})
  const refFocus = useRef(null)
  const networkId = 10

  useEffect(() => {
    setScrollX({ x: 1300 })
    getDataListStaffGroup()
    getDataInfo()
  }, [])

  const fieldsAdd = [
    {
      type: "input",
      option: {
        name: "staffGroupId", label: "รหัสกลุ่มพนักงาน",
        initialValue: staffSelete.staffGroupId,
        childrenProps: { placeholder: "ป้อนข้อมูลรหัสกลุ่มพนักงาน . . .", disabled: !_isEmpty(staffSelete), ref: refFocus },
        rules: (!_isEmpty(staffSelete) ? [{ required: true, message: "กรุณาป้อนรหัสกลุ่มพนักงานเป็นตัวเลข ไม่เกิน 4 จำนวน!" }, { pattern: /^-?\d*(\.\d*)?$/, message: "กรุณาป้อนตัวเลข" }] :
          [{ required: true, message: "กรุณาป้อนรหัสกลุ่มพนักงานเป็นตัวเลข ไม่เกิน 4 จำนวน!", max: 4 }, { pattern: /^-?\d*(\.\d*)?$/, message: "กรุณาป้อนตัวเลข" }]),
      },
    },
    {
      type: "input",
      option: {
        name: "abbreviation", label: "ตัวย่อ",
        initialValue: staffSelete.abbreviation,
        childrenProps: { placeholder: "ป้อนตัวอักษรย่อ . . .", ref: refFocus },
        rules: [{ required: true, message: "กรุณาป้อนตัวอักษรย่อ!" },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const regexTH = regexMix('en');
            if (regexTH.test(value)) {
              return Promise.reject('please english language or (),/ !');
            }
            return Promise.resolve()
          }
        })],
      },
    },
    {
      type: "input",
      option: {
        name: "descriptionEn", label: "รายละเอียดภาษาอังกฤษ",
        initialValue: staffSelete.descriptionEn,
        childrenProps: { placeholder: "ป้อนข้อมูลรายละเอียดภาษาอังกฤษ . . ." },
        rules: [{ required: true, message: "กรุณาป้อนข้อมูลรายละเอียดภาษาอังกฤษ!" },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const regexTH = regexMix('en');
            if (regexTH.test(value)) {
              return Promise.reject('Please input english language or (),/ !');
            }
            return Promise.resolve()
          }
        })],
      },
    },
    {
      type: "input",
      option: {
        name: "descriptionTh", label: "รายละเอียดภาษาไทย",
        initialValue: staffSelete.descriptionTh,
        childrenProps: { placeholder: "ป้อนข้อมูลรายละเอียดภาษาไทย . . ." },
        rules: [{ required: true, message: "กรุณาป้อนข้อมูลรายละเอียดภาษาไทย!" },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const regexTH = regexMix('th');
            if (regexTH.test(value)) {
              return Promise.reject('Please input thai language or (),/ !');
            }
            return Promise.resolve()
          }
        })],
      },
    }

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
            values: ["ทั้งหมด", ...listUserGroup],
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
        initialValue: _isEmpty(initialValue) ? "ทั้งหมด" : initialValue.staffGroupId,
      },
    },
  ];

  const columns = [
    {
      title: "รหัสกลุ่มพนักงาน",
      key: "staffGroupId",
      dataIndex: "staffGroupId",
      width: 70,
      align: "center",
    },
    {
      title: "รายละเอียดภาษาไทย",
      key: "descriptionTh",
      dataIndex: "descriptionTh",
      width: 150,
      align: "center",
    },
    {
      title: "รายละเอียดภาษาอังกฤษ",
      key: "descriptionEn",
      dataIndex: "descriptionEn",
      width: 150,
      align: "center",
    },
    {
      title: "ตัวย่อ",
      key: "abbreviation",
      dataIndex: "abbreviation",
      width: 70,
      align: "center",
    },
    {
      title: "แก้ไขโดย",
      key: "lastUpdateBy",
      dataIndex: "lastUpdateBy",
      width: 90,
      align: "center",
    },
    {
      title: "แก้ไขเมื่อวันที่",
      key: "lastUpdateDatetime",
      dataIndex: "lastUpdateDatetime",
      render: (text) => _setYearThai(text,'DD/MM/YYYY HH:mm:ss'),
      width: 90,
      align: "center",
    },
    {
      title: "Action",
      fixed: "right",
      key: "detail",
      dataIndex: "",
      width: 100,
      align: "center",
      render: (text, record) =>
        <span>
          <Tooltip title="รายละเอียด">
            <Button size="small" type="primary" icon={<EditOutlined />} className="mr-5"
              onClick={() => handleShowEditForm(record)}>
              Edit
            </Button>
          </Tooltip>

          <Popconfirm
            placement="topRight"
            title="Sure to delete?"
            onConfirm={() => handleDeleteData(record.staffGroupId)}
          >
            <Button size="small"
              type="primary"
              ghost="true"
              icon={<DeleteFilled />}
              className="del-button"
            />
          </Popconfirm>
        </span>
    }

  ];

  const getDataListStaffGroup = async () => {
    const networkIdData = {
      networkId: networkId
    }
    try {
      setLoading(true)
      const res = await GET_DATA_LIST_UserGroup(networkIdData, props.auth.token)
      if (res.status.code === "S200") {
        setLoading(false)
        setListUSerGroup(res.list)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch StaffGroupList . ",
          text: res.status.message
        }).then(async (result) => {
          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

  }

  const getDataInfo = async (data = null) => {
    const dataOutput = {
      networkId: networkId,
      staffGroupId: data
    };
    try {
      setLoading(true)
      const res = await GET_DATA_INFO_ManageUserGroup(dataOutput, props.auth.token);
      if (res.status.code === "S200") {

        if (data) {
          setCheckAllItem("")
          const result = res.list.filter(e => e.staffGroupId === Number(data.staffGroupId))
          setInitialValue(result[0])
          setSearchItem(result)
          setDataSource(res.list)
          setLoading(false)
        } else {
          setInitialValue({})
          setCheckAllItem("ทั้งหมด")
          setDataSource(res.list);
          setSearchItem(res.list)
          setLoading(false)
        }

      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {

          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnAdd = async (value = null) => {

    const dataOutput = {
      networkId: networkId,
      staffGroupId: value.staffGroupId.trim(),
      abbreviation: value.abbreviation,
      descriptionEn: value.descriptionEn,
      descriptionTh: value.descriptionTh,
    };
    try {
      setLoading(true)
      const res = await ADD_DATA_INFO_ManageUserGroup(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          text: res.status.message,
          confirmButtonText: 'ตกลง',
        });
        setLoading(false)
        getDataInfo()
        getDataListStaffGroup()
        handleSwitchForm()
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {

          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSearch = (value) => {
    setInitialValue(value);
    if (value.staffGroupId) {
      if (value.staffGroupId === "ทั้งหมด") {
        // setCheckAllItem(value.staffGroupId)
        // setSearchItem(dataSource)
        getDataInfo()
      } else {
        getDataInfo(value)
        // setCheckAllItem("")
        // const result = dataSource.filter(e => e.staffGroupId === value.staffGroupId)
        // setSearchItem(result)
      }
    }
  };

  const handleShowEditForm = async (record) => {
    setIsSearch(false)
    setStaffSelete({ ...record })
    window.scrollTo(0, 0)
    !_isEmpty(refFocus.current) && refFocus.current.focus();
  };

  const handleOnEdit = (record) => {

    const dataRecord = {
      networkId: networkId,
      staffGroupId: record.staffGroupId,
      abbreviation: record.abbreviation,
      descriptionEn: record.descriptionEn,
      descriptionTh: record.descriptionTh,
    };

    Swal.fire({
      title: 'คุณต้องการบันทึกหรือไม่ ?',
      text: "ข้อมูลของคุณจะถูกบันทึก!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91098f',
      cancelButtonColor: '#e6e6e6',
      confirmButtonText: 'ตกลง',
      cancelButtonText: '<span style="color:black">ยกเลิก</span>',
    }).then(async (result) => {

      if (result.value) {
        try {
          setLoading(true)
          const res = await EDIT_DATA_INFO_ManageUserGroup(dataRecord, props.auth.token);
          if (res.status.code === "S200") {

            Swal.fire(
              'สำเร็จ!',
              'ข้อมูลของคุณถูกบันทึกเรียบร้อย',
              'success'
            )
            // getDataInfo(record.staffGroupId)
            getDataListStaffGroup()
            getDataInfo(dataRecord)
            handleSwitchForm()
            setLoading(false)
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to fetch. ",
              text: res.status.message,
            }).then(async (result) => {

              if (result.value) {
                setLoading(false)
              }
            })
          }
        }
        catch (error) {
          console.log(error);
        }
      }
    })
  };

  const handleDeleteData = async (staffGroupId) => {

    const dataRecord = {
      networkId: networkId,
      staffGroupId: staffGroupId
    };
    try {
      setLoading(true)
      const res = await DELETE_DATA_INFO_ManageUserGroup(dataRecord, props.auth.token);
      if (res.status.code === "S200") {

        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
        getDataListStaffGroup()
        if (isSearch === false) {
          handleSwitchForm();
        }
        setLoading(false)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {

          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleSwitchForm = () => {
    setStaffSelete({})
    setIsSearch(!isSearch)
  };

  const actionBoutton = [
    (isSearch ?
      {
        name: "เพิ่มข้อมูลกลุ่มพนักงาน",
        props: { type: "primary", onClick: handleSwitchForm, disabled: false, icon: <UsergroupAddOutlined /> },
      } : {
        name: "ยกเลิก",
        props: { type: "ghost", onClick: handleSwitchForm, disabled: false },
      }),
  ];

  const handleFields = () => {
    return isSearch ? fieldsSearch : _isEmpty(staffSelete) ? fieldsAdd : fieldsAdd.filter(item => item.option.name !== "password" && item.option.name !== "confirmPassword")
  }
  const handleOnFinish = () => {
    return isSearch ? handleOnSearch : _isEmpty(staffSelete) ? handleOnAdd : handleOnEdit
  }
  const handleOnSubmit = () => {
    return isSearch ? "ค้นหา" : _isEmpty(staffSelete) ? "เพิ่มข้อมูล" : "บันทึกข้อมูล"
  }
  const handleOnTypeButton = () => {
    return isSearch ? "ghost" : _isEmpty(staffSelete) ? "primary" : "primary"
  }
  const handleAction = () => {
    return isSearch ? actionBoutton : _isEmpty(staffSelete) ? actionBoutton.filter(item => item.name !== "พิมพ์") : actionBoutton.filter(item => item.name !== "พิมพ์")
  }

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          fields={handleFields()}
          onFinish={handleOnFinish()}
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
            rowKey={(row, ind) => ind}
            scroll={scrollX}
            columns={columns}
            bordered
            dataSource={_isEmpty(SearchItem) ? checkAllItem === "ทั้งหมด" ? dataSource : SearchItem : SearchItem}
            pagination={{
              showSizeChanger: true,
            }}
          />
        </div>
      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleGroup)
