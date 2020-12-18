import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Home.less'
import SearchFrom from './SearchFrom/SearchFrom'
import PluginClass from './PluginClass/PluginClass'
import PluginItem from './PluginItem/PluginItem'

class Home extends Component<RouteComponentProps> {

    _clickMore = () => {
        this.props.history.push('/plugins/all_allTime?page=1&size=9')
    }

    render() {
        return (
            <div className="home">
                <SearchFrom />
                <PluginClass />
                <PluginItem />
                <div className="home-loadMore" onClick={this._clickMore}>查看更多</div>
            </div>
        )
    }
}

export default withRouter(Home)