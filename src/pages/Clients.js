import React from 'react'

import { Form, Col } from 'react-bootstrap'
import '../assets/css/components/Orders.css'

import Item from '../components/Item-Clients.js'

const Clients = () => {
    return (
        <>
            <Col sm={4} className="Tab1 Orders">
                <h2>Clientes</h2>
                <Form.Control type="email" placeholder="Búscar..." className="Search"/>
                <div className="Add">Agregar un cliente</div>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
            </Col>
            <Col sm={6}>prueba</Col>
        </>
    )
}

export default Clients