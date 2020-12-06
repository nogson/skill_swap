import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/auth'
})
export default class Auth extends VuexModule {
    private token!: string
    private userData!: {}

    @Mutation
    public setToken (token: string) {
        this.token = token
    }

    @Mutation
    public setUserData (token: string) {
        this.token = token
    }

    public get getToken (): string {
        return this.token
    }

    public get getUserData (): any {
        return this.userData
    }

    @Action
    async login (params: { password: string, username: string }) {
        const param = {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'hDdQbSAX484FRtCQpHafotaMEfBv0ryuWCn7kvUN',
            scope: ''
        }

        const res = await $axios.$post('/oauth/token', Object.assign(param, params))
        this.setToken(res.access_token)
    }

    @Action
    async requestUserData () {
        const res = await $axios.$get('api/user')
       // this.setUserData()
        console.log(res)
    }
}
