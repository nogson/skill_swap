import {AuthStore, UserStore} from '@/store'

//export default function ({store, redirect}) {
export default function () {
    if (!AuthStore.getToken) {
        // return redirect('/login')
        return
    }

    return UserStore.requestUserData()
}
