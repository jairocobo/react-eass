import React from 'react'

import '../assets/css/components/Item.css'

const Item = (props) => {

    return (
        <div className="Item Client media">
            <img src="https://aslan.es/wp-content/uploads/2019/02/avatar.gif" class="mr-3" alt="..." />
            <div class="media-body">
                <h4>Juan Alberto</h4>
                <p>4 Ordenes</p>
            </div>
        </div>
    )
}

export default Item