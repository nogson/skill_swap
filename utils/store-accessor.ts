import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Auth from '@/store/modules/auth'
import User from '@/store/modules/user'
import Category from '@/store/modules/category'
import Skill from '@/store/modules/skill'

let AuthStore: Auth
let UserStore: User
let CategoryStore: Category
let SkillStore: Skill

function initialiseStores (store: Store<any>): void {
    AuthStore = getModule(Auth, store)
    UserStore = getModule(User, store)
    CategoryStore = getModule(Category, store)
    SkillStore = getModule(Skill, store)
}

export {initialiseStores, AuthStore, UserStore, CategoryStore, SkillStore}
