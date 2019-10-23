import React from 'react'

import Layout from '../components/Layout'

import Orders from '../pages/Orders'

import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Orders} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
