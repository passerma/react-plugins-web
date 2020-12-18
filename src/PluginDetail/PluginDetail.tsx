import React, { useEffect, useState } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import './PluginDetail.less'

import { getPluginDetail } from './request'
import PluginUser from './PluginUser/PluginUser'
import PluginInfo from './PluginInfo/PluginInfo'
import { message } from 'antd'

interface paramsType {
    id: string
}

interface propsType extends RouteComponentProps<paramsType> {

}

const PluginDetail: React.FC<propsType> = (props) => {

    const [detail, setdetail] = useState({
        pluginImg: '',
        pluginName: '',
        realname: '',
    })

    useEffect(() => {
        let id = props.match.params.id
        getPluginDetail({ id }).then(res => {
            if (res && res.ErrCode === 0) {
                setdetail(res.data[0])
            } else {
                res && message.error(res.ErrMsg)
            }
        })
    }, [])
    return (
        <div>
            <PluginUser detail={detail} />
            <PluginInfo detail={detail} />
        </div >
    )
}

export default withRouter(PluginDetail)