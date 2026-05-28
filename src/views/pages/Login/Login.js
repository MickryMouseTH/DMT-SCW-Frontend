/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
import md5 from 'blueimp-md5'

import { Form, Input, Button, Col, Row, Card} from 'antd';
import Skeleton from "../../../components/loading/Loading"

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Hidden } from '../../../components/grid'
import ThemeToggle from '../../../theme/ThemeToggle'

import { userlogin } from '../../../redux/actions/authAction'
const Login = (props) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      props.history.push("/");
    }
    /* eslint-disable jsx-a11y/anchor-is-valid */
  }, [props])

  const onFinish = async (values) => {
    setLoading(true)
    const userData = {
      "staffId": values.username,
      "password": md5(values.password)
    }

    props.userlogin(userData, (res, data) => {

      const sendItem = {
        username: values.username
      }
      if (res === "success") {
        setLoading(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login is success",
          showConfirmButton: false,
          timer: 1500
        });
        props.history.push("/");
        return
      } else if (res === "password expired") {
        Swal.fire({
          icon: "error",
          title: "Login is Fail ",
          text: data.message,
        });
        // props.history.push("/changepassword");
        props.history.push({
          pathname: "/changepassword",
          state: { ...sendItem }
        })
        return
      }
      else if (res === "server error") {
        Swal.fire({
          icon: "error",
          title: data.message,
          text: 'เครื่องนี้ไม่สามารถเข้าใช้งานระบบ SCW ได้ กรุณาติดต่อผู้ดูแลระบบเพื่อตั้งค่า IP',
        });
      }
      else {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Login is Fail ",
          text: data.message,
        });
        return
      }
    })
  };

  return (
    <Skeleton loading={loading} active>
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <ThemeToggle compact />
      </div>
      <Row className="h-100 min-vh-100">
        <Hidden show={["lg", "md"]}>
          <Col lg={12} className="bg_primary d-flex justify-content-center align-items-center w-100 ">
            <Row justify="center" className="text-center text-white">
              <Col md={24}><p className="text-20">WELCOME TO</p></Col>
              <Col md={24} className="d-flex justify-content-center m-50"><img src={'/assets/img/brand/logo.jpg'} alt="logo" width="200" height="200" /></Col>
              <Col md={24}><h1 className="text-white text-30">TOLLWAY</h1></Col>
              <Col md={24}><p className="text-20">DON MUANG TOLLWAY PUBLIC Co.,LTD,</p></Col>
            </Row>
          </Col>
        </Hidden>
        <Col lg={12} className="bg_img d-flex justify-content-center align-items-center w-100 p-50">
          <Card bordered={false} bodyStyle={{ width: "100%" }} style={{ opacity: 0.9 }} className="wh-100 p-50 d-flex justify-content-center align-items-center">
            <h1 className="text-uppercase text-primary font-weight-600 mb-50">sign in </h1>
            <Form
              name="login"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                // className="mb-10"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input size="large" placeholder="username" prefix={<UserOutlined />} className="rounded-pill p-15 shadow-sm " />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size="large" placeholder="password" prefix={<LockOutlined />} className="rounded-pill p-15 shadow-sm " />
              </Form.Item>
              <Form.Item className="mt-25">
                <Button className="button-submit rounded-pill text-uppercase text-white w-100 p-15 h-auto font-weight-600 mt-30" htmlType="submit" >
                  sign in
              </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  userlogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
