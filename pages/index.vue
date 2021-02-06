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
      <popular-skills />
    </article>
    <article class="box-content">
      <common-title klass="title-1">
        カテゴリ別
      </common-title>
      <div v-for="(category,$index) in categories" :key="$index" class="category-box">
        <common-title klass="title-3">
          {{ category.name }}
        </common-title>
        <skills :category="category" />
      </div>

      <div class="cards">
        <div v-for="category in categories" :key="category.id" />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'nuxt-property-decorator'
  import {CategoryStore} from '@/store'
  import CommonTitle from '~/components/CommonTitle.vue'
  import Skills from '~/components/Skills.vue'

  @Component({
    components: {
        Skills,
      CommonTitle
    },
    middleware: ['authenticated', 'common']
  })

  export default class extends Vue {
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
