import React from 'react'

import Menu from '../components/Menu'

import {Row, Col} from 'react-bootstrap'

import '../assets/css/pages/App.css'

const Layout = (props) => {
  console.log(props)
  return (
    <Row className="App">
      <Col sm={1} className="Menu">
        <Menu />
      </Col>
      { props.children }
    </Row>
  )
}

export default Layout
