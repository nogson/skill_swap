
export let axios

export default ({store, $axios}) => {
    $axios.defaults.baseURL = 'https://api.hoge/'

    $axios.onRequest((config) => {
        const token:string = store.getters['modules/auth/getToken']
        if (token) {
            config.headers.common.Authorization = `Bearer ${token}`
        }
        config.headers.common.Accept = 'application/json'
    })

    $axios.onResponse((response) => {
        return Promise.resolve(response)
    })

    $axios.onError((error) => {
        return Promise.reject(error.response)
    })

    axios = $axios
}
