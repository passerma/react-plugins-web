import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PluginItem.less'
import {
    EyeOutlined,
    HeartOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { message, Spin } from 'antd';

import { pluginListType } from '../../typings/plugin';

import { getPluginListData } from '../request'
import IconFont from '../../utils/IconFont'

const PluginItem = () => {

    const [items, setitems] = useState<pluginListType[]>([])

    /**
     * 生成占位符
     */
    const _createItemPlaceholder = () => {
        let items = []
        for (let i = 0; i < 9; i++) {
            const item = <div key={i} className="home-pluginItem-box">
                <Spin>
                    <div className="box-avatar">
                        <IconFont type="iconuser" />
                    </div>
                    <div className="box-name">用户名加载中...</div>
                    <div className="box-img">
                        <IconFont type="iconpicture" />
                    </div>
                    <div className="box-title">插件名加载中...</div>
                    <div className="box-desc">插件名描述加载中...</div>
                    <div className="box-more">
                        <span className="box-more-see">
                            <EyeOutlined />0
                            </span>
                        <span className="box-more-see">
                            <HeartOutlined />0
                            </span>
                        <span className="box-more-see">
                            <MessageOutlined />0
                            </span>
                    </div>
                </Spin>
            </div>
            items.push(item)
        }
        return items
    }

    useEffect(() => {
        getPluginListData().then(res => {
            if (res && res.ErrCode === 0) {
                setitems(res.data.data)
            } else {
                message.error(res.ErrMsg)
            }
        })
    }, [])

    return (
        <div className="home-pluginItem">
            {items.length > 0 && items.map((element) =>
                <Link to={`/plugin/${element.id}`} target="_blank" key={element.id} className="home-pluginItem-box">
                    <div className="box-avatar">
                        <img src={`/file/avatar?path=${element.avatar}`} alt="头像" />
                    </div>
                    <div className="box-name">{element.realname || '---------'}</div>
                    <div className="box-img">
                        <img src={`/file/pluginImg?path=${element.pluginImg}`} alt="预览" />
                    </div>
                    <div className="box-title" title={element.pluginName}>{element.pluginName || '---------'}</div>
                    <div className="box-desc" title={element.pluginDesc}>{element.pluginDesc || '---------'}</div>
                    <div className="box-more">
                        <span className="box-more-see" title={'浏览数量：' + element.lookNum}>
                            <EyeOutlined />{element.lookNum}
                        </span>
                        <span className="box-more-see" title={'收藏数量：' + element.likeNum}>
                            <HeartOutlined />{element.likeNum}
                        </span>
                        <span className="box-more-see" title={'评论数量：' + element.commentNum}>
                            <MessageOutlined />{element.commentNum}
                        </span>
                    </div>
                </Link>)
            }
            {
                items.length === 0 && _createItemPlaceholder()
            }
        </div>
    )
}

export default PluginItem
