import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {IUser} from '@/utils/interface/user'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/auth'
})
export default class Auth extends VuexModule {
    private token!: string
    private userData!: IUser

    @Mutation
    public setToken (token: string) {
        this.token = token
    }

    @Mutation
    public setUserData (userData: IUser) {
        this.userData = userData
    }

    public get getToken (): string {
        return this.token
    }

    public get getUserData (): any {
        return this.userData
    }

    @Action
    async login (params: { password: string, username: string }):Promise<any> {
        const param = {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'hDdQbSAX484FRtCQpHafotaMEfBv0ryuWCn7kvUN',
            scope: ''
        }

        try {
            const res = await $axios.$post('/oauth/token', Object.assign(param, params))
            this.setToken(res.access_token)
            return Promise.resolve()
        } catch (e) {

        }
    }

    @Action
    async requestUserData ():Promise<any> {
        try {
            const res = await $axios.$get('api/user')
            this.setUserData(res)
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
