/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Button, Popconfirm, Tooltip } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { UsergroupAddOutlined, EditOutlined, DeleteFilled, ReloadOutlined } from '@ant-design/icons';

import FormDefault from "../../../components/form/FormDefault/FormDefault";

import {
  GET_DATA_INFO_ManageMenu, ADD_DATA_INFO_ManageMenu,
  DELETE_DATA_INFO_ManageMenu, EDIT_DATA_INFO_ManageMenu,
  REFRESH_MASTER_CACHE
} from "../../../service/api/menu";

import { _isEmpty, regexLanguage, _setYearThai } from '../../../tools/util'


const UserRoleGroup = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [menuSelete, setMenuSelect] = useState({});
  const [loading, setLoading] = useState(false);
  const [item , setItem] = useState([])
  const [initialValue, setInitialValue] = useState({});
  const [scrollX,setScrollX] = useState({})
  const refFocus = useRef(null)

  useEffect(()=>{
    setScrollX({ x: 1300 })
    getDataInfo()
  },[])

  const fieldsAdd = [
    {
      type: "input",
      option: {
        name: "menuId", label: "รหัส",
        initialValue: menuSelete.menuId,
        childrenProps: { placeholder: "ป้อนข้อมูลรหัสเมนู . . .", ref: refFocus },
        rules: [{ required: true, message: "กรุณาป้อนรหัสเมนู ไม่เกิน 3 จำนวน!" }],
        // pattern:'^-?[0-9]+$',max:3 if use to input value this is conditions when input 
      },
    },
    {
      type: "input",
      option: {
        name: "menuNameTh", label: "ชื่อเมนูภาษาไทย",
        initialValue: menuSelete.menuNameTh,
        childrenProps: { placeholder: "ป้อนชื่อเมนูภาษาไทย . . .",  },
        rules: [{ required: true, message: "กรุณาป้อนชื่อเมนูภาษาไทย!" },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const regexTH = regexLanguage('th');
            if (regexTH.test(value)) {
              return Promise.reject('Please input Menu thai language or (),/ !');
            }
            return Promise.resolve()
          }
        })
        ],
      },
    },
    {
      type: "input",
      option: {
        name: "menuNameEn", label: "ชื่อเมนูภาษาอังกฤษ",
        initialValue: menuSelete.menuNameEn,
        childrenProps: { placeholder: "ป้อนชื่อเมนูภาษาอังกฤษ . . ." },
        rules: [{ required: true, message: "กรุณาป้อนชื่อเมนูภาษาอังกฤษ!" },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            const regexEN = regexLanguage('en');
            if (regexEN.test(value)) {
              return Promise.reject('Please input Menu English language or (),/ !');
            }
            return Promise.resolve()
          }
        })
        ],
      },
    }
  ];

  const fieldsSearch = [
    {
      type: "select",
      option: {
        name: "menuId",
        label: "รหัสเมนู",
        childrenProps: {
          placeholder: "โปรดเลือกรหัสเมนู . . .",
          optionValue: {
            values: ["ทั้งหมด",...dataSource],
            keyName: "menuId",
            keyValue: "menuId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกรหัสเมนู!",
          },
        ],
        initialValue: _isEmpty(initialValue) ? "ทั้งหมด" : initialValue.menuId,
      },
    }
  ];

  const columns = [
    {
      title: "รหัสเมนู",
      key: "menuId",
      dataIndex: "menuId",
      width: 60,
      align: "center",
    },
    {
      title: "ชื่อเมนูภาษาไทย",
      key: "menuNameTh",
      dataIndex: "menuNameTh",
      width: 150,
      align: "center",
      render: (text, record) =>
        <div className="text-left">
          {text}
        </div>
    },
    {
      title: "ชื่อเมนูภาษาอังกฤษ",
      key: "menuNameEn",
      dataIndex: "menuNameEn",
      width: 150,
      align: "center",
      render: (text, record) =>
        <div className="text-left">
          {text}
        </div>
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
      render: (text) => _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
      width: 70,
      align: "center",
    },
    {
      title: "Action",
      fixed: "right",
      key: "detail",
      dataIndex: "",
      width: 90,
      align: "center",
      render: (text, record) =>
        <span>
          <Tooltip title="รายละเอียด">
            <Button size="small" type="primary" icon={<EditOutlined />} className="mr-5"
              onClick={() => handleEditmenuSelete(record)}>
              Edit
            </Button>
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="Sure to delete?"
            onConfirm={() => handleDeleteData(record.menuId)}
          >
            <Button 
              size="small"
              type="primary"
              ghost="true"
              icon={<DeleteFilled />}
              className="del-button"
            />
          </Popconfirm>
        </span>
    },
  ];

  const getDataInfo = async () => {
    const dataOutput = {
      networkId: 10
    };
    try {
      setLoading(true)
      const res = await GET_DATA_INFO_ManageMenu(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        setDataSource(res.list);
        setItem(res.list)
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

  const handleOnAdd = async (value) => {

    const dataOutput = {
      networkId: 10,
      menuId: value.menuId,
      menuNameTh: value.menuNameTh,
      menuNameEn: value.menuNameEn,
    };
    try {
      setLoading(true)
      const res = await ADD_DATA_INFO_ManageMenu(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
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
    setInitialValue(value)
    const itemData = [{...dataSource.find((item) => item.menuId === value.menuId)}];
    if(value.menuId === "ทั้งหมด"){
      setItem(dataSource)
    }else{
      setItem(itemData)
    }
  };

  const handleEditmenuSelete = async (record) => {
    window.scrollTo(0,0)
    !_isEmpty(refFocus.current) && refFocus.current.focus();
    setIsSearch(false)
    setMenuSelect({ ...record })
  };

  const handleOnEdit = async (record) => {
    const dataRecord = {
      networkId: 10,
      menuId: record.menuId,
      menuNameTh: record.menuNameTh,
      menuNameEn: record.menuNameEn
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
          setDataSource([])
          const res = await EDIT_DATA_INFO_ManageMenu(dataRecord, props.auth.token);
          if (res.status.code === "S200") {    
            getDataInfo()
            setLoading(false)
            Swal.fire(
              'สำเร็จ!',
              'ข้อมูลของคุณถูกบันทึกเรียบร้อย',
              'success'
            )
            getDataInfo()
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
        }
        catch (error) {
          console.log(error);
        }
      }
    })
  };

  const handleDeleteData = async (menuId) => {

    const dataRecord = {
      networkId: 10,
      menuId: menuId
    };
    try {
      setLoading(true)
      const res = await DELETE_DATA_INFO_ManageMenu(dataRecord, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
        if(isSearch === false){
          handleSwitchForm();
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

  const handleSwitchForm = () => {
    setMenuSelect({})
    setIsSearch(!isSearch)
  };

  // Refresh the backend master-data cache (POST /cache/refresh).
  const handleRefreshMaster = () => {
    Swal.fire({
      title: 'รีเฟรช Master ?',
      text: 'ต้องการรีเฟรชข้อมูล Master ของระบบหรือไม่?',
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
          const res = await REFRESH_MASTER_CACHE(props.auth.token);
          if (res && res.status && res.status.code === "S200") {
            setLoading(false)
            Swal.fire({
              icon: "success",
              title: "รีเฟรช Master สำเร็จ",
              text: res.status.message,
            });
          } else {
            setLoading(false)
            Swal.fire({
              icon: "error",
              title: "Failed to fetch. ",
              text: res && res.status ? res.status.message : "",
            });
          }
        } catch (error) {
          setLoading(false)
          console.log(error);
        }
      }
    })
  };

  const actionBoutton = [

    (isSearch ?
      {
        name: "เพิ่มข้อมูลเมนู",
        props: { type: "primary", onClick: handleSwitchForm, disabled: false, icon: <UsergroupAddOutlined /> },
      } : {
        name: "ยกเลิก",
        props: { type: "ghost", onClick: handleSwitchForm, disabled: false },
      }),
    // Refresh Master — sits right after the "เพิ่มข้อมูลเมนู" button (search mode only)
    ...(isSearch ? [{
      name: "Refresh Master",
      props: { type: "primary", ghost: true, onClick: handleRefreshMaster, disabled: false, icon: <ReloadOutlined /> },
    }] : []),
  ];

  const handleFields = () => {
    return isSearch ? fieldsSearch : _isEmpty(menuSelete) ? fieldsAdd : fieldsAdd.filter(item => item.option.name !== "password" && item.option.name !== "confirmPassword")
  }
  const handleOnFinish = () => {
    return isSearch ? handleOnSearch : _isEmpty(menuSelete) ? handleOnAdd : handleOnEdit
  }
  const handleOnSubmit = () => {
    return isSearch ? "ค้นหา" : _isEmpty(menuSelete) ? "เพิ่มข้อมูล" : "บันทึกข้อมูล"
  }
  const handleOnTypeButton = () => {
    return isSearch ? "ghost" : _isEmpty(menuSelete) ? "primary" : "primary"
  }
  const handleAction = () => {
    return isSearch ? actionBoutton : _isEmpty(menuSelete) ? actionBoutton.filter(item => item.name !== "พิมพ์") : actionBoutton.filter(item => item.name !== "พิมพ์")
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
            dataSource={_isEmpty(item) ? dataSource : item}
            textAlign={"text-left"}
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
