import React, { useEffect, useState } from 'react'
import Navigate from './Navigate'
import { Container, Row } from 'react-bootstrap'

export default function View() {

    const [data, setData] = useState([])

    useEffect(() => {

        let abc = JSON.parse(localStorage.getItem('userdata'))
        for (let i = 0; i < abc.length; i++) {
            if (abc[i].id == localStorage.getItem('userlogdata')) {
                if (abc[i].order == localStorage.getItem('orderId')) {
                    console.log(abc[i]);
                }
            }
        }

    }, [])
    return (
        <>
            <Navigate />


            <Container>
                <Row>
                    <div className="view-card">

                    </div>
                </Row>
            </Container>
        </>
    )
}
