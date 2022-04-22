export const fetchData = <T>(url: string): Promise<T> => {
    return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)
}