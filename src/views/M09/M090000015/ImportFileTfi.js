/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Row, Upload, message } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { UploadOutlined } from '@ant-design/icons';
import { UPLOAD_FILE_IMAGE_M090000015 } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero } from "../../../tools/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ImportFileTfi = (props) => {
    const [loading, setLoading] = useState(false);
    const [UploadFile, setUploadFile] = useState([]);
    const [nameFile, setNameFile] = useState('');
    const [initialValue, setInitialValue] = useState({});

    const fields = [
        {
            type: "datePicker2",
            option: {
                name: "effectiveDatetime",
                label: "Effective Datetime",
                childrenProps: {
                    format: dateFormat,
                    placeholder: "เลือกวันที่...",
                    showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
                },
                rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
                initialValue: _isEmpty(initialValue)
                    ? moment("00:00:00", "HH:mm:ss")
                    : initialValue.effectiveDatetime,
            },
        },
    ];

    const fileHandler = fileList => {
        let fileObj = fileList;
        if (!_isEmpty(fileObj)) {
            if (fileObj.type === "image/jpeg" || fileObj.type === "image/gif") {
                message.success('อัปโหลดไฟล์สำเร็จ');
                setNameFile(fileList.name)
                setUploadFile([fileList])
            } else {
                message.error('อัปโหลดไฟล์ไม่สำเร็จ กรุณาอัปโหลดไฟล์รูป (.jpg หรือ .gif) เท่านั้น ');
                return false;
            }
        } else {
            return false;
        }
        return false;
    };

    const handleSubmit = async (value) => {
        try {
            console.log("effectiveDatetime : " + _timeZoneThai(value.effectiveDatetime))
            setInitialValue(value);
            setLoading(true);
            const formData = new FormData()
            formData.append('file', UploadFile[0])
            formData.append('effectiveDatetime', _timeZoneThai(value.effectiveDatetime))
            const res = await UPLOAD_FILE_IMAGE_M090000015(formData, props.auth.token)
            if (res.status.code === "S200") {
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: 'นำเข้าข้อมูลสำเร็จ',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(async (result) => {
                    if (result.value) {
                        setLoading(false);
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ผิดพลาด",
                    text: 'นำเข้าข้อมูลไม่สำเร็จ',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(async (result) => {
                    if (result.value) {
                        setLoading(false);
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    };

    const actionBoutton = [{}];

    return (
        <Skeleton loading={loading} active>

            <Row className='d-flex justify-content-center mt-10'>
                <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>Import image TFI</Text>
            </Row>

            <Row className='d-flex justify-content-left align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>ไฟล์ zip :</Text>
                <div className='border w-25 text-center text-overflow-import' style={{ paddingTop: '3px', height: '30px', marginRight: '10px' }}>
                    {nameFile}
                </div>
                <Upload
                    name="file"
                    beforeUpload={fileHandler}
                    multiple={false}
                    fileList={UploadFile}
                    className='upload-excel-custom'
                >
                    <Button type='primary' style={{ borderColor: 'black' }} icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
            </Row>

            <FormDefault
                buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
                formWrapper={{ md: 24, lg: 19, xl: 21 }}
                typeButton="primary"
                submitText="นำเข้าข้อมูล"
                fields={fields}
                onFinish={handleSubmit}
                action={actionBoutton}
            />
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
)(ImportFileTfi);
