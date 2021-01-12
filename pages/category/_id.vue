<template>
  <div class="box-category main-content">
    <side-nav :categories="categories" :selected-category="selectedCategory" />
    <div class="box-category-main">
      <common-title klass="title-2">
        {{ selectedCategory.name }}
      </common-title>
      <div class="cards-2col">
        <user-card />
        <user-card />
        <user-card />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'nuxt-property-decorator'
  import {CategoryStore} from '@/store'
  import CommonTitle from '~/components/CommonTitle.vue'
  import SideNav from '~/components/SideNav.vue'
  import UserCard from '~/components/UserCard.vue'

  @Component({
    components: {UserCard, SideNav, CommonTitle},
    middleware: ['authenticated', 'common']
  })

  export default class extends Vue {
    get categories () {
      return CategoryStore.getCategories
    }

    get selectedCategory () {
      if (CategoryStore.getCategories) {
        return CategoryStore.getCategories.find(d => String(d.id) === this.$route.params.id)
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
