import React, {useContext} from 'react'

import { Col } from 'react-bootstrap'

import '../assets/css/pages/Home.css'

import UserContext from '../context/UserContext'

const Home = () => {
    const user = useContext(UserContext)

    return (
        <>
            <Col sm={8}>
                <h1>Hola {user.name}</h1>
                <p>jbasdj kasdbkajsbd </p>
            </Col>
            <Col sm={3} className="message">
                Aqui
            </Col>
        </>
    )
}

export default Home