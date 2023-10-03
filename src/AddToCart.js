import React, { useState } from 'react'
import Navigate from './Navigate'
import { useEffect } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

export default function AddToCart() {
    const navigate = useNavigate()
    const [matchData, setMatchdata] = useState([])


    useEffect(() => {


        getData()


    }, [])


    const getData = () => {
        let usr = JSON.parse(localStorage.getItem('userdata'))
        let productdata = JSON.parse(localStorage.getItem('productdata'))
        let userCart = []
        let cartItem = []
        if (usr) {
            for (let i = 0; i < usr.length; i++) {
                if (usr[i].id == localStorage.getItem('userlogdata')) {
                    userCart = usr[i].card
                }
            }
        }


        for (let i = 0; i < productdata.length; i++) {
            for (let j = 0; j < userCart.length; j++) {
                if (productdata[i].id == userCart[j]) {
                    cartItem.push(productdata[i])
                    setMatchdata(cartItem)

                }
            }

        }
    }

    const defincard = (id) => {
        localStorage.setItem('pid', JSON.stringify(id))
        navigate('/product')
    }

    const removeCart = (abc) => {


        let usr = JSON.parse(localStorage.getItem('userdata'))

        for (let i = 0; i < usr.length; i++) {
            if (usr[i].id == localStorage.getItem('userlogdata')) {

                let filter = usr[i].card.filter(obj => obj !== abc)
                usr[i].card = filter

                setMatchdata(filter)
                localStorage.setItem('userdata', JSON.stringify(usr))

                getData()
            }
        }

    }

    return (
        <>
            <Navigate />

            <div className="d1" style={{ paddingTop: '120px' }}></div>
            <Container>
                <Row>

                    {matchData.length > 0 && matchData.map((item) => {

                        return (
                            <>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4 mb-4 p-4" >
                                    <div className="card-1">
                                        <div onClick={() => removeCart(item.id)} className="remove-i">
                                            <i class="bi bi-trash3-fill"></i>
                                        </div>
                                        {item.image &&
                                            <img onClick={() => defincard(item.id)} src={item.image[0]} height={400} className='img-fluid img-2' alt="" />
                                        }

                                        <h5 onClick={() => defincard(item.id)} className='pname'>{item.name}</h5>
                                        <h5 onClick={() => defincard(item.id)} className='pprice'><span className='subname'>₹</span> {item.price}</h5>
                                        <div className="at-cart">
                                            <h5 onClick={() => defincard(item.id)} style={{ fontSize: '17px' }}>Buy Now</h5>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })}
                </Row>
            </Container>


        </>
    )
}
