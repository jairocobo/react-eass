import React from 'react'

import '../assets/css/components/Menu.css'

import { Button } from 'react-bootstrap'
import {Dropdown} from 'react-bootstrap'
import {ButtonGroup}from 'react-bootstrap'
import {DropdownButton} from 'react-bootstrap'
import {ButtonToolbar} from 'react-bootstrap'

const Menu = () => {
    return (
        <nav className="Menu">
            <div className="Avatar">
   avatar
 
            </div>
   
            <div className="MenuFast">
                <Button variant="outline-danger" block>PEDIDOS</Button>
               <ButtonToolbar vertical>
                           <h1>   <Button variant="outline-primary">prueba</Button> </h1>
                            
               </ButtonToolbar>              
            </div>
       
    
            <div className="MenuList">
         
            <ButtonGroup vertical>
                        <Button>Button</Button>
                        <Button>Button</Button>
                        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
                        <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
            <Button>Button</Button>
            <Button>Button</Button>
                         <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-2">
                         <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                         <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
                         <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-3">
                         <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                         <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
            </ButtonGroup>
  
            </div>

        </nav>
    )
}

export default Menu