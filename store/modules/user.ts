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
  private loginUserData!: IUser | null

  public get getLoginUserData (): any {
    return this.loginUserData ? this.loginUserData : null
  }

  @Mutation
  public setUserData (userData: IUser | null) {
    this.loginUserData = userData
  }

  @Action
  async requestLoginUserData (): Promise<any> {
    try {
      const res = await $axios.$get('api/user')
      this.setUserData(res.response)
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action
  async requestUserData (id:number): Promise<any> {
    try {
      const res = await $axios.$get(`api/user/${id}`)
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action
  async updateUserData (param: { id: number, params: IProfile }): Promise<any> {
    try {
      await $axios.$post(`api/user/${param.id}`, param.params)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
