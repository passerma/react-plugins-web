import React from 'react'
import { HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import './PluginUser.less'

import IconFont from '../../utils/IconFont'

interface PluginUserProps {
    detail: {
        avatar?: string,
        pluginName?: string,
        realname?: string,
    }
}

const PluginUser: React.FC<PluginUserProps> = (props) => {

    const { detail } = props

    return (
        <div className="pluginD-pluginUser">
            <div className="pluginD-pluginUser-avatar">
                {detail.avatar ? <img src={`/file/avatar?path=${detail.avatar}`} /> : <IconFont type="icontouxiang" />}
            </div>
            <div className="pluginD-pluginUser-info">
                <span className="pluginD-pluginUser-info-title">{detail.pluginName || '-'}</span>
                <span className="pluginD-pluginUser-info-name">插件分类</span>
                <span className="pluginD-pluginUser-info-name">{detail.realname || '-'}</span>
            </div>
            <div className="pluginD-pluginUser-more">
                {/* <span className="pluginD-pluginUser-more-like">
                    <HeartTwoTone twoToneColor="#FFF" />
                </span> */}
                <span className="pluginD-pluginUser-more-like-none">
                    <HeartOutlined />
                </span>
            </div>
        </div>
    )
}

export default PluginUser
