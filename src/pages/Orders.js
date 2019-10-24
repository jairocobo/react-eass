import React, { useState, useEffect } from 'react'

import { Form, Row, Spinner, Badge, Col, Modal, Button } from 'react-bootstrap'

import { Link, useParams } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

import '../assets/css/pages/App.css'
import '../assets/css/components/Orders.css'
import '../assets/css/components/Item.css'

import image from '../assets/img/orders.png'

const App = (props) => {
    let { id } = useParams();

    const [modalShow, setModalShow] = useState(false)
    const [order, setOrder] = useState(null)
    const [orders, setOrders] = useState(null)

    const [queryClients, setQueryClients] = useState(null)
    const [queryClient, setQueryClient] = useState(null)

    const [queryDelivers, setQueryDelivers] = useState(null)

    const openModal = () => {
        fetch(`http://localhost/api/delivers`)
        .then(res => res.json())
        .then(data => {
            setQueryDelivers(data)
        })
        setModalShow(true)
    }
    const closeModal = () => setModalShow(false)

    const toOrder = (id) => {
        props.history.push('/orders/'+id)
        document.querySelector('.Search').value = ''
    }

    const addOrder = () => {
        const clientId = queryClient
        const text = document.querySelector('#orderText')
        const Direction = document.querySelector('#Direction')
        const idDeliver = document.querySelector('#idDeliver').value
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let dateToServer

        if(month < 10){
            dateToServer = `${year}-0${month}-${day}`
        }else{
            dateToServer = `${year}-${month}-${day}`
        }

        const data = {idUser: 1, idClient: clientId, idDeliver: idDeliver, text: text.value, status: 'process', dateToServer: dateToServer, direction: Direction.value}

        fetch('http://localhost/api/newOrder',{
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data)
            text.value = ''
            setModalShow(false)
        })
    }

    const deleteOrder = (id) => {
        const data = {id:id}
        fetch('http://localhost/api/removeOrder',{
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data)
            setOrder(null)
        })
    }

    const searchOrder = () => {
        const query = document.querySelector('.Search').value
        const data = {query: query}
        if(query.length > 0){
            fetch('http://localhost/api/search/orders',{
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
        }else{
            fetch('http://localhost/api/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
        }
    }
    const searchClient = () => {
        const query = document.querySelector('#SearchClient').value
        const results = document.querySelector('.results')
        const data = {query: query}
        if(query.length > 0){
            fetch('http://localhost/api/search/clients',{
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                setQueryClients(data)
                results.classList.add('active')
            })
        }else{
            results.classList.remove('active')
        }
    }
    const handleClient = (data) => {
        const results = document.querySelector('.results')
        results.classList.remove('active')
        document.querySelector('#SearchClient').value = data.name
        document.querySelector('#Direction').value = data.direction
        setQueryClients(null)
        setQueryClient(data.id)
    }
    const handleNewClient = () => {
        props.history.push('/clients/new')
    }

    useEffect(() => {
        fetch('http://localhost/api/orders')
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
        if(id){
            if(id === 'new'){
                openModal()
            }else{
                fetch(`http://localhost/api/order/${id}`)
                .then(res => res.json())
                .then(data => {
                    setOrder(data)
                })
            }
        }
    }, [id])

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
                    <Form.Control type="text" placeholder="Juan" id="SearchClient" autoComplete="off" onChange={searchClient}/>
                    <div className="results list-group">
                        {
                            queryClients ? (
                                <>
                                {
                                    queryClients.map(client => (
                                        <span key={client.id} className="list-group-item list-group-item-action" onClick={()=>handleClient(client)}>{client.name}</span>
                                    ))
                                }
                                <span className="list-group-item list-group-item-action" onClick={()=>handleNewClient()}><FontAwesomeIcon icon={faPlusSquare} /> Nuevo Cliente</span>
                                </>
                            ):''
                        }
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Calle Luis A. Martinez" id="Direction"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Selecciona una unidad</Form.Label>
                    <Form.Control as="select" id="idDeliver">
                        {
                            queryDelivers ? (
                                <>
                                {
                                    queryDelivers.map(deliver => (
                                        <option key={deliver.id} value={deliver.id}>{deliver.name} (Tiene {deliver.orders.length} pedidos)</option>
                                    ))
                                }
                                </>
                            ):''
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>¿Qué pide?</Form.Label>
                    <Form.Control as="textarea" id="orderText" rows="3" />
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    queryClient ? (
                        <Button variant="primary" onClick={addOrder}>Agregar</Button>
                    ):(
                        <Button variant="primary" onClick={addOrder}disabled>Agregar</Button>
                    )
                }
            </Modal.Footer>
        </Modal>

        {/* Tab */}
        <Col sm={4} className="Tab1 Orders">
            <h2>Pedidos</h2>
            <Form.Control type="email" placeholder="Búscar..." className="Search" onChange={searchOrder}/>
            <div className="Add" onClick={openModal}><FontAwesomeIcon icon={faPlusSquare} /> Agregar un pedido</div>
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
                <>
                    <h2>Orden # {order.id}</h2>
                    <div className="orderStatus">
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
                    </div>
                    <div class="btn-group status-buttons" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-secondary">Left</button>
                        <button type="button" class="btn btn-outline-secondary">Middle</button>
                        <button type="button" class="btn btn-outline-secondary">Right</button>
                    </div>
                    <Button variant="danger" className="buttonTabs2" onClick={() => deleteOrder(order.id)}><FontAwesomeIcon icon={faTrashAlt} /> Eliminar</Button>
                    <h3>Dirección</h3>
                    <div className="mapouter">
                        <iframe width="100%" height="200" title="maps" id="gmap_canvas" src={`https://www.google.com/maps/embed/v1/place?q=${order.direction}&key=AIzaSyAsWIDU372qKHubMO0W7M4a9BLw8jsqy3E&zoom=17`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                    </div>
                    <Row>
                        <Col>
                            <h3>Cliente</h3>
                            <p>
                                {order.client ? (
                                    <Link to={`/clients/${order.client.id}`}>
                                        <Button variant="outline-secondary">{order.client.name}</Button>
                                    </Link>
                                ):''}
                            </p>
                        </Col>
                        <Col>
                            <h3>Unidad</h3>
                            <p>
                                {order.deliver ? (
                                    <Link to={`/delivers/${order.deliver.id}`}>
                                        <Button variant="outline-secondary">{order.deliver.name}</Button>
                                    </Link>
                                ):''}
                            </p>
                        </Col>
                        <Col>
                            <h3>Fecha</h3>
                            <p>{order.date}</p>
                        </Col>
                    </Row>
                    <h3>¿Qué pidió?</h3>
                    <p>{order.text}</p>
                </>
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
