/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Col, Row, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { chngePasswordAPI } from '../../../service/api/auth';
import { _isEmpty } from '../../../tools/util'
import md5 from 'blueimp-md5'
import Swal from "sweetalert2";


const UserChangePassword = (props) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ staffId: !_isEmpty(props.location.state) ? props.location.state.username : "" });
    }, [props.location.state])

    const onFinish = async (values) => {
        try {
            const userData = {
                staffId: values.staffId,
                password: md5(values.password),
                newPassword: md5(values.newPassword),
                confirmNewPassword: md5(values.confirmNewPassword)
            }

            const res = await chngePasswordAPI(userData, props.auth.token)
            if (res.status.code === "S200") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login is success",
                    showConfirmButton: false,
                    timer: 1500
                });
                props.history.push("/login");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login is Fail ",
                    text: res.status.message
                });
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Row className="min-vh-100 h-100 w-100 bg_primary d-flex justify-content-center align-items-center">
            <Col lg={9} className="d-flex justify-content-center align-items-center w-100 ">
                <Card bordered={false} bodyStyle={{ width: "100%" }} className="wh-100 p-30 d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center flex-column align-items-center ">
                        <img src={'/assets/img/brand/logo.jpg'} alt="logo" className="rounded-circle" width="100" height="100" />
                        <h1 className="text-uppercase text-primary font-weight-600 mb-50">Change Password</h1>
                    </div>
                    <Form
                        form={form}
                        name="login"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="staffId"
                            rules={[{ required: true, message: 'Please input your staff Id!' }]}
                        >
                            <Input size="large" placeholder="username" prefix={<UserOutlined />} className="rounded-pill p-15 shadow-sm " />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password size="large" placeholder="password" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password size="large" placeholder="new password" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
                        </Form.Item>
                        <Form.Item
                            name="confirmNewPassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password size="large" placeholder="Confirm new password" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
                        </Form.Item>
                        <Form.Item className="mt-30">
                            <Button className="button-submit rounded-pill text-uppercase text-white w-100 p-15 h-auto font-weight-600 mt-30" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row >

    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserChangePassword)
