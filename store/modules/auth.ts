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
  async register (params: { name:string, password: string, email: string }): Promise<any> {
    try {
      const res = await $axios.$post('api/user', params)
      this.setToken(res.access_token)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action
  async login (params: { password: string, username: string }): Promise<any> {
    const param = {
      grant_type: 'password',
      client_id: '2',
      client_secret: process.env.PASSWORD_GRANT,
      scope: ''
    }

    try {
      const res = await $axios.$post('/oauth/token', Object.assign(param, params))
      this.setToken(res.access_token)
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  @Action
  async logout (): Promise<any> {
    try {
      await $axios.$post('api/user/logout')
      UserStore.setUserData(null)
      this.setToken(null)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
