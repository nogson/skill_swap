<template>
  <div>
    <div id="hero-img">
      メインイメージ
    </div>
    <article class="box-content">
      <common-title klass="title-1">
        Skill swapのメリット
      </common-title>
    </article>
    <article class="box-content">
      <common-title klass="title-1">
        人気のスキル
      </common-title>
      <common-title klass="title-3">
        プログラミング
      </common-title>
      <div class="cards">
        <div v-for="category in categories" :key="category.id">
          <skill-card :category="category" />
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import {CategoryStore} from '@/store'
    import CommonTitle from '~/components/CommonTitle.vue'
    import SkillCard from '~/components/SkillCard.vue'

    @Component({
        components: {
            SkillCard,
            CommonTitle
        },
        middleware: ['authenticated', 'common']
    })

    export default class extends Vue {
        // async fetch () {
        //     await CategoryStore.requestCategories()
        // }

        get categories () {
            return CategoryStore.getCategories
        }
    }
</script>

<style scoped lang="scss">
  #hero-img {
    height: 400px;
    background: $color-primary;
    margin-bottom: $size-xxl;
  }
</style>
