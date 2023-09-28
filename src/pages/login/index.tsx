import React, { useState } from 'react'
import './index.css'
import { request } from '@/util/request'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const SignIn = () => {
    request
      .post(
        'http://127.0.0.1:8083/api/get-account',
        { identifier: account, password: password },
        (res) => {
          if (res.token) {
            window.localStorage.setItem('Access-Token', res.token)
            navigate('/home')
          }
        },
        (res) => {
          console.log(res)
        }
      )
      .then()
  }
  const handleViewAsGuest = () => {
    navigate('/home')
  }
  return (
    <div
      className="background"
      style={{
        backgroundImage: 'url(http://123.207.40.28/login2.jpg)'
      }}
    >
      <div className="info-container">
        <div className="login-form">
          <div className="form-title pt-4">Login In</div>
          <div className="input-container">
            <p className="ma-0">Account NO</p>
            <input
              id="password_field"
              className="input-field"
              type="text"
              name="input-name"
              placeholder="Enter your account number"
              value={account}
              onChange={(val: any) => {
                setAccount(val.target.value)
              }}
            />
            <p className="ma-0">Password</p>
            <input
              id="password_field"
              className="input-field"
              type="password"
              name="input-name"
              placeholder="Enter your password"
              value={password}
              onChange={(val: any) => {
                setPassword(val.target.value)
              }}
            />
          </div>
          <button className="button my-4" onClick={SignIn}>
            Sign In
          </button>
        </div>
        <div className="bottom-wrap">
          <div className="divider-box">
            <span></span>
            <span className="text-white f-w-700 f-s-18">OR</span>
            <span></span>
          </div>
          <div className="text-center my-4">Explore the Website as a Guest.</div>
          <div className="main_div">
            <button onClick={handleViewAsGuest}>Go For It</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
