import React, { useEffect, useState } from 'react'
import { Carousel, Container, Row } from 'react-bootstrap'
import banner1 from './image/6.jpg'
import banner2 from './image/4.jpg'
import banner3 from './image/5.jpg'
import banner4 from './image/pc-1.jpg'
import newarrival from './image/New-Arrival.png'
import Atropos from 'atropos/react';
import { Link, useNavigate } from 'react-router-dom'
import Navigate from './Navigate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-range-slider-input/dist/style.css';
import axios from 'axios';
import './Website.css';


export default function Website() {

    const navigate = useNavigate()
    useEffect(() => {


        let x = JSON.parse(localStorage.getItem('productdata'))
        // console.log(x);
        setData(x)





    }, [])

    const [data, setData] = useState([])


    const defincard = (id) => {
        localStorage.setItem('pid', JSON.stringify(id))
        navigate('/product')
    }

    const addToCaryt = (id) => {


        let usr = JSON.parse(localStorage.getItem('userdata'));
        let logindata = localStorage.getItem('userlogdata')

        if (usr && logindata) {
            let index = usr.findIndex(i => i.id == logindata)


            let already = false
            for (let i = 0; i < usr[index].card.length; i++) {
                if (usr[index].card[i] === id) {
                    already = true
                }
            }

            if (already) {

                toast.error('Product is already in the cart !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                toast.success('Successfully Add to Cart', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                usr[index].card.push(id);
                localStorage.setItem('userdata', JSON.stringify(usr))

            }
        }
        else {
            toast.error('Please Login', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }



    }



    return (
        <>
            <Navigate />

            <div className="banner-bag">
                <Atropos className="my-atropos mt-5">
                    <img className='img-1 img-fluid' data-atropos-offset="-5" src={banner4} alt="" />
                </Atropos>
            </div>



            <Container className='section1'>
                <Row id='card'>
                    <div className="newarrival p-4">
                        <div className="arrival">
                            <img src={newarrival} className='img-newarrival' alt="" />
                        </div>
                        <div className="seeall">
                            <Link to={'/seeall'} className='sall'>See ALL</Link>
                        </div>
                    </div>
                    {data && data.slice(-4).map((item) => {

                        return (
                            <>
                                <div className="col-lg-3 mt-3 mb-3" >
                                    <div className="card-1">
                                        <img onClick={() => defincard(item.id)} src={item.image[0]} height={400} className='img-fluid img-2' alt="" />
                                        <h5 onClick={() => defincard(item.id)} className='pname'><span className='subname'></span> {item.name}</h5>
                                        <h5 onClick={() => defincard(item.id)} className='pprice'><span className='subname'>₹</span> {item.price}</h5>
                                        <div className="at-cart">
                                            <h5 style={{ fontSize: '17px' }} onClick={() => addToCaryt(item.id)}>ADD to Cart</h5>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </Row>
            </Container>


            <Carousel>
                <Carousel.Item interval={1000}>
                    <img src={banner1} />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img src={banner2} />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={banner3} />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>



            <ToastContainer />

        </>
    )
}
