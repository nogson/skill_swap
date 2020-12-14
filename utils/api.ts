import {NuxtAxiosInstance} from '@nuxtjs/axios'
import {AuthStore} from '@/store'

let $axios: NuxtAxiosInstance

export function initializeAxios (axiosInstance: NuxtAxiosInstance): void {
    $axios = axiosInstance

    $axios.defaults.baseURL = 'http://localhost'
    $axios.onRequest((config) => {
        const token:string = AuthStore.getToken
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
}

export {$axios}
