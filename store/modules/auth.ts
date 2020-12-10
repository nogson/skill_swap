import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/auth'
})
export default class Auth extends VuexModule {
    private token!: string

    @Mutation
    public setToken (token: string) {
        this.token = token
    }

    public get getToken (): string {
        return this.token
    }

    @Action
    async login (params: { password: string, username: string }):Promise<any> {
        const param = {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'mSOtmjvMb5bVo2E2AbXCLpegbGUCOPXQipwU7Xsx',
            scope: ''
        }

        try {
            const res = await $axios.$post('/oauth/token', Object.assign(param, params))
            this.setToken(res.access_token)
            return Promise.resolve()
        } catch (e) {

        }
    }
}
