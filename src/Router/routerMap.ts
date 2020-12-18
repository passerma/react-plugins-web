import { ComponentClass, FC } from 'react'
import Home from '../Home/Home';
import Publish from '../Publish/Publish';
import Help from '../Help/Help';
import Plugins from '../Plugins/Plugins';
import PluginDetail from '../PluginDetail/PluginDetail';
import Manage from '../Manage/Manage';

// path:路径 component:组件 exact:精准路由 login:页面是否受登录控制 none:不满足跳转到位置 needLogin:页面浏览是否需要登录
export interface routersInterface {
    path: string,
    component: ComponentClass | FC,
    exact: boolean,
    needLogin: boolean
}

export const routers: routersInterface[] = [
    { path: '/', component: Home, exact: true, needLogin: false },
    { path: '/publish', component: Publish, exact: true, needLogin: false },
    { path: '/help', component: Help, exact: true, needLogin: false },
    { path: '/plugins', component: Plugins, exact: true, needLogin: false },
    { path: '/plugins/:type', component: Plugins, exact: true, needLogin: false },
    { path: '/plugin/:id', component: PluginDetail, exact: true, needLogin: false },
    { path: '/manage', component: Manage, exact: true, needLogin: false }
]