import React from 'react'

import '../assets/css/components/Item.css'

import { Badge } from 'react-bootstrap'

const Item = (props) => {
    const color = props.color
    return (
        <div className="Item">
            <h4><Badge variant={color}>New</Badge></h4>
            <span className="date">07/08/2020</span>
            <p>lorem ipiao s aisdjklas jlkasdj alksdj aksdj aosidjason oasknda ksnjsd sd jsd</p>
        </div>
    )
}

export default Item