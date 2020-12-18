import FetchData from '../utils/Fetch'

/**
 * 获取插件管理列表
 * @param params 列表参数 
 */
export function getPluginManageList() {
    let fetchObj: RequestInit = {
        method: 'GET',
    }
    let url = `/plugin/manage/list`
    return FetchData(url, fetchObj)
}