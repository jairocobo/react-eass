import React from 'react'


import Menu from '../components/Menu'
import Orders from '../components/Orders'

import {Row, Col} from 'react-bootstrap'

import '../assets/css/pages/App.css'

const App = () => {
  return (
    <Row className="App">
      <Col sm={2} className="Menu">
        <Menu />
      </Col>
      <Col sm={4}>
        <Orders />
      </Col>
      <Col sm={6}>sm=4</Col>
    </Row>
  )
}

export default App
