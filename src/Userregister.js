import React, { useState } from 'react'
import './Login.css';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Userregister() {


    const createotp = () => {
        let OTP = ''
        let digits = '0123456789';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        setGotp(OTP)
        alert(OTP);
    }


    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [num, setNum] = useState('')
    const [otp, setOtp] = useState('')
    const [Genrateotp, setGotp] = useState('')
    const [card, setCard] = useState([])
    const [address, setAddress] = useState([])
    const [order, setOrder] = useState([])


    const submit = () => {
        let obj = {
            name: name,
            email: email,
            pass: pass,
            num: num,
            otp: otp,
            card: card,
            address: address,
            order: order,
            id: Date.now()
        }
        let already = false
        if (JSON.parse(localStorage.getItem('userdata'))) {

            for (let i = 0; i < data.length; i++) {
                if (email == data[i].email) {
                    already = true
                }
            }
        }

        if (name == '', email == '', pass == '', num == '') {
            alert('please fill in data')
        }
        else {
            var mobileNumber = document.getElementById("unum").value;
            var lblError = document.getElementById("lblError");
            var expr = /^(0|91)?[6-9][0-9]{9}$/;

            if (!expr.test(mobileNumber)) {
                lblError.innerHTML = "";
                alert("Invalid Mobile Number")
            }
            else {
                if (Genrateotp == otp) {
                    if (already) {
                        alert('already register')
                    }
                    else {
                        if (otp == '') {
                            alert('Please enter OTP')
                        }
                        else {
                            setName('')
                            setEmail('')
                            setPass('')
                            setNum('')
                            setOtp('')
                            setData([...data, obj])
                            console.log(data);
                            localStorage.setItem('userdata', JSON.stringify([...data, obj]))
                        }
                    }
                }
                else {
                    alert('Not valid your OTP')
                }
            }

            console.log(data);
        }
    }



    return (
        <>
            <Container>
                <Row>
                    <div className="col-12">
                        <div class="login-box">
                            <h2>Animated Register</h2>

                            <div class="user-box">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' name="" required="" />
                                <label>User name</label>
                            </div>
                            <div class="user-box">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-mail' name="" required="" />
                                <label>E-mail</label>
                            </div>
                            <div class="user-box">
                                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter your password' name="" required="" />
                                <label>Password</label>
                            </div>
                            <div class="user-box">
                                <input type="number" value={num} id='unum' onChange={(e) => setNum(e.target.value)} placeholder='Enter your number' name="" required="" />
                                <label>Number</label>
                                <span id='lblError'></span>
                            </div>
                            <div className="otp1">
                                <p onClick={createotp}>Send OTP</p>
                            </div><br />
                            <div class="user-box">
                                <input type="number" value={otp} placeholder='Enter valid OTP' onChange={(e) => setOtp(e.target.value)} name="" required="" />

                            </div>
                            <h6 className='tex1'>Login Your Account / <Link className='bt2' to={'/userlogin'}>Login</Link> </h6>

                            <div >
                                <h6 className="plate">
                                    <Link className='bt1' onClick={submit}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Register
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
