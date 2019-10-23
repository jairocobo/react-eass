import React from 'react'

import { Form } from 'react-bootstrap'
import '../assets/css/components/Orders.css'
import Item from './Item.js'

const Orders = () => {
    return (
        <div className="Tab1 Orders">
            <h2>Pedidos</h2>
            <Form.Control type="email" placeholder="Búscar..." className="Search"/>
            <div className="Add">Agregar un pedido</div>
            <Item color="primary"/>
            <Item color="success" />
            <Item color="info" />
            <Item color="warning" />
            <Item color="dark" />
        </div>
    )
}

export default Orders