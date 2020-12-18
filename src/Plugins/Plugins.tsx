import React, { Component } from 'react'
import './Plugins.less'

import PluginClass from './PluginClass/PluginClass'
import PluginItem from './PluginItem/PluginItem'

export default class Plugins extends Component {
    render() {
        return (
            <div className="plugins">
                <div className="plugins-classWrap">
                    <PluginClass />
                </div>
                <PluginItem />
            </div>
        )
    }
}

