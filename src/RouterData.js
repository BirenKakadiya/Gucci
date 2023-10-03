import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Admin from './Admin'
import Table from './Table'
import Website from './Website'
import Product from './Product'
import Headnav from './Headnav'
import Seeall from './Seeall'
import Test from './Test'
import Userlogin from './Userlogin'
import Userregister from './Userregister'
import AddToCart from './AddToCart'
import Profile from './Profile'
import Myorder from './Myorder'
import Order from './Order'
import View from './View'




export default function RouterData() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='*' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/table' element={<Table />} />
                <Route path='/website' element={<Website />} />
                <Route path='/product' element={<Product />} />
                <Route path='/new' element={<Headnav />} />
                <Route path='/seeall' element={<Seeall />} />
                <Route path='/test' element={<Test />} />
                <Route path='/userlogin' element={<Userlogin />} />
                <Route path='/userregister' element={<Userregister />} />
                <Route path='/addtocart' element={<AddToCart />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/myorder' element={<Myorder />} />
                <Route path='/order' element={<Order />} />
                <Route path='/view' element={<View />} />

            </Routes>
        </BrowserRouter>
    )
}
