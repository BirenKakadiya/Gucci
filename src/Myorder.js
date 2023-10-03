import React, { useEffect } from 'react';
import bar from './image/more.png';
import Navigate from './Navigate';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import truck from './image/box-truck.png'

export default function Myorder() {
    let navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        let usr = JSON.parse(localStorage.getItem('userdata'))

        if (usr) {

            for (let i = 0; i < usr.length; i++) {
                if (usr[i].id == localStorage.getItem('userlogdata')) {
                    setData(usr[i].order.reverse())
                    console.log(usr[i].order);
                }
                console.log(data);

            }
        }
    }, [])


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


    const columns = [
        {
            name: "image",
            label: "IMAGE",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value} width={100} alt="photo" />
                )
            }
        },
        {
            name: "date",
            label: "DATE/TIME",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "orderId",
            label: "ORDER-ID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "price",
            label: "PRICE",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "productId",
            label: "PRODUCT-ID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Status",
            label: "STATUS",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {

                            value == 0 ? <h6 style={{ color: 'orange' }}><b><i class="bi bi-hourglass-top"></i> Pending</b></h6> : value == 1 ? <h6 style={{ color: 'blue' }}><b><i class="bi bi-truck"></i> Ready To Ship</b></h6> : value == 2 ? <h6 style={{ color: 'green' }}><b><i class="bi bi-check-circle-fill"></i> Deliver</b></h6> : <h6 style={{ color: 'red' }} ><b><i class="bi bi-x-circle-fill"></i> Cancel</b></h6>

                        }
                    </>
                )
            }
        },
        {
            name: "orderId",
            label: "VIEW",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {

                            <p className='eye' onClick={() => viewOrder(value)} style={{ fontSize: '22px', cursor: 'pointer' }}><i class="bi bi-eye-fill"></i></p>

                        }
                    </>
                )
            }
        },

    ];

    const viewOrder = (value) => {
        localStorage.setItem('orderId', value)
        navigate('/view')
    }

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

    const options = {
        filterType: 'checkbox',
    };

    return (
        <>
            <Navigate />

            <div className="pro-file">

            </div>

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
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={"All Customers"}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </ThemeProvider>
                </CacheProvider>
            </div>
        </>
    )
}
