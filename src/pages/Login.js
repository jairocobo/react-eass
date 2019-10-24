import React, { useState } from 'react'
import Cookies from 'universal-cookie'

import { Form, Col, Modal, Button, Row } from 'react-bootstrap'

import '../assets/css/pages/Login.css'

import logo from '../assets/img/logo.png'

const Login = () => {
    const cookies = new Cookies()
    const [smShow, setSmShow] = useState(false)

    const doLogin = (e) => {
        e.preventDefault()
        const email = document.querySelector("#email")
        const pass = document.querySelector("#pass")
        const data = {email: email.value, pass: pass.value}

        if(email.value.length > 0 || pass.value.length > 0){
            fetch('http://localhost/api/login',{
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'ok'){
                    email.value = ''
                    pass.value = ''
                    cookies.set('uid', data.uid, { path: '/' })
                    window.location="/home"
                }else{
                    setSmShow(true)
                }
            })
        }else{
            setSmShow(true)
        }
    }
    return (
        <div className="containerLogin">
        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Error
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Los datos que ingresaste no conciden con la base de datos.
            </Modal.Body>
        </Modal>
            <Row>
                <Col className="logoLeft">
                    <img src={logo} alt="Logo"/>
                </Col>
                <Col className="login">
                    <Form onSubmit={doLogin}>
                        <div className="jumbotron">
                            <h1 className="display-4">Bienvenido a EASS</h1>
                            <p className="lead">Inicia sesión para que puedas entrar al sistema.</p>
                            <div className="line"></div>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" id="email" placeholder="usuario@email.com" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" id="pass" placeholder="Contraseña" />
                            </Form.Group>
                            <Button variant="outline-danger" block type="submit">
                                Entrar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}
export default Login