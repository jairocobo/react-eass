import React from 'react'

import { Form, Col } from 'react-bootstrap'

import '../assets/css/pages/App.css'
import '../assets/css/components/Orders.css'
import Item from '../components/Item-Orders.js'

const App = () => {
  return (
    <>
      <Col sm={4} className="Tab1 Orders">
        <h2>Pedidos</h2>
        <Form.Control type="email" placeholder="Búscar..." className="Search"/>
        <div className="Add">Agregar un pedido</div>
        <Item color="primary"/>
        <Item color="success" />
        <Item color="info" />
        <Item color="warning" />
        <Item color="dark" />
      </Col>
      <Col sm={6}>prueba</Col>
    </>
  )
}

export default App
