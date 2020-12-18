import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './NavSearch.less'
import { SearchOutlined } from '@ant-design/icons';
import { getUrlkey } from '../../utils/globalFunc'

const NavSearch: React.FC<RouteComponentProps> = (props) => {

    const [value, setvalue] = useState('')

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setvalue(e.target.value)
    }

    const _search = () => {
        props.history.push(`/plugins/all_allTime?search=${value}&page=1&size=9`)

    }

    const _onKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            _search()
        }
    }

    useEffect(() => {
        let params = getUrlkey(props.location.search)
        if (params.search) {
            setvalue(params.search)
        }
    }, [props.location])

    return (
        <div className="com-navbar-search">
            <input placeholder="请搜索插件和用户" type="text" value={value} onChange={_onChange} onKeyUp={_onKeyup}></input>
            <SearchOutlined onClick={_search} />
        </div>
    )
}

export default withRouter(NavSearch)
