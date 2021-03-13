import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {UserStore} from '@/store'

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'modules/auth'
})
export default class Auth extends VuexModule {
  private token!: string | null

  @Mutation
  public setToken (token: string | null) {
    this.token = token
  }

  public get getToken (): string | null {
    return this.token
  }

  @Action
  async register (params: { name: string, password: string, email: string }): Promise<any> {
    const res = await $axios.$post('api/user', params)
    this.setToken(res.access_token)
  }

  @Action
  async login (params: { password: string, username: string }): Promise<any> {
    const param = {
      grant_type: 'password',
      client_id: '2',
      client_secret: process.env.PASSWORD_GRANT,
      scope: ''
    }

    const res = await $axios.$post('/oauth/token', Object.assign(param, params))
    this.setToken(res.access_token)
  }

  @Action
  async logout (): Promise<any> {
    await $axios.$post('api/user/logout')
    UserStore.setUserData(null)
    this.setToken(null)
  }
}
