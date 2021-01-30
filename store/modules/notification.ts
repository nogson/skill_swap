import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {ISendMessage} from '@/utils/interface/notification'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/notification'
})

export default class Skill extends VuexModule {
    @Action
    async sendMessage (props:ISendMessage):Promise<any> {
        try {
           const res = await $axios.$post('api/message', props)
            return Promise.resolve(res)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    @Action
    async getMessage (id:Number):Promise<any> {
        try {
            const res = await $axios.$get(`api/getMessages/${id}`)
            return Promise.resolve(res)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    @Action
    async getUsers ():Promise<any> {
        try {
            const res = await $axios.$get('api/getMessageUsers')
            return Promise.resolve(res)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
