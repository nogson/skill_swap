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
        <skill-card />
        <skill-card />
        <skill-card />
        <skill-card />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import CommonTitle from '~/components/CommonTitle.vue'
    import SkillCard from '~/components/SkillCard.vue'

    @Component({
        components: {
            SkillCard,
            CommonTitle
        }
    })

    export default class extends Vue {
    }
</script>

<style scoped lang="scss">
  #hero-img {
    height: 400px;
    background: $color-primary;
    margin-bottom: $size-xxl;
  }
</style>
