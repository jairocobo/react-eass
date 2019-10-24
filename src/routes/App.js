import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'

import Layout from '../components/Layout'


import Login from '../pages/Login'

import Loading from '../pages/Loading'

import Home from '../pages/Home'
import Orders from '../pages/Orders'
import Clients from '../pages/Clients'
import Delivers from '../pages/Delivers'

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import { UserProvider } from '../context/UserContext'

const App = () => {
  const cookies = new Cookies()
  const uid = cookies.get('uid')
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    if(uid){
        fetch(`http://localhost/api/user/${uid}`)
        .then(res => res.json())
        .then(data => {
          setUser(data)
        })
    }
  }, [uid])
  return (
    <BrowserRouter>
      {
        uid ? (
          <UserProvider value={user}>
            {user ? (
              <Layout>
                <Switch>
                  <Redirect exact path="/" to='/home' />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/orders" component={Orders} />
                  <Route exact path="/orders/:id" component={Orders} />
                  <Route exact path="/clients" component={Clients} />
                  <Route exact path="/clients/:id" component={Clients} />
                  <Route exact path="/delivers" component={Delivers} />
                  <Route exact path="/delivers/:id" component={Delivers} />
                </Switch>
              </Layout>
            ):(
              <Loading state="true" />
            )}
          </UserProvider>
        ):(
          <Switch>
            <Route component={Login} />
          </Switch>
        )
      }
    </BrowserRouter>
  )
}

export default App
