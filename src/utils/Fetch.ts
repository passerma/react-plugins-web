export default function FetchData(url: string, params: RequestInit) {
    let opts: RequestInit = {
        ...params,
        credentials: "include",
    };
    return fetch(`/api${url}`, opts)
        .catch(err => {
            console.log(err);
            return null
        })
        .then(response => {
            if (response) {
                return response.json().then((res: any) => {
                    return res
                });
            } else {
                return null
            }
        })
}