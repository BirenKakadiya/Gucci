
import React, { useEffect, useState } from 'react'
import './Login.css';
import { Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {

    const [mail, setMail] = useState('')
    const [upass, setUpass] = useState('')
    const [num, setNum] = useState('')
    const [gotp, setGotp] = useState('')
    const [otp, setOtp] = useState('')
    const [fewdata, setFewdata] = useState([])

    // const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem('logdata', JSON.stringify(fewdata))
    }, [fewdata])

    let x = JSON.parse(localStorage.getItem('newdata'))

    const createotp = () => {
        let OTP = ''
        let digits = '0123456789';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        setGotp(OTP)
        alert(OTP);
    }



    const login = () => {

        let obj = {
            mail: mail,
            num: num,
        }
        setFewdata([...fewdata, obj])
        localStorage.setItem('logdata', JSON.stringify(fewdata))


        let validMail = false
        let validPass = false
        let validNum = false
        for (let i = 0; i < x.length; i++) {
            if (mail == x[i].email) {
                validMail = true
                if (upass == x[i].pass) {
                    validPass = true
                    if (num == x[i].num) {
                        validNum = true
                    }
                }
            }
        }
        if (validMail && validPass && validNum) {
            if (otp == '') {
                alert('Please enter OTP')
            }
            else {
                if (gotp == otp) {
                    window.location.href = '/admin'
                }
                else {
                    alert('not valid your OTP')
                }
            }
        }
        else {
            if (validMail) {
                if (validPass) {
                    alert('Enter valid Number')
                }
                else {
                    alert('Enter valid Password')
                }
            }
            else {
                alert('Enter valid E-mail')
            }
        }

    }

    return (
        <>
            <Container>
                <Row>
                    <div className="col-12">
                        <div class="login-box">
                            <h2>Admin Login</h2>

                            <div class="user-box">
                                <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} name="" placeholder='Enter your E-mail' required="" />
                                <label>E-mail</label>
                            </div>
                            <div class="user-box">
                                <input type="password" value={upass} onChange={(e) => setUpass(e.target.value)} name="" placeholder='Enter your password' required="" />
                                <label>Password</label>
                            </div>
                            <div class="user-box">
                                <input type="number" value={num} onChange={(e) => setNum(e.target.value)} placeholder='Enter your number' name="" required="" />
                                <label>Number</label>
                            </div>
                            <div className="otp1">
                                <p onClick={createotp}>Send OTP</p>
                            </div><br />
                            <div class="user-box">
                                <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter valid OTP' name="" required="" />
                            </div>

                            <div className="plat1">
                                <h6 className='tex1'>Don't have an account ? <Link className='bt2' to={'/Register'}>Register</Link></h6>
                            </div>

                            <div >
                                <h6 className="plate">
                                    <Link className='bt1' onClick={login}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Login
                                    </Link>
                                </h6>
                            </div>

                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}



