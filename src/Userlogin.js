
import React, { useEffect, useState } from 'react'
import './Login.css';
import { Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


export default function Userogin() {

    const [mail, setMail] = useState('')
    const [upass, setUpass] = useState('')

    const [usrdata, setFewdata] = useState([])
    const navigate = useNavigate()

    // const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem('userlogdata', JSON.stringify(usrdata))
    }, [usrdata])

    let usd = JSON.parse(localStorage.getItem('userdata'))





    const login = () => {

        let validMail = false
        let validPass = false


        for (let i = 0; i < usd.length; i++) {
            if (mail == usd[i].email) {
                validMail = true
                if (upass == usd[i].pass) {
                    validPass = true
                    localStorage.setItem('userlogdata', JSON.stringify(usd[i].id))

                }
            }
        }
        if (validMail && validPass) {
            navigate('/website')
        }
        else {
            if (validMail) {
                alert('Enter valid password')
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
                            <h2>Animated Login</h2>

                            <div class="user-box">
                                <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} name="" placeholder='Enter your E-mail' required="" />
                                <label>User E-mail</label>
                            </div>
                            <div class="user-box">
                                <input type="password" value={upass} onChange={(e) => setUpass(e.target.value)} name="" placeholder='Enter your password' required="" />
                                <label>Password</label>
                            </div>


                            <div className="plat1">
                                <h6 className='tex1'>Don't have an account ? <Link className='bt2' to={'/userregister'}>Register</Link></h6>
                            </div>

                            <div >
                                <h6 className="plate">
                                    <p className='bt1' onClick={login}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Login
                                    </p>
                                </h6>
                            </div>

                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}



