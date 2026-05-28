/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Row, Upload, message ,Select  } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { UploadOutlined } from '@ant-design/icons';
import { UPLOAD_FILE_BANK_M060000003 } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero } from "../../../tools/util";

const { Text } = Typography;
const { Option } = Select;

const PassingTransactions = (props) => {
    const [loading, setLoading] = useState(false)
    const [UploadFile, setUploadFile] = useState([])
    const [nameFile, setNameFile] = useState('')
    const [typeSelect,setUploadType] = useState(1)

    const typeInfo = [
        {
          name: "EMV",
          value: 1
        },
        {
          name: "QR",
          value: 2
        },
      ];

    const fileHandler = fileList => {
        let fileObj = fileList;

        if (!_isEmpty(fileObj)) {
            if (fileObj.type === "text/plain")
            // || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") 
            {
                message.success('อัปโหลดไฟล์สำเร็จ');
                setNameFile(fileList.name)
                setUploadFile([fileList])

            } else {
                message.error('อัปโหลดไฟล์ไม่สำเร็จ กรุณาอัปโหลดไฟล์ Excel (.xls) เท่านั้น ');
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
            formData.append('type', typeSelect)

            const res = await UPLOAD_FILE_BANK_M060000003 (formData, props.auth.token)
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
            } 
            else if(res.status.code === "F303") {
                Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    text: `นำเข้าข้อมูลไม่สำเร็จ ${res.status.message}`,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(async (result) => {
                    if (result.value) {
                        setLoading(false);
                        
                    }
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "ผิดพลาด",
                    text: `นำเข้าข้อมูลไม่สำเร็จ ${res.status.message}`,
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

    

    const handleChange = (type) => {
        setUploadType(type.value)
      
      }

    return (
        <Skeleton loading={loading} active>
            <Row className='d-flex justify-content-center mt-10'>
                <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>นำเข้าข้อมูล EMV และ QR จากธนาคาร</Text>
            </Row>
            <Row className='d-flex justify-content-center align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>ประเภทข้อมูล :</Text>
                <div >
                <Select
                    labelInValue
                    defaultValue={{ value: typeInfo[0].value }}
                    style={{ width: 200 }}
                    onChange={handleChange }
                >
                    {typeInfo.map((item,idx)=>{
                        return(<Option value={item.value} key={idx}>{item.name}</Option>)
                    })}
                
                </Select>
                </div>
                
            </Row>

            <Row className='d-flex justify-content-center align-items-center mt-40 mb-40'>
                <Text style={{ fontSize: '17px', marginRight: '10px' }}>ข้อมูลรายได้ :</Text>
                <div className='border w-25 text-center text-overflow-import' style={{ paddingTop: '3px', height: '30px', marginRight: '10px' }}>
                    {nameFile}
                </div>
                <Upload
                    name="file"
                    beforeUpload={fileHandler}
                    // listType="picture-card"
                    multiple={false}
                    fileL   ist={UploadFile}
                    className='upload-excel-custom'
                >
                    <Button type='primary' style={{ borderColor: 'black' }} icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
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
)(PassingTransactions);
