<template>
  <div class="box-category main-content">
    <side-nav :categories="categories" :selected-category="selectedCategory" :selected-skill="selectedSkill" />
    <div class="box-category-main">
      <common-title klass="title-2">
        {{ selectedCategory.name }}
      </common-title>
      <common-title klass="title-4">
        {{ selectedSkill.name }}
      </common-title>
      <div class="cards-2col">
        <user-card v-for="user in users" :user="user" :key="user.id"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator'
  import {CategoryStore, SkillStore} from '@/store'
  import CommonTitle from '~/components/CommonTitle.vue'
  import SideNav from '~/components/SideNav.vue'
  import UserCard from '~/components/UserCard.vue'
  import {IUser} from '~/utils/interface/user'

  @Component({
    components: {UserCard, SideNav, CommonTitle},
    middleware: ['authenticated', 'common']
  })

  export default class extends Vue {
    @Provide() private users: IUser [] = []

    async created () {
      const res = await CategoryStore.requestUserBySkill(Number(this.$route.params.id))
      this.users = res.response
    }

    get categories () {
      return CategoryStore.getCategories
    }

    get selectedCategory () {
      const selectedSkill = this.selectedSkill
      if (CategoryStore.getCategories && selectedSkill) {
          return CategoryStore.getCategories.find(d => d.id === selectedSkill.category_id)
        }
    }

    get selectedSkill () {
      if (SkillStore.getSkills) {
        return SkillStore.getSkills.find(d => String(d.id) === this.$route.params.id)
      }
    }
  }
</script>

<style scoped lang="scss">
.box-category {
  display: flex;
}
  .box-category-main {
    width: 100%;
  }
</style>
