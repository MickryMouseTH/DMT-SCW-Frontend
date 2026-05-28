/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Row, Upload, message } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { UploadOutlined } from '@ant-design/icons';
import { UPLOAD_FILE_MTC_M090000014, UPLOAD_FILE_IMAGES_MTC_M090000014, UPLOAD_FILE_ETC_M090000014 } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero } from "../../../tools/util";

const { Text } = Typography;

const ImportFileTransactionData = (props) => {
    const [loading, setLoading] = useState(false)
    const [UploadFileMtc, setUploadFileMtc] = useState([])
    const [nameFileMtc, setNameFileMtc] = useState('')
    const [UploadFileMtcImage, setUploadFileMtcImage] = useState([])
    const [nameFileMtcImage, setNameFileMtcImage] = useState('')
    const [UploadFileEtc, setUploadFileEtc] = useState([])
    const [nameFileEtc, setNameFileEtc] = useState('')
    
    const fileHandlerMtcImage = fileList => {
        let fileObj = fileList;
        if (!_isEmpty(fileObj)) {
            if (fileObj.type === "application/x-zip-compressed") {
                message.success('อัปโหลดไฟล์สำเร็จ');
                setNameFileMtcImage(fileList.name)
                setUploadFileMtcImage([fileList])
            } else {
                message.error('อัปโหลดไฟล์ไม่สำเร็จ กรุณาอัปโหลดไฟล์ Zip (.zip) เท่านั้น ');
                return false;
            }
        } else {
            return false;
        }
        return false;
    };

    const fileHandlerMtc = fileList => {
        let fileObj = fileList;
        if (!_isEmpty(fileObj)) {
            if (fileObj.type === "application/x-zip-compressed") {
                message.success('อัปโหลดไฟล์สำเร็จ');
                setNameFileMtc(fileList.name)
                setUploadFileMtc([fileList])
            } else {
                message.error('อัปโหลดไฟล์ไม่สำเร็จ กรุณาอัปโหลดไฟล์ Zip (.zip) เท่านั้น ');
                return false;
            }
        } else {
            return false;
        }
        return false;
    };

    const fileHandlerEtc = fileList => {
        let fileObj = fileList;
        if (!_isEmpty(fileObj)) {
            if (fileObj.type === "application/x-zip-compressed") {
                message.success('อัปโหลดไฟล์สำเร็จ');
                setNameFileEtc(fileList.name)
                setUploadFileEtc([fileList])
            } else {
                message.error('อัปโหลดไฟล์ไม่สำเร็จ กรุณาอัปโหลดไฟล์ Zip (.zip) เท่านั้น ');
                return false;
            }
        } else {
            return false;
        }
        return false;
    };
    
    const handleSubmitFileMtcImage = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('file', UploadFileMtcImage[0])
            const res = await UPLOAD_FILE_IMAGES_MTC_M090000014(formData, props.auth.token)
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

    const handleSubmitFileMtc = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('file', UploadFileMtc[0])
            const res = await UPLOAD_FILE_MTC_M090000014(formData, props.auth.token)
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

    const handleSubmitFileEtc = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('file', UploadFileEtc[0])
            const res = await UPLOAD_FILE_ETC_M090000014(formData, props.auth.token)
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

    return (
        <Skeleton loading={loading} active>
            <Row className='d-flex justify-content-center mt-10'>
                <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>โหลดข้อมูลจากช่องทางด้วยมือ (Manual load toll transaction files)</Text>
            </Row>
            <Row className='d-flex justify-content-center align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>MTC Lane กรุณาระบุไฟล์ .zip ที่ต้องการโหลด :</Text>
                <div className='border w-25 text-center text-overflow-import' style={{ paddingTop: '3px', height: '30px', marginRight: '10px' }}>
                    {nameFileMtc}
                </div>
                <Upload
                    name="file"
                    beforeUpload={fileHandlerMtc}
                    // listType="picture-card"
                    multiple={false}
                    fileList={UploadFileMtc}
                    className='upload-excel-custom'
                >
                    <Button type='primary' size="large" style={{ borderColor: 'black' }} icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
                <Button type="primary" size="large" style={{ marginTop: 16, marginBottom: 16, marginLeft: 10 }} onClick={handleSubmitFileMtc}>นำเข้าข้อมูล MTC</Button>
            </Row>
            <Row className='d-flex justify-content-center align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>MTC Images กรุณาระบุไฟล์ .zip ที่ต้องการโหลด :</Text>
                <div className='border w-25 text-center text-overflow-import' style={{ paddingTop: '3px', height: '30px', marginRight: '10px' }}>
                    {nameFileMtcImage}
                </div>
                <Upload
                    name="file"
                    beforeUpload={fileHandlerMtcImage}
                    // listType="picture-card"
                    multiple={false}
                    fileList={UploadFileMtcImage}
                    className='upload-excel-custom'
                >
                    <Button type='primary' size="large" style={{ borderColor: 'black' }} icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
                <Button type="primary" size="large" style={{ marginTop: 16, marginBottom: 16, marginLeft: 10 }} onClick={handleSubmitFileMtcImage}>นำเข้ารูป MTC</Button>
            </Row>
            <Row className='d-flex justify-content-center align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>ETC Lane กรุณาระบุไฟล์ .zip ที่ต้องการโหลด :</Text>
                <div className='border w-25 text-center text-overflow-import' style={{ paddingTop: '3px', height: '30px', marginRight: '10px' }}>
                    {nameFileEtc}
                </div>
                <Upload
                    name="file"
                    beforeUpload={fileHandlerEtc}
                    // listType="picture-card"
                    multiple={false}
                    fileList={UploadFileEtc}
                    className='upload-excel-custom'
                >
                    <Button type='primary' size="large" style={{ borderColor: 'black' }} icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
                <Button type="primary" size="large" style={{ marginTop: 16, marginBottom: 16, marginLeft: 10 }} onClick={handleSubmitFileEtc}>นำเข้าข้อมูล ETC</Button>
            </Row>

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
)(ImportFileTransactionData);
