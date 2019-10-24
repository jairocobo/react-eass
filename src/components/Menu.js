import React, {useContext} from 'react'
import Cookies from 'universal-cookie'

import '../assets/css/components/Menu.css'

import { NavLink } from "react-router-dom";
import { OverlayTrigger,Tooltip } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faAddressCard, faHandRock, faUser, faChartBar, faWindowClose } from '@fortawesome/free-regular-svg-icons'

import UserContext from '../context/UserContext'

const Menu = (props) => {
    const user = useContext(UserContext)
    const cookies = new Cookies()

    const doLogout = () => {
        cookies.remove('uid')
        window.location="/login"
    }
    return (
        <nav>
            <div className="Avatar">
                <img src={user.avatar} alt="Avatar" />
            </div>
            <ul className="nav flex-column MenuSub">
                <OverlayTrigger placement="top" overlay={<Tooltip>Inicio</Tooltip>}>
                    <NavLink activeClassName="active" to="/home" className="nav-link">
                        <FontAwesomeIcon icon={faNewspaper} />
                    </NavLink>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Pedidos</Tooltip>}>
                    <NavLink activeClassName="active" to="/orders" className="nav-link">
                        <FontAwesomeIcon icon={faAddressCard} />
                    </NavLink>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Clientes</Tooltip>}>
                    <NavLink activeClassName="active" to="/clients" className="nav-link">
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Unidades</Tooltip>}>
                    <NavLink activeClassName="active" to="/delivers" className="nav-link">
                        <FontAwesomeIcon icon={faHandRock} />
                    </NavLink>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Finanzas</Tooltip>}>
                    <NavLink activeClassName="active" to="/finances" className="nav-link">
                        <FontAwesomeIcon icon={faChartBar} />
                    </NavLink>
                </OverlayTrigger>
            </ul>
            <div className="logoutBtn" onClick={doLogout}>
                <OverlayTrigger placement="top" overlay={<Tooltip>Salir</Tooltip>}>
                    <span className="nav-link">
                        <FontAwesomeIcon icon={faWindowClose} />
                    </span>
                </OverlayTrigger>
            </div>
        </nav>
    )
}

export default Menu