import React from 'react'

import '../assets/css/components/Menu.css'

import avatar from '../assets/img/avatar.png'

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const Menu = (props) => {
    console.log(props)
    const setMenu = (id) => {
        if(id){
            document.querySelector('.nav-link.active').classList.remove('active')
            document.querySelector(`.${id}`).classList.add('active')
        }
    }
    return (
        <nav>
            <div className="Avatar">
                <img src={avatar} alt="Avatar" />
            </div>
            <ul className="nav flex-column MenuSub">
                <Link to="/" className="nav-link home" onClick={() => setMenu('home')}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Inicio
                </Link>
                <Link to="/orders" className="nav-link orders active" onClick={() => setMenu('orders')}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Pedidos
                </Link>
                <Link to="/clients" className="nav-link clients" onClick={() => setMenu('clients')}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Clientes
                </Link>
                <Link to="/motors" className="nav-link motors" onClick={() => setMenu('motors')}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Unidades
                </Link>
                <Link to="/finances" className="nav-link finances" onClick={() => setMenu('finances')}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Finanzas
                </Link>
            </ul>
        </nav>
    )
}

export default Menu