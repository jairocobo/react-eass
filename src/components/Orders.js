import React from 'react'

import '../assets/css/components/Orders.css'
import { Jumbotron } from 'react-bootstrap'

import { Button } from 'react-bootstrap'

const Orders = () => {
    return (
        <div>
            PEDIDOS
            <Jumbotron>
           <h1>Hello, world!</h1>
            <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
         extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
<Jumbotron>
           <h1>Hello, world!</h1>
            <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
         extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
        </div>
    )
}

export default Orders