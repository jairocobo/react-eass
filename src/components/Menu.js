import React from 'react'

import '../assets/css/components/Menu.css'

import { Button } from 'react-bootstrap'

const Menu = () => {
    return (
        <nav>
            <div className="Avatar">
   avatar
            </div>
            <div className="MenuFast">
                <Button variant="outline-danger" block>PEDIDOS</Button>
                <Button variant="outline-danger" block>CLIENTES</Button>
            </div>
            <div className="MenuList">
                
            </div>
        </nav>
    )
}

export default Menu