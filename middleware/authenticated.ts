import {AuthStore, UserStore} from '@/store'

// export default function ({store, redirect}) {
export default async function () {
    try {
       // console.log('AuthStore.getToken',AuthStore.getToken)
        if (AuthStore.getToken) {
            await UserStore.requestLoginUserData()
        }
    } catch (e) {
        console.log(e)
    }
}
