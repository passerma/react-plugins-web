import FetchData from '../utils/Fetch'

/**
 * 获取插件列表
 * @param params 列表参数 
 */
export function getPluginListData() {
    let fetchObj: RequestInit = {
        method: 'GET',
    }
    let url = `/plugin/list`
    return FetchData(url, fetchObj)
}

/**
 * 获取用户信息
 */
export function getUserData(userId: number) {
    let fetchObj: RequestInit = {
        method: 'GET',
    }
    let url = `/user/info?userId=${userId}`
    return FetchData(url, fetchObj)
}