/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import jwt from "jsonwebtoken"

import { Button } from 'antd'

import { _isEmpty } from '../../../tools/util'
import { isLogin, userLogout, refreshToken } from '../../../redux/actions/authAction'

// let countDownInterval = null

const ComingSoon = (props) => {
  const SECOND = 1000
  const MINUTE = SECOND * 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutese] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [expiresToken, setExpiresToken] = useState(0)

  useEffect(() => { checkLogin() }, [])
  useEffect(() => {
    const expires = getExpiresToken()
    setExpiresToken(expires)
  }, [props])

  useEffect(() => {
    countDown()
    let countDownInterval = setInterval(countDown, SECOND)
    return () => clearInterval(countDownInterval)
  }, [expiresToken])

  const countDown = () => {
    if (expiresToken > 0) {
      const now = new Date().getTime()
      // const endTime = (getExpiresToken() * 1000)
      const endTime = (expiresToken * 1000)
      const unixTimeLeft = endTime - now
      if (endTime >= now) {
        setDays(Math.floor(unixTimeLeft / DAY))
        setHours(Math.floor(unixTimeLeft % DAY / HOUR))
        setMinutese(Math.floor(unixTimeLeft % HOUR / MINUTE))
        setSeconds(Math.floor(unixTimeLeft % MINUTE / SECOND))
      } else {
        props.userLogout((res) => {
          // if (res === 'success') {
          // }
          props.history.push('/login')
        })
      }
    }
  }

  const getExpiresToken = () => {
    const payload = jwt.decode(props.auth.token.atoken)
    return !_isEmpty(payload) ? payload.exp : 0
  }

  const checkLogin = () => {
    try {
      props.isLogin(async (res) => {
        if (res === "fail") props.history.push('/login')
        if (res !== 'success') {
          await props.userLogout((res) => {
            // if (res === 'success') {
            // }
            props.history.push('/login')
          })
        }
      })
    } catch (error) {
      props.userLogout((res) => {
        if (res === 'success') {
          props.history.push('/login')
        }
      })
      props.history.push('/login')
    }
  }


  const handleLogout = () => {
    props.userLogout((res) => {
      if (res === 'success') {
        props.history.push('/login')
      }
    })
  }
  const handleRefreshToken = () => {
    props.refreshToken((res) => {
      if (res === 'success') {
        // props.history.push('/login')
      }
    })
  }

  return (
    <div className="bg_primary text-white wh-100 d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-white"> Coming Soon...</h1>
      <p>รหัสผ่านของคุณจะหมดอายุใน</p>
      <div >Day: {days}  Hours: {hours}  Minutes: {minutes}  Seconds: {seconds}</div>
      <div>
        <Button className="text-uppercase mt-20 mr-10" onClick={handleRefreshToken}>Refresh Token</Button>
        <Button className="text-uppercase mt-20" onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  isLogin,
  userLogout,
  refreshToken
}

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon)
