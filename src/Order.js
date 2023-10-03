import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Headnav from './Headnav'
import bar from './image/more.png'
import MUIDataTable from 'mui-datatables'
import { Container, Row } from 'react-bootstrap'
import { Select } from '@material-ui/core'
import { tab } from '@testing-library/user-event/dist/tab'
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";

export default function Order() {

    const [data, setData] = useState([])

    useEffect(() => {

        if (localStorage.getItem('orderList')) {
            let orderList = JSON.parse(localStorage.getItem('orderList'))
            setData(orderList.reverse())
        }

    }, [])




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
            name: "currentUser",
            label: "USER-ID",
            options: {
                filter: true,
                sort: false,
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
            label: "Status",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <select aria-label="Default select example" className='order-list' onChange={(e) => changeorder(e, tableMeta)}>
                        <option selected={value == 0 ? true : false} value="0">Pending</option>
                        <option selected={value == 1 ? true : false} value="1">Ready To Ship</option>
                        <option selected={value == 2 ? true : false} value="2">Deliver</option>
                        <option selected={value == 3 ? true : false} value="3">Cancle</option>
                    </select>
                )
            }
        },

    ];

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })


    const options = {
        filterType: 'checkbox',
    };

    const hanldeSidebarimg = () => {
        document.getElementById('functionSidebar').click()
    }

    const changeorder = (e, tableMeta) => {
        let orderData = []
        let objIndex = data.findIndex((obj => obj.orderId == tableMeta.rowData[3]));
        data[objIndex].Status = e.target.value;

        localStorage.setItem('orderList', JSON.stringify(data));


        let usr = JSON.parse(localStorage.getItem('userdata'))

        for (let i = 0; i < usr.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (usr[i].id == tableMeta.rowData[2]) {
                    orderData = usr[i].order

                }
            }
        }


        for (let j = 0; j < orderData.length; j++) {
            if (orderData[j].orderId == tableMeta.rowData[3]) {
                orderData[j].Status = e.target.value
            }
        }


        for (let i = 0; i < usr.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (usr[i].id == tableMeta.rowData[2]) {
                    usr[i].order = orderData
                }
            }
        }

        localStorage.setItem('userdata', JSON.stringify(usr))

    }


    return (
        <>
            <img src={bar} onClick={hanldeSidebarimg} width={50} className='menu-btn' alt="" />
            <Headnav />
{/* 
            <div className="all-pannel">

                <Container>
                    <Row>
                        <div className="order-pannel">
                            <h4 className='active'>Pending</h4>|
                            <h4>Ready To Ship</h4>|
                            <h4>Shipped</h4>|
                            <h4>Cancelled</h4>

                        </div>
                    </Row>
                </Container>
            </div> */}

            <div className="profile-detail">
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={"Order List Customer"}
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
