import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {ISkill} from '@/utils/interface/skill'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/skill'
})

export default class Skill extends VuexModule {
    private skills: ISkill[] | null

    public get getSkills () {
        return this.skills
    }

    @Mutation
    public setSkills (skills: ISkill[] | null) {
        this.skills = skills
    }

    @Action
    async requestSkills ():Promise<any> {
        try {
            const res = await $axios.$get('api/skills')
            this.setSkills(res.response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
