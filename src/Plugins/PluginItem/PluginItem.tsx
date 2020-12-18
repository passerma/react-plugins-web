import React, { useState, useEffect, Fragment } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import './PluginItem.less'
import {
    EyeOutlined,
    HeartOutlined,
    MessageOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { message, Pagination } from 'antd';

import { getUrlkey } from '../../utils/globalFunc'
import { pluginListType } from '../../typings/plugin';

import { getPluginListData } from '../request'
import IconFont from '../../utils/IconFont'

interface paramsType {
    type: string
}

interface queryType {
    class: string,
    subClass: string,
    page: string,
    size: string,
    search: string
}

interface propsType extends RouteComponentProps<paramsType> {

}

const PluginItem: React.FC<propsType> = (props) => {

    const [items, setitems] = useState<pluginListType[]>([])
    const [count, setcount] = useState(0)
    const [current, setcurrent] = useState(1)
    const [query, setquery] = useState<queryType>({
        class: '',
        subClass: '',
        page: '',
        size: '',
        search: ''
    })
    const [loading, setloading] = useState(false)

    const onSizeChange = (page: number | undefined, pageSize: number | undefined) => {
        let params = {
            class: query.class || '',
            subClass: query.subClass || '',
            page: page || 1,
            size: pageSize || 9,
            search: query.search || ''
        }
        let path = `${params.class || 'more'}_${params.subClass}`
        props.history.push(`/plugins/${path}?page=${params.page}&size=${params.size}&search=${params.search}`)
    }

    useEffect(() => {
        setloading(true)
        let type = props.match.params.type
        let typeArr = type.split('_')
        let urlQuery = getUrlkey(props.location.search)
        let params = {
            class: typeArr[0] || '',
            subClass: typeArr[1] || '',
            page: urlQuery.page || 1,
            size: urlQuery.size || 9,
            search: urlQuery.search || ''
        }
        setquery(params)
        setcurrent(Number(urlQuery.page) || 1)
        getPluginListData(params).then(res => {
            if (res && res.ErrCode === 0) {
                setcount(res.data.count)
                setitems(res.data.data)
            } else {
                res && message.error(res.ErrMsg)
            }
            setloading(false)
        })
    }, [props.match.params])

    return (
        <Fragment>
            <div className="plugins-pluginItem">
                {
                    query.search && <div className="plugins-pluginItem-searchInfo">
                        <span>"{query.search}"</span>
                        <span>{count}</span>
                        <span>plugins</span>
                    </div>
                }
                {(items.length > 0 && !loading) && items.map((element) =>
                    <Link to={`/plugin/${element.id}`} target="_blank" key={element.id} className="plugins-pluginItem-box">
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
                        <div className="box-user">
                            <div className="box-avatar">
                                <img src={`/file/avatar?path=${element.avatar}`} alt="头像" />
                            </div>
                            <div className="box-name ellipse">{element.realname || '---------'}</div>
                        </div>
                        <div className="box-type ellipse">
                            正常数组
                        </div>
                    </Link>)
                }
                {
                    loading && <LoadingOutlined className="plugins-pluginItem-loading" />
                }
                {
                    (items.length === 0 && !loading) && <div className="plugins-pluginItem-none">
                        <IconFont type="iconwushuju" />
                    </div>
                }
            </div>
            {
                (items.length > 0 && !loading) && <div className="plugins-btn">
                    {/* <div className="plugins-before plugins-btn-none">上一页</div>
                    <div className="plugins-next">下一页</div> */}
                    <Pagination current={current} pageSize={9} total={count} onChange={onSizeChange} />
                </div>
            }
        </Fragment>
    )
}

export default withRouter(PluginItem)
