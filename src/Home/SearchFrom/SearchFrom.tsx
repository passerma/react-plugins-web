import React, { useRef, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './SearchFrom.less'

import Search from '../../images/search.png'
import SearchUser from '../../images/searchUser.png'

type searchTypeTy = 'plugin' | 'user' // 选中状态类型

const SearchFrom: React.FC<RouteComponentProps> = (props) => {
    const [focus, setfocus] = useState(false) // 搜索框是否聚焦
    const [searchValue, setsearchValue] = useState('') // 搜索值
    const [searchType, setsearchType] = useState<searchTypeTy>('plugin') // 搜索类型

    const inputRef = useRef<HTMLInputElement>(null) // 输入框实例

    /**
     * 搜索框聚焦
     */
    const _onFocus = () => {
        setfocus(true)
    }

    /**
     * 搜索框释放
     */
    const _onBlur = () => {
        setfocus(false)
    }

    /**
     * 搜索值改变
     * @param e 事件
     */
    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        setsearchValue(value)
    }

    /**
     * 默认展示点击
     */
    const _onClickPlacehoder = () => {
        inputRef.current!.focus()
    }

    /**
     * 改变选中状态
     * @param type 选中状态
     */
    const _changeSearchType = (type: searchTypeTy) => {
        setsearchType(type)
    }

    const _onKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.history.push(`/plugins/all_allTime?search=${searchValue}&page=1&size=9`)
        }
    }

    return (
        <div className="home-serachFrom">
            <img src={searchType === 'plugin' ? Search : SearchUser} alt="搜索插件" />
            <div className={focus ? 'home-serachFrom-input home-serachFrom-input-focus' : 'home-serachFrom-input'}>
                <span className={searchType === 'plugin' ?
                    'home-serachFrom-input-tabs home-serachFrom-input-tabs-select' :
                    'home-serachFrom-input-tabs'}
                    onClick={() => _changeSearchType('plugin')}>插件</span>
                {/* <span className={searchType === 'user' ?
                    'home-serachFrom-input-tabs home-serachFrom-input-tabs-select' :
                    'home-serachFrom-input-tabs'}
                    onClick={() => _changeSearchType('user')}>用户</span> */}
                <input type="text" value={searchValue} ref={inputRef} onFocus={_onFocus} onBlur={_onBlur}
                    onChange={_onChange} onKeyUp={_onKeyup}></input>
                <span className="home-serachFrom-input-placeholder"
                    style={(focus || searchValue !== '') ? { display: 'none' } : {}}
                    onClick={_onClickPlacehoder}>{searchType === 'plugin' ? '搜索插件' : '搜索用户'}</span>
            </div>
        </div >
    )
}

export default withRouter(SearchFrom)
