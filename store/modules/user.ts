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
      const res = await $axios.$get('api/loginUser')
      this.setUserData(res.response)
      return res
  }

  @Action
  async requestUserData (id:number): Promise<any> {
      const res = await $axios.$get(`api/user/${id}`)
      return res
  }

  @Action
  async updateUserData (param: { id: number, params: IProfile }): Promise<any> {
      await $axios.$post(`api/user/${param.id}`, param.params)
  }

  @Action
  async requestUserDataBySkill (ids:any): Promise<any> {
      const res = await $axios.$post('api/skills/users', ids)
      return res
  }
}
