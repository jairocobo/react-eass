import React, { useState, useEffect } from 'react'

import { Form, Spinner, Badge, Col, Modal, Button } from 'react-bootstrap'

import '../assets/css/pages/App.css'
import '../assets/css/components/Orders.css'
import '../assets/css/components/Item.css'

import image from '../assets/img/orders.png'

import Order from '../components/Order'

const App = () => {
  const [modalShow, setModalShow] = useState(false)
  const [order, setOrder] = useState(null)
  const [orders, setOrders] = useState(null)

  const openModal = () => setModalShow(true)
  const closeModal = () => setModalShow(false)

  const toOrder = (id) => {
    setOrder(id)
  }

  useEffect(() => {
    fetch('http://localhost/api/orders')
    .then(res => res.json())
    .then(orders => {
      setOrders(orders)
    })
  }, [])

  return (
    <>
      {/* Modal */}
      <Modal show={modalShow} onHide={closeModal}>
          <Modal.Header closeButton>
              <Modal.Title>Nuevo Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>¿Qué pide?</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="primary">Agregar</Button>
          </Modal.Footer>
      </Modal>

      {/* Tab */}
      <Col sm={4} className="Tab1 Orders">
        <h2>Pedidos</h2>
        <Form.Control type="email" placeholder="Búscar..." className="Search"/>
        <div className="Add" onClick={openModal}>Agregar un pedido</div>
        {
          orders ? (
            orders.map(order => (
              <div key={order.id} className="Item" onClick={() => toOrder(order.id) }>
                  { order.status === 'cancel' ? (
                      <h4><Badge variant="danger">Cancelada</Badge></h4>
                    ):null
                  }
                  { order.status === 'process' ? (
                      <h4><Badge variant="info">En Proceso</Badge></h4>
                    ):null
                  }
                  { order.status === 'completed' ? (
                      <h4><Badge variant="success">Completada</Badge></h4>
                    ):null
                  }
                  <span className="date">{order.date}</span>
                  <p>{order.text}</p>
              </div>
            ))
          ):(
            <div className="loading">
              <Spinner animation="border" />
            </div>
          )
        }
      </Col>
      <Col sm={6} className="Tab2 Order">
        {
          order ? (
            <Order id={order} />
          ):(
            <div className="orderImage">
              <img src={image} alt="Imagen" />
            </div>
          )
        }
      </Col>
    </>
  )
}

export default App
