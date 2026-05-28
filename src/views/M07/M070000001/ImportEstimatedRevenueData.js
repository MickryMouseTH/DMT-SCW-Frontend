/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Row, Upload, message } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { UploadOutlined } from '@ant-design/icons';
import { UPLOAD_FILE_EXCEL_M070000001 } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero } from "../../../tools/util";
import file from './ข้อมูลวันหยุดปี-2567.xlsx'

const { Text } = Typography;

const ImportEstimatedRevenueData = (props) => {
    const [loading, setLoading] = useState(false)
    const [UploadFile, setUploadFile] = useState([])
    const [nameFile, setNameFile] = useState('')

    const fileHandler = fileList => {
        let fileObj = fileList;

        if (!_isEmpty(fileObj)) {
            console.log("fileObj.type :" + fileObj.type);
            // if (fileObj.type === "application/vnd.ms-excel")
            if (fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                message.success('อัปโหลดไฟล์สำเร็จ');
                setNameFile(fileList.name)
                setUploadFile([fileList])

            } else {
                message.error('อัปโหลดไฟล์ไม่สำเร็จ กรุณาอัปโหลดไฟล์ Excel (.xlsx) เท่านั้น ');
                return false;
            }

        } else {
            return false;
        }

        return false;
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('file', UploadFile[0])

            const res = await UPLOAD_FILE_EXCEL_M070000001(formData, props.auth.token)
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
                <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>นำเข้าข้อมูลวันหยุด</Text>
            </Row>
            <Row className='d-flex justify-content-center align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>ข้อมูลวันหยุด :</Text>
                <div className='border w-25 text-center text-overflow-import' style={{ paddingTop: '3px', height: '30px', marginRight: '10px' }}>
                    {nameFile}
                </div>
                <Upload
                    name="file"
                    beforeUpload={fileHandler}
                    // beforeUpload={{}}
                    multiple={false}
                    fileList={UploadFile}
                    className='upload-excel-custom'
                >
                    <Button type='primary' style={{ borderColor: 'black' }} icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
                <a href={file} className='ml-20' download="ข้อมูลวันหยุดปี-2567">ตัวอย่างรูปแบบไฟล์</a>
            </Row>

            <Row className='d-flex justify-content-end mr-50'>
                <Button
                    onClick={handleSubmit}
                    size="large"
                    type="primary"
                    style={{ marginBottom: 16, marginLeft: 10 }}
                >
                    นำเข้าข้อมูล
                </Button>
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
)(ImportEstimatedRevenueData);
