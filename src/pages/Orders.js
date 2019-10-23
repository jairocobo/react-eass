import React from 'react'

import Orders from '../components/Orders'

import {Col} from 'react-bootstrap'

import '../assets/css/pages/App.css'


const App = () => {
  return (
    <>
      <Col sm={4}>
        <Orders />
      </Col>
      <Col sm={6}>prueba</Col>
    </>
  )
}

export default App
