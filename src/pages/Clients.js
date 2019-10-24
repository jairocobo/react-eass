import React, { useState, useEffect } from 'react'

import { Form, Table, Badge, Spinner, Col, Modal, Button } from 'react-bootstrap'

import { Link, useParams } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

import '../assets/css/pages/App.css'
import '../assets/css/components/Item.css'

import image from '../assets/img/clients.png'

const Clients = (props) => {
    let { id } = useParams()

    const [modalShow, setModalShow] = useState(false)
    const [client, setClient] = useState(null)
    const [clients, setClients] = useState(null)

    const openModal = () => setModalShow(true)
    const closeModal = () => setModalShow(false)

    const toClient = (id) => {
        props.history.push('/clients/'+id)
        document.querySelector('.Search').value = ''
    }

    const addClient = () => {
        const name = document.querySelector('#name')
        const phone = document.querySelector('#phone')
        const direction = document.querySelector('#direction')

        const data = {name: name.value, phone: phone.value, direction: direction.value}

        fetch('http://localhost/api/newClient',{
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(clients => {
            if(id === 'new'){
                props.history.push('/orders/new')
            }else{
                setClients(clients)
                name.vale = ''
                phone.vale = ''
                direction.vale = ''
                setModalShow(false)
            }
        })
    }

    const deleteClient = (id) => {
        const data = {id:id}

        fetch('http://localhost/api/removeClient',{
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(clients => {
            setClients(clients)
            setClient(null)
        })
    }

    const searchClient = () => {
        const query = document.querySelector('.Search').value
        const data = {query: query}
        if(query.length > 0){
            fetch('http://localhost/api/search/clients',{
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(clients => {
                setClients(clients)
            })
        }else{
            fetch('http://localhost/api/clients')
            .then(res => res.json())
            .then(clients => {
              setClients(clients)
            })
        }
    }

    useEffect(() => {
        fetch('http://localhost/api/clients')
        .then(res => res.json())
        .then(clients => {
          setClients(clients)
        })
        if(id){
            if(id === 'new'){
                setModalShow(true)
            }else{
                fetch(`http://localhost/api/client/${id}`)
                .then(res => res.json())
                .then(data => {
                    setClient(data[0])
                })
            }
        }
    }, [id])
    return (
        <>
            {/* Modal */}
            <Modal show={modalShow} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" id="name" placeholder="Juan Perez" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefono:</Form.Label>
                            <Form.Control type="number" id="phone" placeholder="0987654321" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control type="text" id="direction" placeholder="Calle Maldonado y Oriente" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addClient}>Agregar</Button>
                </Modal.Footer>
            </Modal>

            {/* Tab 1 */}
            <Col sm={4} className="Tab1">
                <h2>Clientes</h2>
                <Form.Control type="text" placeholder="Búscar..." className="Search" onChange={searchClient}/>
                <div className="Add" onClick={openModal}><FontAwesomeIcon icon={faPlusSquare} /> Agregar un cliente</div>
                {
                    clients ? (
                        clients.map(client => (
                            <div key={client.id} className="Item Client media" onClick={() => toClient(client.id)} >
                                <img src="https://aslan.es/wp-content/uploads/2019/02/avatar.gif" className="mr-3" alt="..." />
                                <div className="media-body">
                                    <h4>{client.name}</h4>
                                    <p>{client.phone} - {client.direction} </p>
                                </div>
                            </div>
                        ))
                    ):(
                        <div className="loading">
                            <Spinner animation="border" />
                        </div>
                    )
                }
            </Col>
            <Col sm={6} className="Tab2">
                {
                    client ? (
                        <>
                            <h2>{client.name}</h2>
                            <p><strong>Telefono: </strong> {client.phone} <strong>Dirección: </strong> {client.direction}</p>
                               <Button variant="danger" className="buttonTabs2" onClick={() => deleteClient(client.id)}><FontAwesomeIcon icon={faTrashAlt} /> Eliminar</Button>
                            {
                                client.orders.length > 0 ? (
                                    <>
                                        <h3>Pedidos que ha hecho</h3>
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>¿Que pidio?</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    client.orders.map((order, index) => (
                                                        <tr key={index}>
                                                            <td>{ parseInt(index) + 1 }</td>
                                                            <td><Link to={`/orders/${order.id}`}>{order.text.substring(0,40)}</Link></td>
                                                            <td>{order.date}</td>
                                                            <td>
                                                            { order.status === 'cancel' ? (
                                                                <Badge variant="danger">Cancelada</Badge>
                                                                ):null
                                                            }
                                                            { order.status === 'process' ? (
                                                                <Badge variant="info">En Proceso</Badge>
                                                                ):null
                                                            }
                                                            { order.status === 'completed' ? (
                                                                <Badge variant="success">Completada</Badge>
                                                                ):null
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </>
                                ): (
                                    <h3>Todavía no ha hecho ningun pedido</h3>
                                )
                            }
                        </>
                    ):(
                        <div className="orderImage">
                            {/* <img src={image} alt="Imagen" /> */}
                        </div>
                    )
                }
            </Col>
        </>
    )
}

export default Clients