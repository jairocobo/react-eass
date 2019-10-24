import React, { useState, useEffect } from 'react'

import { Form, Table, Badge, Spinner, Col, Modal, Button } from 'react-bootstrap'

import { Link, useParams } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

import '../assets/css/pages/App.css'
import '../assets/css/components/Item.css'

import image from '../assets/img/clients.png'

const Delivers = (props) => {
    let { id } = useParams()

    const [modalShow, setModalShow] = useState(false)
    const [deliver, setDeliver] = useState(null)
    const [delivers, setDelivers] = useState(null)

    const openModal = () => setModalShow(true)
    const closeModal = () => setModalShow(false)

    const toDeliver = (id) => {
        props.history.push('/delivers/'+id)
        document.querySelector('.Search').value = ''
    }

    const addDeliver = () => {
        const name = document.querySelector('#name')
        const phone = document.querySelector('#phone')
        const direction = document.querySelector('#direction')

        const data = {name: name.value, phone: phone.value, direction: direction.value}

        fetch('http://localhost/api/newDeliver',{
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(delivers => {
            if(id === 'new'){
                props.history.push('/orders/new')
            }else{
                setDelivers(delivers)
                name.vale = ''
                phone.vale = ''
                direction.vale = ''
                setModalShow(false)
            }
        })
    }

    const deleteDeliver = (id) => {
        const data = {id:id}

        fetch('http://localhost/api/removeDeliver',{
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(delivers => {
            setDelivers(delivers)
            setDeliver(null)
        })
    }

    const searchDeliver = () => {
        const query = document.querySelector('.Search').value
        const data = {query: query}
        if(query.length > 0){
            fetch('http://localhost/api/search/delivers',{
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(delivers => {
                setDelivers(delivers)
            })
        }else{
            fetch('http://localhost/api/delivers')
            .then(res => res.json())
            .then(delivers => {
              setDelivers(delivers)
            })
        }
    }

    useEffect(() => {
        fetch('http://localhost/api/delivers')
        .then(res => res.json())
        .then(delivers => {
          setDelivers(delivers)
        })
        if(id){
            if(id === 'new'){
                setModalShow(true)
            }else{
                fetch(`http://localhost/api/deliver/${id}`)
                .then(res => res.json())
                .then(data => {
                    setDeliver(data)
                })
            }
        }
    }, [id])
    return (
        <>
            {/* Modal */}
            <Modal show={modalShow} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Unidad</Modal.Title>
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
                    <Button variant="primary" onClick={addDeliver}>Agregar</Button>
                </Modal.Footer>
            </Modal>

            {/* Tab 1 */}
            <Col sm={4} className="Tab1">
                <h2>Unidades</h2>
                <Form.Control type="text" placeholder="Búscar..." className="Search" onChange={searchDeliver}/>
                <div className="Add" onClick={openModal}><FontAwesomeIcon icon={faPlusSquare} /> Agregar una Unidad</div>
                {
                    delivers ? (
                        delivers.map(deliver => (
                            <div key={deliver.id} className="Item Client media" onClick={() => toDeliver(deliver.id)} >
                                <img src={deliver.avatar} className="mr-3" alt="..." />
                                <div className="media-body">
                                    <h4>{deliver.name}</h4>
                                    <p>{deliver.username}</p>
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
                    deliver ? (
                        <>
                            <h2>{deliver.name}</h2>
                            <p><strong>Telefono: </strong> {deliver.phone} </p>
                               <Button variant="danger" className="buttonTabs2" onClick={() => deleteDeliver(deliver.id)}><FontAwesomeIcon icon={faTrashAlt} /> Eliminar</Button>
                            {
                                deliver.orders.length > 0 ? (
                                    <>
                                        <h3>Pedidos que tiene pendiente</h3>
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Cliente</th>
                                                <th>Pedido</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    deliver.orders.map((order, index) => (
                                                        <tr key={index}>
                                                            <td>{ parseInt(index) + 1 }</td>
                                                            <td><Link to={`/clients/${order.client.id}`}>{order.client.name}</Link></td>
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
                                    <h3>No tiene pedidos pendientes</h3>
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

export default Delivers