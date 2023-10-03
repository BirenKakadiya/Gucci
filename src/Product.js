import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ReactImageMagnify from 'react-image-magnify'
import Navigate from './Navigate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-range-slider-input/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


export default function Product() {


    const [currentData, setcurrentData] = useState('')
    const [img, setImg] = useState('')
    const [currentUser, setLiveUser] = useState([])
    const [newOder, setNeworder] = useState([])
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        let productdata = JSON.parse(localStorage.getItem('productdata'))
        let pid = localStorage.getItem('pid')
        if (localStorage.getItem('orderList')) {
            setOrderData(JSON.parse(localStorage.getItem('orderList')))
        }

        for (let i = 0; i < productdata.length; i++) {
            if (productdata[i].id == pid) {
                setcurrentData(productdata[i])
                setImg(productdata[i].image[0]);
            }
        }

        let data = JSON.parse(localStorage.getItem('userdata')) ? JSON.parse(localStorage.getItem('userdata')) : ''

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == localStorage.getItem('userlogdata')) {
                setLiveUser(data[i])

            }

        }

        let usr = JSON.parse(localStorage.getItem('userdata'))
        let orderData = []

        if (usr) {
            for (let i = 0; i < usr.length; i++) {
                if (usr[i].id == localStorage.getItem('userlogdata')) {

                    orderData = usr[i].order
                    console.log(orderData);
                }

            }
        }

    }, [])

    const changeImage = (i) => {
        setImg(i)
    }

    const ProductOrder = (pid, price, image) => {

        let obj = {
            image: image,
            date: moment(Date.now()).format('DD-MM-YYYY (hh:mm:ss)'),
            orderId: Date.now(),
            productId: pid,
            price: price,
            currentUser: currentUser.id,
            Status:"0",
        }

        let usr = JSON.parse(localStorage.getItem('userdata'))

        if (usr) {


            let fillAddress = false
            for (let i = 0; i < usr.length; i++) {
                if (usr[i].id == localStorage.getItem('userlogdata')) {
                    if (usr[i].address == '') {
                        fillAddress = true
                    }
                }
            }
            if (fillAddress) {
                toast.error('Fill the address (PROFILE)', {
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
                toast.success('Your Order is Conform', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setOrderData([...orderData, obj])
                localStorage.setItem('orderList', JSON.stringify([...orderData, obj]))
                console.log(obj);


                for (let i = 0; i < usr.length; i++) {
                    if (usr[i].id == localStorage.getItem('userlogdata')) {
                        usr[i].order.push(obj)
                        console.log(newOder);
                        localStorage.setItem('userdata', JSON.stringify(usr))

                    }

                }


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

            <Container className='pt-5'>
                <Row className='pro-data'>
                    <div className="col-lg-12 col-sm-12 p-4">
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: false,
                                src: img ? img : '',
                                width: 500,
                                height: 500

                            },
                            largeImage: {
                                src: img ? img : '',
                                width: 850,
                                height: 850
                            }
                        }} />

                        <div className="im-1">
                            {currentData.image && currentData.image.map((i) => {
                                return (
                                    <>
                                        <img src={i} width={150} onClick={() => changeImage(i)} className='pimg' />
                                    </>
                                )
                            })}
                        </div>


                        <div className="menu-data p-3">

                            <h4 className='p-1'><span className='p1'>Name :</span> {currentData.name}</h4>
                            <h3 className='p-1'><span className='p1'>Details :</span> {currentData.details}</h3>
                            <h3 className='p-1'><span className='p1'>Catagory :</span> {currentData.catagory}</h3>
                            <h3 className='p-1'><span className='p1'>Price :</span> {currentData.price}</h3>
                        </div>

                        <button className='pbutton m-4' onClick={() => ProductOrder(currentData.id, currentData.price, currentData.image[0])}>Buy Now</button>
                    </div>

                </Row>
            </Container>

            <ToastContainer />
        </>
    )
}
