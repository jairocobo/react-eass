import React from 'react'

import '../assets/css/components/Menu.css'

import avatar from '../assets/img/avatar.png'

import { NavLink } from "react-router-dom";
import { OverlayTrigger,Tooltip } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faAddressCard, faHandRock, faUser, faChartBar } from '@fortawesome/free-regular-svg-icons'

const Menu = (props) => {

    return (
        <nav>
            <div className="Avatar">
                <img src={avatar} alt="Avatar" />
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
                    <NavLink activeClassName="active" to="/motors" className="nav-link">
                        <FontAwesomeIcon icon={faHandRock} />
                    </NavLink>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Finanzas</Tooltip>}>
                    <NavLink activeClassName="active" to="/finances" className="nav-link">
                        <FontAwesomeIcon icon={faChartBar} />
                    </NavLink>
                </OverlayTrigger>
            </ul>
        </nav>
    )
}

export default Menu