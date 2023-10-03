import React from 'react'
import Sidebar from './Sidebar'
import bar from './image/more.png'
import './Test.css'

export default function Test() {
        const hanldeSidebar = () => {
                document.getElementById('functionSidebar').click()
        }
        return (
                <div>
                        <img src={bar} onClick={hanldeSidebar} width={50} alt="" />
                        <Sidebar />
                        <div className="Content">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto eum perferendis, blanditiis molestiae doloremque culpa voluptates fugit nam sunt et itaque rem non aut excepturi nobis cupiditate consequatur earum sapiente?</p>
                        </div>

                </div>
        )
}
