import React from 'react'
import Navigate from './Navigate'
import { Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import './Website.css';
import bar from './image/more.png'
import { Link } from 'react-router-dom';

export default function Profile() {


    const [currentUser, setCurrentUser] = useState([])
    const [showaddress, setShowaddress] = useState([])

    useEffect(() => {

        let data = JSON.parse(localStorage.getItem('userdata')) ? JSON.parse(localStorage.getItem('userdata')) : ""
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == localStorage.getItem('userlogdata')) {
                setCurrentUser(data[i])

            }
        }

        let usr = JSON.parse(localStorage.getItem('userdata'))
        let userAddress = []

        if (usr) {
            for (let i = 0; i < usr.length; i++) {
                if (usr[i].id == localStorage.getItem('userlogdata')) {
                    userAddress = usr[i].address
                    console.log(userAddress);
                }
            }
        }
        setShowaddress(userAddress)
        console.log(userAddress);

    }, [])

    const [showModal, setShowmodal] = useState(false);
    const handleClose = () => setShowmodal(false);
    const handleShow = () => setShowmodal(true);

    const [area, setArea] = useState('')
    const [nearby, setNearby] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')


    const adddressData = () => {

        let data = JSON.parse(localStorage.getItem("userdata"))

        console.log(data);
        let obj = {
            area: area,
            nearby: nearby,
            city: city,
            pin: pin,
            date: Date(),
            id: Date.now(),
        }


        setShowaddress([obj])

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == localStorage.getItem('userlogdata')) {
                data[i].address = [obj]
                localStorage.setItem('userdata', JSON.stringify(data))
            }
        }

        setArea('')
        setNearby('')
        setCity('')
        setPin('')

        handleClose()
    }


    const [show, setShow] = useState(false)
    const hanldeSidebar = () => {
        if (show) {
            setShow(false)
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('sidebar').style.left = '-280px'
        } else {
            setShow(true)
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('sidebar').style.left = '0'
        }
    }


    const hanldeSidebarimg = () => {
        document.getElementById('functionSidebar').click()
    }



    return (
        <>
            <Navigate />

            <div className="btn-filter">
                <img src={bar} onClick={hanldeSidebarimg} width={50} className='menu-btn' alt="" />
            </div>


            <button className="d-none" id='functionSidebar' onClick={hanldeSidebar}></button>
            <div className='Sidebar' id='sidebar'>
                <div className="SidebarItem">
                    <div className="profile-side">
                        <Link to={'/profile'}><h4 className='pro-side'>Account</h4></Link>
                        <Link to={'/myorder'}><h4 className='pro-side'>My Order</h4></Link>

                    </div>
                </div>
            </div>
            <div className="overlay" onClick={hanldeSidebar} id='overlay'></div>


            <div className="profile-detail">

                <Container className='sec1'>
                    <Row>

                        <div className="col-lg-12">
                            <div className="personal">
                                <h4 className='head-pro'>Personal Detail</h4>
                            </div>
                            <div className="profile-1">
                                <div className="profile-2">
                                    <div className="profile-img">
                                        <img src='' className='' alt="" />
                                    </div>
                                    <h5><span className='menu-plate'>Name: </span> {currentUser.name}</h5>
                                    <h5><span className='menu-plate'>E-mail:</span> {currentUser.email}</h5>
                                    <h5><span className='menu-plate'>Number:</span> {currentUser.num}</h5>
                                </div>
                            </div>
                        </div>

                    </Row>
                </Container>


                <Container className='sec1'>
                    <Row>

                        <div className="col-lg-12">
                            <div className="personal">
                                <h4 className='head-pro'>Residental Detail</h4>
                                <h5 variant="primary" className='edit-btn' onClick={handleShow}>
                                    <i class="bi bi-pencil-square"></i>
                                </h5>
                            </div>
                            <div className="profile-1">
                                <div className="profile-2">
                                    <div className="profile-img">
                                        <img src='' className='' alt="" />
                                    </div>


                                    <div className="add-ress">

                                        <h5><span className='menu-plate'> Address line1: </span> {showaddress[0]?.area || ''}</h5>
                                        <h5><span className='menu-plate'>Near By:</span> {showaddress[0]?.nearby || ''}</h5>
                                        <h5><span className='menu-plate'>City:</span> {showaddress[0]?.city || ''}</h5>
                                        <h5><span className='menu-plate'>Pin-code:</span> {showaddress[0]?.pin || ''}</h5>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </Row>
                </Container>




                <Modal show={showModal} onHide={handleClose} centered  >
                    <Modal.Header closeButton>
                        <Modal.Title>Residental Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className='name-plt'>Address Line1 :</span> <br /> <textarea value={area} onChange={(e) => setArea(e.target.value)} name="" id="" cols="50" rows="3"></textarea><br /><br />
                        <span className='name-plt'>Near By :</span> <br /> <input type="text" value={nearby} onChange={(e) => setNearby(e.target.value)} className='inp-plate' /><br /><br />
                        <span className='name-plt'>City :</span> <br /> <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='inp-plate' /><br /><br />
                        <span className='name-plt'>Pin-code :</span> <br /> <input type="number" value={pin} onChange={(e) => setPin(e.target.value)} className='inp-plate' /><br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={adddressData}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    )
}
