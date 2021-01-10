import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {ICategory} from '@/utils/interface/category'

@Module({
    stateFactory: true,
    namespaced: true,
    name: 'modules/category'
})

export default class Category extends VuexModule {
    private categories: ICategory[] | null

    public get getCategories () {
        return this.categories
    }

    @Mutation
    public setCategories (categories: ICategory[] | null) {
        this.categories = categories
    }

    @Action
    async requestUserByCategory (categoryId:Number):Promise<any> {
        try {
            const path = `api/category/${categoryId}/user`
            const res = await $axios.$get(path)
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }

    @Action
    async requestCategories ():Promise<any> {
        try {
            const res = await $axios.$get('api/categories')
            this.setCategories(res.response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
