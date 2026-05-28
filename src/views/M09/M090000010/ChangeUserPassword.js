/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Col, Row, Card } from 'antd';
import Skeleton from "../../../components/loading/Loading"

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { chngePasswordAPI } from '../../../service/api/auth';
import { _isEmpty } from '../../../tools/util'
import md5 from 'blueimp-md5'
import Swal from "sweetalert2";

const ChangeUserPassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
      form.setFieldsValue({ staffId: !_isEmpty(props.location.state) ? props.location.state.username : "" });
  }, [props.location.state])

  const onFinish = async (values) => {
      try {
        setLoading(true);
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
              setLoading(false);
              props.history.push("/login");
          } else {
              Swal.fire({
                  icon: "error",
                  title: "Login is Fail ",
                  text: res.status.message
              });
              setLoading(false);
          }
      } catch (error) {
          console.log(error)
      }
  };
  return (
    <Skeleton loading={loading} active>
    <Row className="min-vh-85  h-100 w-100 d-flex justify-content-center align-items-center">
        <Col lg={9} className="d-flex justify-content-center align-items-center w-100 ">
            <Card bordered={true} bodyStyle={{ width: "100%" }} className="wh-100 p-30 d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center flex-column align-items-center ">
                    <h1 className="text-uppercase text-primary font-weight-600 mb-50">เปลี่ยนรหัสผ่าน</h1>
                </div>
                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="staffId"
                        rules={[{ required: true, message: 'กรูณาป้อนรหัสพนักงาน!' }]}
                    >
                        <Input size="large" placeholder="รหัสพนักงาน" prefix={<UserOutlined />} className="rounded-pill p-15 shadow-sm " />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'กรูณาป้อนรหัสผ่าน!' }]}
                    >
                        <Input.Password size="large" placeholder="รหัสผ่าน" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: 'กรูณาป้อนรหัสผ่านใหม่!' }]}
                    >
                        <Input.Password size="large" placeholder="รหัสผ่านใหม่" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
                    </Form.Item>
                    <Form.Item
                        name="confirmNewPassword"
                        rules={[{ required: true, message: 'กรูณายืนยันรหัสผ่านใหม่!' }]}
                    >
                        <Input.Password size="large" placeholder="ยืนยันรหัสผ่านใหม่" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
                    </Form.Item>
                    <Form.Item className="mt-30 text-center">
                        <Button className="button-submit rounded-pill text-uppercase text-white w-100 p-15 h-auto font-weight-600 mt-30" htmlType="submit" >
                            ยืนยัน
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row >
    </Skeleton>
)
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserPassword)
