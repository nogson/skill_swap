<template>
  <div class="box-category main-content">
    <side-nav />
    <div class="box-category-main">
      <common-title klass="title-2">
        PHP
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
  import CommonTitle from '~/components/CommonTitle.vue'
  import SideNav from '~/components/SideNav.vue'
  import UserCard from '~/components/UserCard.vue'

  @Component({
    components: {UserCard, SideNav, CommonTitle}
  })

  export default class extends Vue {
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
