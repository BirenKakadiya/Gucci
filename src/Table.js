import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables';
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Headnav from './Headnav';
import bar from './image/more.png';
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";

export default function Table() {

    let navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {

        if (localStorage.getItem('productdata')) {
            let abc = JSON.parse(localStorage.getItem('productdata'))
            setData(abc.reverse())
        }

    }, [])

    const removeData = (value) => {
        let rmv = data.filter(obj => obj.id !== value)
        setData(rmv)
        localStorage.setItem('productdata', JSON.stringify(rmv))
    }
    const editData = (value) => {
        localStorage.setItem('id', JSON.stringify(value))
        navigate('/admin')
    }

    const columns = [
        {
            name: "name",
            label: "name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "details",
            label: "Details",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "catagory",
            label: "Catagory",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "image",
            label: "Image",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value[0]} width={100} alt="photo" />
                )
            }
        },
        {
            name: "id",
            label: "Remove",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className='rmbtn' onClick={() => removeData(value)}>X</button>
                )
            }
        },
        {
            name: "id",
            label: "Edit",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className='edbtn' onClick={() => editData(value)}>Edit</button>
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


    return (
        <>

            <img src={bar} onClick={hanldeSidebarimg} width={50} className='menu-btn' alt="" />
            <Headnav />



            <div className="content p-2">
                <Container>
                    <Row>
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

                    </Row>
                </Container>
            </div>

        </>
    )
}
