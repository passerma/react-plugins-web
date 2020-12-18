import FetchData from '../utils/Fetch'

interface getPluginListDataType {
    id: string
}

/**
 * 获取插件列表
 * @param params 列表参数 
 */
export function getPluginDetail(params: getPluginListDataType) {
    let fetchObj: RequestInit = {
        method: 'GET',
    }
    let url = `/plugin/detail?id=${params.id}`
    return FetchData(url, fetchObj)
}