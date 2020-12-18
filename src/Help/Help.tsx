import React, { Component } from 'react'
import './Help.less'

export default class Help extends Component {
    render() {
        return (
            <div className="help">
                <h1>react插件网-收集最全最新最好的react插件</h1>
                <p>本站尚在建设中，欢迎有兴趣的小伙伴加入</p>
                <p>完整项目的开发流程体验</p>
                <p>丰富你的简历以及经验</p>
                <p>为他人提供便利的机会</p>
                <p style={{ marginTop: '30px' }}>联系方式：</p>
                <p>QQ：2035976422</p>
                <p>邮箱：admin@passerma.com</p>
                <p>其他问题？直接反馈
                <a rel="noopener noreferrer" href="https://www.passerma.com/article/68"
                        target="_blank" style={{ marginLeft: '10px' }}>项目交流网站</a>
                </p>
            </div>
        )
    }
}