import React from 'react'

import '../assets/css/components/Menu.css'

import avatar from '../assets/img/avatar.png'

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {
    const setMenu = (props) => {
        const item = document.querySelector('.nav-link')
        item.classList.remove('remove')
    }
    return (
        <nav>
            <div className="Avatar">
                <img src={avatar} alt="Avatar" />
            </div>
            <ul className="nav flex-column MenuSub">
                <Link to="/" className="nav-link active" onClick={setMenu}>
                    <FontAwesomeIcon icon={faCoffee} /> Inicio
                </Link>
                <Link to="/orders" className="nav-link" onClick={setMenu}>
                    <FontAwesomeIcon icon={faCoffee} /> Pedidos
                </Link>
                <Link to="/clients" className="nav-link" onClick={setMenu}>
                    <FontAwesomeIcon icon={faCoffee} /> Clientes
                </Link>
                <Link to="/motors" className="nav-link" onClick={setMenu}>
                    <FontAwesomeIcon icon={faCoffee} /> Unidades
                </Link>
                <Link to="/finances" className="nav-link" onClick={setMenu}>
                    <FontAwesomeIcon icon={faCoffee} /> Finanzas
                </Link>
            </ul>
        </nav>
    )
}

export default Menu