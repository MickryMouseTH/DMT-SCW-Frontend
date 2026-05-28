/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Switch } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault/FormDefault";

import {
    GET_DATA_PERMISSION_MENU, EDIT_DATA_PERMISSION_MENU, GET_DATA_LIST_UserGroup
} from "../../../service/api/user";

// import { _isEmpty } from '../../../tools/util'


const UserRoleGroup = (props) => {
    const [dataSource, setDataSource] = useState([]);
    const [dataOrigin, setDataOrigin] = useState([])
    const [loading, setLoading] = useState(false);
    const [staffGroupList, setStaffGroupList] = useState([]);
    const [userRole, setUserRole] = useState(null)
    const [openVisual, setOpenVisual] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [checkOnSelect, setCheckOnSelect] = useState(true)

    useEffect(() => {
        getDataStaffGroup()
    }, [])

    const fieldsSearch = [
        {
            type: "select",
            option: {
                name: "staffGroupId",
                label: "กลุ่มพนักงาน",
                childrenProps: {
                    onChange: (id) => onSelect(id),
                    virtual: openVisual,
                    placeholder: "โปรดเลือกกลุ่มพนักงาน . . .",
                    optionValue: {
                        values: staffGroupList,
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
                initialValue: userRole,
            },
        }
    ];

    const columns = [
        {
            title: "สิทธิ์เมนู",
            fixed: "left",
            key: "action",
            dataIndex: "",
            width: 30,
            align: "center",
            render: (text, record) => {
                return (<span>
                    <Switch size="small" width={'50px'} checked={userRole
                        ? record.staffGroupList.find(item => item.staffGroupId === userRole).permision : false}
                        onClick={() => onClickMenu(record)} />
                </span>)
            }
        },
        {
            title: "สิทธิ์ปุ่ม",
            fixed: "left",
            key: "button",
            dataIndex: "",
            width: 30,
            align: "center",
            render: (text, record) => {
                return (
                    record.buttonSaveList.length > 0 ?
                        <span>
                            <Switch size="small" width={'50px'} checked={userRole
                                ? record.buttonSaveList.find(item => item.staffGroupId === userRole).permision : false}
                                onClick={() => onClickButton(record)} />
                        </span>
                        : <span></span>
                )
            }
        },
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
            width: 160,
            align: "center",
            render: (text, record) =>
                <span className="text-left justify-content-start d-flex">
                    {text}
                </span>
        },
        {
            title: "ชื่อเมนูภาษาอังกฤษ",
            key: "menuNameEn",
            dataIndex: "menuNameEn",
            width: 160,
            align: "center",
            render: (text, record) =>
                <span className="text-left justify-content-start d-flex">
                    {text}
                </span>
        },
    ];

    const onClickMenu = (checked) => {
        if (userRole !== null) {
            const newObj = [...dataSource];
            const _newObj = newObj.map(item => {
                let _item = { ...item }
                if (_item.menuId === checked.menuId) {
                    const _news = _item.staffGroupList.map(child => {
                        if (child.staffGroupId === userRole) {
                            let newChild = { ...child }
                            newChild.permision = !child.permision
                            return newChild
                        } else {
                            return child
                        }
                    })
                    _item.staffGroupList = [..._news]
                    return _item
                } else {
                    return _item
                }
            });
            setDataSource([..._newObj])
            onDisbleMenu(_newObj)
        }
    }

    const onClickButton = (checked) => {
        if (userRole !== null) {
            const newObj = [...dataSource];
            const _newObj = newObj.map(item => {
                let _item = { ...item }
                if (_item.menuId === checked.menuId) {
                    const _news = _item.buttonSaveList.map(child => {
                        if (child.staffGroupId === userRole) {
                            let newChild = { ...child }
                            newChild.permision = !child.permision
                            return newChild
                        } else {
                            return child
                        }
                    })
                    _item.buttonSaveList = [..._news]
                    return _item
                } else {
                    return _item
                }
            });
            setDataSource([..._newObj])
            onDisbleButton(_newObj)
        }
    }

    const onDisbleMenu = (item1) => {
        let arr1 = item1.map(item => item.staffGroupList)
        let arr2 = dataOrigin.map(item => item.staffGroupList)
        var equalArrays = JSON.stringify(arr1) === JSON.stringify(arr2);
        if (equalArrays === true) {
            setDisabled(true)
            setCheckOnSelect(true)
        } else {
            setDisabled(false)
            setCheckOnSelect(false)
        }
    }
    
    const onDisbleButton = (item1) => {
        let arr1 = item1.map(item => item.buttonSaveList)
        let arr2 = dataOrigin.map(item => item.buttonSaveList)
        var equalArrays = JSON.stringify(arr1) === JSON.stringify(arr2);
        if (equalArrays === true) {
            setDisabled(true)
            setCheckOnSelect(true)
        } else {
            setDisabled(false)
            setCheckOnSelect(false)
        }
    }

    const onSelect = (id) => {
        if (checkOnSelect === true) {
            setUserRole(id)
            setDisabled(true)
        } else {
            setOpenVisual(!openVisual)
            handleOnSave()
            setDisabled(false)
        }
    }

    const getDataStaffGroup = async () => {
        const data = {
            networkId: 10,
        };
        try {
            setLoading(true);
            const res = await GET_DATA_LIST_UserGroup(data, props.auth.token);
            if (res.status.code === "S200") {
                // setLoading(false);
                getDataInfo()
                setStaffGroupList(res.list);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to fetch StaffGroupList . ",
                    text: res.status.message,
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDataInfo = async () => {
        const dataOutput = {
            networkId: 10
        };
        try {
            setLoading(true)
            const res = await GET_DATA_PERMISSION_MENU(dataOutput, props.auth.token);
            if (res.status.code === "S200") {
                setDataSource(res.list);
                setDataOrigin(res.list);
                setLoading(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to fetch. ",
                    text: res.status.message,
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnSave = async () => {

        const dataRecord = {
            networkId: 10,
            list: dataSource
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
                    const res = await EDIT_DATA_PERMISSION_MENU(dataRecord, props.auth.token);
                    if (res.status.code === "S200") {
                        setLoading(false)
                        Swal.fire(
                            'สำเร็จ!',
                            'ข้อมูลของคุณถูกบันทึกเรียบร้อย',
                            'success'
                        )
                        setCheckOnSelect(true)
                        setDisabled(true)
                        getDataInfo()
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

    const onCancel = () => {
        setDisabled(true)
        setCheckOnSelect(true)
        setDataSource(dataOrigin)
    }

    const actionBoutton = [
        {
            name: "บันทึก",
            props: { type: "primary", htmlType: "submit", disabled: disabled },
        },
        {
            name: "คืนค่า",
            props: { type: "primary", onClick: onCancel, disabled: disabled },
        }
    ];

    return (
        <Skeleton loading={loading} active>
            <div>
                <FormDefault
                    fields={fieldsSearch}
                    onFinish={handleOnSave}
                    formWrapper={{ md: 24, lg: 14 }}
                    buttonWrapper={{ md: 24, lg: 10 }}
                    buttonSpan={{ span: 10 }}
                    textAlign={"text-right"}
                    actionSearch={actionBoutton}
                />
            </div>
            <div className="mt-10">
                <Table
                    size="small"
                    rowKey={(row, ind) => ind}
                    columns={columns}
                    bordered
                    dataSource={dataSource}
                    textAlign={"text-left"}
                />
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
