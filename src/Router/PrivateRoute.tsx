import React from 'react'
import { Route } from 'react-router-dom';
import { routersInterface } from './routerMap'

const PrivateRoute: React.FC<routersInterface> = (props) => {
    let { component: Component, ...rest } = props
    return (
        <Route {...rest} component={Component} />
    )
}

export default PrivateRoute

