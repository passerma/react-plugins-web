import React from 'react'
import './Footer.less'

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-wrap">
                <a href="https://www.passerma.com" rel="noopener noreferrer" target="_blank">&copy;&nbsp;PASSERMA</a>
                <a href="http://www.beian.miit.gov.cn" rel="noopener noreferrer" target="_blank">浙ICP备18045684号-2</a>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802001747"
                    rel="noopener noreferrer" target="_blank">浙公网安备33011802001747号</a>
            </div>
        </div>
    )
}

export default Footer
