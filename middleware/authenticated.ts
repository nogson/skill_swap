import {AuthStore} from '../store'

export default function ({store, redirect}) {
    if (!AuthStore.getToken) {
        //return redirect('/login')
        return
    }

    return AuthStore.requestUserData()
}
