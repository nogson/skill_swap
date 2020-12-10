import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Auth from '@/store/modules/auth'
import User from '@/store/modules/user'

let AuthStore: Auth
let UserStore: User

function initialiseStores (store: Store<any>): void {
    AuthStore = getModule(Auth, store)
    UserStore = getModule(User, store)

}

export {initialiseStores, AuthStore,UserStore}
