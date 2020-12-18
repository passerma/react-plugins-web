import React, { useRef, useEffect } from 'react'
import { Divider, Button, Timeline } from 'antd';
import hljs from 'highlight.js';
import Highlight from 'react-highlight'
import 'highlight.js/styles/zenburn.css'
import {
    HeartTwoTone, HeartOutlined, EyeOutlined, MessageOutlined
} from '@ant-design/icons';
import './PluginInfo.less'

import IconFont from '../../utils/IconFont'
import { downByA } from '../../utils/globalFunc'

const dev = process.env.NODE_ENV === "development"
const protocol = window.location.protocol
const host = window.location.host

interface PluginUserProps {
    detail: {
        pluginName?: string
        pluginImg?: string,
        pluginDesc?: string,
        pluginUse?: string,
        likeNum?: number,
        lookNum?: number,
        commentNum?: number,
        react?: string,
        chrome?: string,
        firefox?: string,
        safari?: string,
        ie?: string,
        pluginFile?: string
        pluginUrl?: string
    }
}

const PluginInfo: React.FC<PluginUserProps> = (props) => {

    const pluginUseRef = useRef<HTMLDivElement>(null)
    const { detail } = props

    /**
   * 代码高亮
   */
    const highlightCallBack = () => {
        document.querySelectorAll("pre code").forEach(block => {
            try {
                hljs.highlightBlock(block as HTMLElement);
            }
            catch (e) {
                console.log(e);
            }
        });
    }

    useEffect(() => {
        pluginUseRef.current && (pluginUseRef.current!.innerHTML = (detail.pluginUse || ''))
        highlightCallBack()
    }, [detail.pluginUse])

    const getReactVersion = (info: string) => {
        let infoArr = info.split('-')
        let value = infoArr[0] ? infoArr[0] : 2
        let valueMore = ''
        if (infoArr.length > 1) {
            valueMore = infoArr.slice(1, infoArr.length).join("-")
        }
        if (value === "1" || value === "2" || value === "3") {
            switch (value) {
                case '1':
                    return '最新'
                case '2':
                    return '不涉及'
                case '3':
                    return valueMore || '不涉及'
                default:
                    return '不涉及'
            }
        } else {
            return '不涉及'
        }
    }

    const getBrowVersion = (info: string) => {
        let infoArr = info.split('-')
        let value = infoArr[0] ? infoArr[0] : 2
        let valueMore = ''
        if (infoArr.length > 1) {
            valueMore = infoArr.slice(1, infoArr.length).join("-")
        }
        if (value === "1" || value === "2" || value === "3") {
            switch (value) {
                case '1':
                    return '支持'
                case '2':
                    return '不涉及'
                case '3':
                    return valueMore || '不涉及'
                default:
                    return '不涉及'
            }
        } else {
            return '不涉及'
        }
    }

    const _downFile = () => {
        if (detail && detail.pluginFile && detail.pluginName) {
            let fileArr = detail.pluginFile.split('.')
            let name = `${detail.pluginName}.${fileArr[fileArr.length - 1]}`
            let fileUrl = dev ? `http://localhost:7011/file/pluginFile?path=${detail.pluginFile}&fileName=${name}` :
                `${protocol}//${host}/file/pluginFile?path=${detail.pluginFile}&fileName=${name}`
            downByA(fileUrl, name)
        }
    }

    let react = detail.react ? getReactVersion(detail.react) : "不涉及"
    let chrome = detail.chrome ? getBrowVersion(detail.chrome) : "不涉及"
    let firefox = detail.firefox ? getBrowVersion(detail.firefox) : "不涉及"
    let safari = detail.safari ? getBrowVersion(detail.safari) : "不涉及"
    let ie = detail.ie ? getBrowVersion(detail.ie) : "不涉及"

    return (
        <div className="pluginD-pluginInfo">
            <div className="pluginD-pluginInfo-top">
                <div className="pluginD-pluginInfo-img">
                    {detail.pluginImg ? <img src={`/file/pluginImg?path=${detail.pluginImg}`} /> :
                        <IconFont type="iconbeijingtu1" />}
                </div>
                <div className="pluginD-pluginInfo-can">
                    <div className="pluginD-pluginInfo-can-info">
                        <IconFont type="iconreact" /> {react}
                    </div>
                    <div className="pluginD-pluginInfo-can-info">
                        <IconFont type="iconchrome" className="chrome" /> {chrome}
                    </div>
                    <div className="pluginD-pluginInfo-can-info">
                        <IconFont type="iconfirefox" className="fire" /> {firefox}
                    </div>
                    <div className="pluginD-pluginInfo-can-info">
                        <IconFont type="iconsafari" className="safa" /> {safari}
                    </div>
                    <div className="pluginD-pluginInfo-can-info">
                        <IconFont type="iconie" className="ie" /> {ie}
                    </div>
                </div>
            </div>
            <div className="pluginD-pluginInfo-btn">
                <Button type="primary">查看演示</Button>
                {
                    detail.pluginUrl && <Button>
                        <a href={detail.pluginUrl} target="_blank" rel="noopener noreferrer">插件网站</a>
                    </Button>
                }
                <Button onClick={_downFile}>下载代码</Button>
            </div>
            <div className="pluginD-pluginInfo-use">
                <Divider className="use-line">插件描述</Divider>
                <div className="pluginD-pluginInfo-desc">
                    {detail.pluginDesc || ''}
                </div>
            </div>
            <div className="pluginD-pluginInfo-use">
                <Divider className="use-line">使用方法</Divider>
                <div className="use-text" ref={pluginUseRef}></div>
                {/* <Highlight className="use-text">{detail.pluginUse}</Highlight> */}
            </div>
            <div className="pluginD-pluginInfo-use">
                <Divider className="use-line">更新历史</Divider>
                <div className="use-text-update">
                    <Timeline mode="left">
                        <Timeline.Item dot={<IconFont type="iconxitonggengxinrizhi" style={{ fontSize: '16px' }} />}>
                            <div className="use-text-update-time">2020-12-02</div>
                            修改描述
                        </Timeline.Item>
                        <Timeline.Item dot={<IconFont type="iconshangchuan" style={{ fontSize: '16px' }} />}>
                            <div className="use-text-update-time">2020-12-01</div>
                            插件上传
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
            <div className="pluginD-pluginInfo-more">
                <Divider className="use-line">
                    <span className="more-item" title={'浏览数量：' + (detail.lookNum || 0)}>
                        <EyeOutlined style={{ margin: '8px' }} />{detail.lookNum || 0}
                    </span>
                    <span className="more-item" title={'点赞数量：' + (detail.likeNum || 0)}>
                        <HeartOutlined style={{ margin: '8px' }} />{detail.likeNum || 0}
                    </span>
                    <span className="more-item" title={'评论数量：' + (detail.lookNum || 0)}>
                        <MessageOutlined style={{ margin: '8px' }} />{detail.lookNum || 0}
                    </span>
                </Divider>
                <span className="pluginD-pluginInfo-more-like-none">
                    <HeartOutlined />
                </span>
            </div>
        </div>
    )
}

export default PluginInfo
