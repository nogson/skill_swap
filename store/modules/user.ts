import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {IUser} from '@/utils/interface/user'
import {IProfile} from '@/utils/interface/profile'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/user'
})

export default class User extends VuexModule {
    private userData!: IUser | null

    public get getUserData (): any {
      return this.userData ? this.userData : null
    }

    @Mutation
    public setUserData (userData: IUser | null) {
        //console.log('setUserData',userData)
        this.userData = userData
    }

    @Action
    async requestUserData ():Promise<any> {
        try {
            const res = await $axios.$get('api/user')
            this.setUserData(res.response)
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }

    @Action
    async updateUserData (param:{id:number, params:IProfile}):Promise<any> {
        try {
            await $axios.$post(`api/user/${param.id}`, param.params)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
