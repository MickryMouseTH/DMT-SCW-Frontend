import React from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../../redux/actions/authAction'
import { Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const Logout = ({ lng, ...props }) => {

    const handleLogout = () => {
        props.userLogout((res) => {
            if (res === 'success') {
                window.location.href = '/';
            }
            else {
                localStorage.removeItem("user_data");
                localStorage.removeItem("user_token");
                window.location.href = '/';
            }
        })
    }

    return (
        <div className="sidebar-footer shadow-sm d-flex align-items-end">
            <span className="w-100 logout-button" onClick={handleLogout}>
                <Row className="justify-content-between">
                    <Col>ออกจากระบบ</Col>
                    <Col><PoweroffOutlined className="mr-10" /></Col>
                </Row>
            </span>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
