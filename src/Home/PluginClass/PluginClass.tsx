import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface'
import './PluginClass.less'

const { SubMenu } = Menu;

const PluginClass: React.FC<RouteComponentProps> = (props) => {
    const [current] = useState('allTime')

    const _handleClick = (e: MenuInfo) => {
        let path = `${e.keyPath[1] || 'more'}_${e.keyPath[0]}`
        props.history.push(`/plugins/${path}?page=1&size=9`)
    }

    return (
        <div className="home-pluginClass">
            <Menu className="home-pluginClass-menu" onClick={_handleClick} selectedKeys={[current]} mode="horizontal"
                theme="dark">
                <SubMenu key="all" title="全部">
                    <Menu.Item key="allLike">收藏最多</Menu.Item>
                    <Menu.Item key="allLook">浏览最多</Menu.Item>
                    <Menu.Item key="allTime">最新发布</Menu.Item>
                </SubMenu>
                <SubMenu key="media" title="媒体">
                    <Menu.Item key="image">图片</Menu.Item>
                    <Menu.Item key="video">音频</Menu.Item>
                    <Menu.Item key="audio">视频</Menu.Item>
                    <Menu.Item key="mediaOther">其他</Menu.Item>
                </SubMenu>
                <SubMenu key="nav" title="导航">
                    <Menu.Item key="navbar">导航条</Menu.Item>
                    <Menu.Item key="tree">文件树</Menu.Item>
                    <Menu.Item key="bread">面包屑</Menu.Item>
                    <Menu.Item key="pagination">分页器</Menu.Item>
                    <Menu.Item key="navOther">其他</Menu.Item>
                </SubMenu>
                <SubMenu key="input" title="输入">
                    <Menu.Item key="inputTime">日期时间</Menu.Item>
                    <Menu.Item key="inputLogin">账户密码</Menu.Item>
                    <Menu.Item key="inputSelect">选择框</Menu.Item>
                    <Menu.Item key="inputDom">输入框</Menu.Item>
                    <Menu.Item key="inputOther">其他</Menu.Item>
                </SubMenu>
                <SubMenu key="ui" title="UI">
                    <Menu.Item key="uiDisplay">布局</Menu.Item>
                    <Menu.Item key="uiLoding">加载</Menu.Item>
                    <Menu.Item key="uiScroll">滚动</Menu.Item>
                    <Menu.Item key="uiPlay">动画效果</Menu.Item>
                    <Menu.Item key="uiOther">其他</Menu.Item>
                </SubMenu>
                <SubMenu key="feedback" title="反馈">
                    <Menu.Item key="fbModal">对话框</Menu.Item>
                    <Menu.Item key="fbMessage">提示框</Menu.Item>
                    <Menu.Item key="fbResult">结果</Menu.Item>
                    <Menu.Item key="fbOther">其他</Menu.Item>
                </SubMenu>
                <SubMenu key="show" title="展示">
                    <Menu.Item key="showDate">日历</Menu.Item>
                    <Menu.Item key="showImg">图片</Menu.Item>
                    <Menu.Item key="showList">列表</Menu.Item>
                    <Menu.Item key="showOther">其他</Menu.Item>
                </SubMenu>
                <Menu.Item key="others">其他</Menu.Item>
                <Menu.Item key="antd">集成库</Menu.Item>
                <Menu.Item key="page">网页模板</Menu.Item>
                <Menu.Item key="more">更多</Menu.Item>
            </Menu>
        </div>
    )
}

export default withRouter(PluginClass)
