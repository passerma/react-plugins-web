interface paramsType {
    [propName: string]: any;
}

/**
 * 解析url参数 
 * @param url 
 */
export function getUrlkey(url: string): paramsType {
    let params: paramsType = {};
    let urls = url.split("?");
    if (urls.length > 1) {
        let arr = urls[1].split("&");
        for (let i = 0, l = arr.length; i < l; i++) {
            let a = arr[i].split("=");
            params[a[0]] = a[1];
        }
        return params;
    } else {
        return {};
    }
}

/**
 * 下载文件 
 * @param url 
 */
export function downByA(url: string, name: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
}