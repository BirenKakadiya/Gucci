import React, { useEffect, useRef, useState } from 'react';
import Navigate from './Navigate'
import { Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import 'react-range-slider-input/dist/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bar from './image/filter.png';
import './Website.css';

export default function Seeall() {


    useEffect(() => {
        let ab = JSON.parse(localStorage.getItem('productdata'))
        setData(ab.reverse())
        setdummydata(ab)
    }, [])


    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [dummydata, setdummydata] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const mainRef = useRef(null);
    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const linkRefs = useRef([]);

    const defincard = (id) => {
        localStorage.setItem('pid', JSON.stringify(id))
        navigate('/product')
    }



    const low1 = () => {
        let filterdata = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setData([...filterdata])
        console.log('low1');
    }

    const low2 = () => {
        let filterdata = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setData([...filterdata])
        console.log("lo2");
    }
    function filterProductsByPrice(data, minPrice, maxPrice) {
        let underdata = dummydata.filter(dummydata => dummydata.price >= minPrice && dummydata.price <= maxPrice);
        setData([...underdata])
        console.log('underprice');
    }

    const catagorydata = (e) => {

        let x = []
        if (e.target.value == 'all') {
            setData(dummydata)
        }
        else {
            for (let i = 0; i < dummydata.length; i++) {
                if (dummydata[i].catagory == e.target.value) {
                    x.push(dummydata[i])
                    setData(x)
                    console.log('catagory');
                }

            }
        }
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
                <img src={bar} onClick={hanldeSidebarimg} width={50}  className='menu-btn' alt="" />
            </div>



            <button className="d-none" id='functionSidebar' onClick={hanldeSidebar}></button>
            <div className='Sidebar' id='sidebar'>
                <div className="SidebarItem">

                    <div className="fill-data">
                        <div className="fill1">
                            <p onClick={low1}><i class="bi bi-arrow-up"></i> Low to High</p>
                        </div>
                        <div className="fill1">
                            <p onClick={low2}><i class="bi bi-arrow-down"></i> High to Low</p>
                        </div>
                    </div>

                    <div className="underdata">
                        <div className="fill1">
                            <p onClick={() => filterProductsByPrice(data, 0, 1000)}>Under - ₹1000</p>
                        </div>
                        <div className="fill1">
                            <p onClick={() => filterProductsByPrice(data, 1000, 2000)}>₹1000 - ₹2000</p>
                        </div>
                        <div className="fill1">
                            <p onClick={() => filterProductsByPrice(data, 3000, 4000)}>₹3000 - ₹4000</p>
                        </div>
                        <div className="fill1">
                            <p onClick={() => filterProductsByPrice(data, 4000, 5000)}>₹4000 - ₹5000</p>
                        </div>
                        <div className="fill1">
                            <p onClick={() => filterProductsByPrice(data, 5000, 10000)}>₹5000 - ₹10000</p>
                        </div>
                    </div>

                    <div className='catagory-sct'>
                        <select id="category-filter" className='ctgry' onChange={(e) => catagorydata(e)}>
                            <option value="">select catagory--</option>
                            <option value="all">All</option>
                            <option value="Watch">watch</option>
                            <option value="Shoes">shoes</option>
                            <option value="Wollet">wallet</option>
                            <option value="Shirt">shirt</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="overlay" onClick={hanldeSidebar} id='overlay'></div>



            <div className="seeall-card">
                <Container>
                    <Row>
                        {data && data.map((item) => {

                            return (
                                <>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4 mb-4">
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
                </Container >
            </div>


            {/* </div> */}
            <ToastContainer />
        </>
    )


}