import React, { useEffect, useState } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { reducerType } from '../../Redux';

import './Navbar.less'
import Logo from '../../images/Logo.png'
import NavSearch from './NavSearch'

//#region 类型定义文件
interface NavbarProps extends RouteComponentProps {
    islogin: boolean
}
//#endregion

const Navbar: React.FC<NavbarProps> = (props) => {
    const [path, setpath] = useState('/')

    useEffect(() => {
        const { pathname } = props.location
        switch (pathname) {
            case '/':
                setpath('/')
                break;
            case '/publish':
            case '/publish/':
                setpath('/publish')
                break;
            case '/help':
            case '/help/':
                setpath('/help')
                break;
            default:
                setpath(pathname)
                break;
        }
    }, [props.location])

    return (
        <div className="com-navbar">
            <div className="home-logo">
                <Link to="/">
                    <img src={Logo} alt="React+" />
                </Link>
            </div>
            <div className="home-item">
                <Link to="/" style={path === '/' ? { color: '#fff' } : {}}>首页</Link>
            </div>
            <div className="home-item">
                <Link to="/publish" style={path === '/publish' ? { color: '#fff' } : {}}>发布</Link>
            </div>
            <div className="home-item">
                <Link to="/help" style={path === '/help' ? { color: '#fff' } : {}}>帮助</Link>
            </div>
            <div className="home-user">
                <Link to="/manage" target="_blank">
                    <span>个人中心</span>
                </Link>
            </div>
            <div className="home-search" style={{ display: path === '/' ? 'none' : 'block' }}>
                <NavSearch />
            </div>
        </div>
    )
}

function mapStateToProps(state: reducerType) {
    let { getLogin } = state
    return {
        islogin: getLogin,
    }
}

export default connect(mapStateToProps)(withRouter(Navbar));
