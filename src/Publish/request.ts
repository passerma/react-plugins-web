import FetchData from '../utils/Fetch'

interface postPluginDetailDataType {
    id: string
}

/**
 * 获取插件列表
 * @param params 列表参数 
 */
export function postPluginDetail(formdata: FormData) {
    let fetchObj: RequestInit = {
        method: 'POST',
        body: formdata
    }
    let url = '/plugin/detail'
    return FetchData(url, fetchObj)
}