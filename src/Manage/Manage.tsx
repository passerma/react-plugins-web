import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Steps, message } from 'antd'
import {
    EyeOutlined,
    HeartOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { getPluginManageList } from './request'
import IconFont from '../utils/IconFont'
import './Manage.less'

interface pluginsManageType {
    id: number,
    pluginName: string,
    pluginDesc: string,
    pluginImg: string,
    pluginState: number,
    commentNum: number,
    likeNum: number,
    lookNum: number
}

const { Step } = Steps;

const Manage = () => {

    const [pluginsManageList, setpluginsManageList] = useState<pluginsManageType[]>([])

    const _editPlugin = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const _cancleAtack = () => {

    }

    const _delPlugin = () => {

    }

    const _canclePublish = () => {

    }

    const _reAtack = () => {

    }

    const _rePublish = () => {

    }
    const _createBtn = (type: number) => {
        let element: null | JSX.Element = null
        switch (type) {
            case 1: // 待审核
                element = <Fragment>
                    <Button type="primary" onClick={_editPlugin}>编辑插件</Button>
                    <Button danger onClick={_editPlugin}>取消审核</Button>
                    <Button type="primary" danger onClick={_editPlugin}>删除插件</Button>
                </Fragment>
                break;
            case 2: // 审核中
                element = <Fragment>
                    <Button type="primary" disabled onClick={_editPlugin}>编辑插件</Button>
                    <Button danger>取消审核</Button>
                    <Button type="primary" danger>删除插件</Button>
                </Fragment>
                break;
            case 3: // 待发布
                element = <Fragment>
                    <Button type="primary" disabled>编辑插件</Button>
                    <Button danger>取消发布</Button>
                    <Button type="primary" danger>删除插件</Button>
                </Fragment>
                break;
            case 4: // 已发布
                element = <Fragment>
                    <Button type="primary">编辑插件</Button>
                    <Button danger>取消发布</Button>
                    <Button type="primary" danger>删除插件</Button>
                </Fragment>
                break;
            case 5: // 重新审核
                element = <Fragment>
                    <Button type="primary">编辑插件</Button>
                    <Button danger>重新审核</Button>
                    <Button type="primary" danger>删除插件</Button>
                </Fragment>
                break;
            case 6: // 已发布
                element = <Fragment>
                    <Button type="primary">编辑插件</Button>
                    <Button danger>重新发布</Button>
                    <Button type="primary" danger>删除插件</Button>
                </Fragment>
                break;
            default:
                break;
        }
        return element
    }

    const _createStep = (item: pluginsManageType) => {
        let element: null | JSX.Element = null
        if (item.pluginState < 4) {
            element = <Steps size="small" current={item.pluginState - 1}>
                <Step title="待审核" />
                <Step title="审核中" />
                <Step title="待发布" />
            </Steps>
        } else if (item.pluginState === 4) {
            element = <div className="manage-item-step-cmp">
                <IconFont type="iconchenggong" />
                <span className="cmp-test">已发布</span>
                <span className="cmp-look" title={`浏览：${item.lookNum}`}>
                    <EyeOutlined /><span className="cmp-look-num ellipse">{item.lookNum}</span>
                </span>
                <span className="cmp-like" title={`收藏：${item.likeNum}`}>
                    <HeartOutlined /><span className="cmp-look-num ellipse">{item.likeNum}</span>
                </span>
                <span className="cmp-comment" title={`评论：${item.commentNum}`}>
                    <MessageOutlined /><span className="cmp-look-num ellipse">{item.commentNum}</span>
                </span>
            </div>
        } else if (item.pluginState === 5) {
            element = <div className="manage-item-step-cmp grayColor">
                <IconFont type="iconshenhedaiban" />
                <span className="cmp-test">请重新审核</span>
            </div>
        } else {
            element = <div className="manage-item-step-cmp grayColor">
                <IconFont type="iconfabu" />
                <span className="cmp-test">请发布</span>
                <span className="cmp-look grayColor" title={`浏览：${item.lookNum}`}>
                    <EyeOutlined /><span className="cmp-look-num ellipse">{item.lookNum}</span>
                </span>
                <span className="cmp-like grayColor" title={`收藏：${item.likeNum}`}>
                    <HeartOutlined /><span className="cmp-look-num ellipse">{item.likeNum}</span>
                </span>
                <span className="cmp-comment grayColor" title={`评论：${item.commentNum}`}>
                    <MessageOutlined /><span className="cmp-look-num ellipse">{item.commentNum}</span>
                </span>
            </div>
        }
        return element
    }

    useEffect(() => {
        getPluginManageList().then(res => {
            if (res && res.ErrCode === 0) {
                setpluginsManageList(res.data)
            } else {
                res && message.error(res.ErrMsg)
            }
        })
    }, [])
    return (
        <div className="manage">
            <div className="manage-box">
                {
                    pluginsManageList.map((element) => <div className="manage-item" key={element.id}>
                        <Link to={`/plugin/${element.id}`} target="_blank">
                            <div className="manage-item-img">
                                {
                                    element.pluginImg ? <img src={`/file/pluginImg?path=${element.pluginImg}`} /> :
                                        <IconFont type="iconbeijingtu1" />
                                }
                            </div>
                            <div className="manage-item-name ellipse">{element.pluginName}</div>
                            <div className="manage-item-desc">{element.pluginDesc}</div>
                        </Link>
                        <div className="manage-item-step">
                            {
                                _createStep(element)
                            }
                        </div>
                        <div className="manage-item-btn">
                            {
                                _createBtn(element.pluginState)
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Manage
