import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import { routers } from './routerMap';
import PrivateRoute from './PrivateRoute'

import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

class router extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    {
                        routers.map((item, index) => {
                            if (item.needLogin) {
                                return <PrivateRoute
                                    key={index}
                                    path={item.path}
                                    needLogin={item.needLogin}
                                    exact={item.exact}
                                    component={item.component}
                                />
                            } else {
                                return <Route
                                    key={index}
                                    path={item.path}
                                    exact={item.exact}
                                    component={item.component}
                                />
                            }
                        })
                    }
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </Router>
        )
    }
}
export default router;
