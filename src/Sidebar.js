import React, { useState } from 'react'
import './Sidebar.css'

export default function Sidebar() {
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
            <button className="" id='functionSidebar' onClick={hanldeSidebar}></button>
            <div className='Sidebar' id='sidebar'>
                <div className="SidebarItem">
                    <i className='bi bi-instagram'></i>
                    <h6>Instagram</h6>
                </div>
            </div>
            <div className="overlay" onClick={hanldeSidebar} id='overlay'></div>

        </>
    )
}
