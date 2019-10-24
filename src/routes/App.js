import React from 'react'

import Layout from '../components/Layout'

import Orders from '../pages/Orders'
import Clients from '../pages/Clients'

import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Orders} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orders/:id" component={Orders} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/clients/:id" component={Clients} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
