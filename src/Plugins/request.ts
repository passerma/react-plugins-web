import FetchData from '../utils/Fetch'

interface getPluginListDataType {
    class: string,
    subClass: string,
    page: number,
    size: number,
    search: ''
}

/**
 * 获取插件列表
 * @param params 列表参数 
 */
export function getPluginListData(params: getPluginListDataType) {
    let fetchObj: RequestInit = {
        method: 'GET',
    }
    let url = `/plugin/list?class=${params.class}&subClass=${params.subClass}&page=${params.page}&size=${params.size}&search=${params.search}`
    return FetchData(url, fetchObj)
}