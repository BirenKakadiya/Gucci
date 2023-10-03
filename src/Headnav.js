import React from 'react'

import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import gucci from './image/gucci-1.png'
import { Link } from 'react-router-dom';
import Upload from './image/document.png'
import invantory from './image/inventory-management.png'
import banners from './image/slider.png'
import order from './image/shopping-bag.png'
import returnorder from './image/return.png'
import coupon from './image/coupon.png'
import user from './image/document.png'
import { useState } from 'react';

export default function Headnav() {

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


    return (
        <>
            <button className="d-none" id='functionSidebar' onClick={hanldeSidebar}></button>
            <div className='Sidebar' id='sidebar'>
                <div className="SidebarItem">
                    <div className="admin-side">
                        <Link to={'/admin'}> <h4 className='admin-menu'><img src={Upload} style={{ color: 'white' }} width={40} alt="" />  Catalog Upload</h4></Link>
                        <Link to={'/table'}> <h4 className='admin-menu'><img src={invantory} width={40} alt="" />  Inventory</h4></Link>
                        <Link> <h4 className='admin-menu'><img src={banners} width={40} alt="" />  Banners</h4></Link>
                        <Link to={'/order'}> <h4 className='admin-menu'><img src={order} width={40} alt="" />  Orders</h4></Link>
                        <Link> <h4 className='admin-menu'><img src={returnorder} width={40} alt="" />  Return Order</h4></Link>
                        <Link> <h4 className='admin-menu'><img src={coupon} width={40} alt="" />  Coupons</h4></Link>
                        <Link> <h4 className='admin-menu'><img src={Upload} width={40} alt="" />  User</h4></Link>
                    </div>
                </div>
            </div>
            <div className="overlay" onClick={hanldeSidebar} id='overlay'></div>
        </>
    )
}

