import {CategoryStore, SkillStore} from '@/store'

export default async function () {
    try {
        await CategoryStore.requestCategories()
        await SkillStore.requestSkills()
    } catch (e) {
        console.log(e)
    }
}
