import React from 'react'
import '../assets/css/pages/Loading.css'

import {Spinner} from 'react-bootstrap'

const Login = (props) => {
    return (
        <div className={`containerLoading ${props.state}`}>
            <div className="loading">
                <Spinner animation="border" variant="light" />
            </div>
        </div>
    )

}
export default Login