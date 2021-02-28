<template>
  <div>
    <hero-img />
    <article class="box-content">
      <common-title klass="title-1">
        KOOKAN-KOって何?
      </common-title>
      <div class="about-kookanko">
        <p>KOOKAN-KO(コーカンコ)は、新しいスキルを学びたい人達をマッチングするサービスです。</p>
        <p>自分の得意なスキルを学びたいと思っている人が、自分に無いスキルを持っていることはよくあることです。<br>お互い得意分野を教え合い、さらなるスキルアップを後押しするサービスです。</p>
      </div>
    </article>
    <article class="box-content">
      <common-title klass="title-1">
        KOOKAN-KOのメリット
      </common-title>
      <div class="merit">
        <dl>
          <dt>お金がかからない！</dt>
          <dd class="merit-image">
            <img src="~/assets/images/chara/money.png">
          </dd>
          <dd>
            スクールのように、教えてもらうだけではなく、自分も得意分野を教えてあげることで、
            お金をかけず新しいことを学ぶことができます。
          </dd>
        </dl>
        <dl>
          <dt>スキルの越境できる！</dt>
          <dd class="merit-image">
            <img src="~/assets/images/chara/money.png">
          </dd>
          <dd>
            一人の力で他の分野を学ぶのは大変です。<br>
            でも、その分野で活躍している人と一緒なら新たなスキルも学びやすい！
          </dd>
        </dl>
        <dl>
          <dt>仲間がみつかる！</dt>
          <dd class="merit-image">
            <img src="~/assets/images/chara/money.png">
          </dd>
          <dd>
            同じ分野に興味がある仲間が見つかります。<br>
            新たな出会いが、あなたの成長を加速させること間違いなし！
          </dd>
        </dl>
      </div>
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
  import HeroImg from '~/components/HeroImg.vue'

  @Component({
    components: {
        HeroImg,
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
  .about-kookanko{
    text-align: center;
    p{
      margin-bottom: $size-l;
    }
  }
  .merit{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: $size-xl;
    grid-column-gap: $size-xxl;
    dt {
      font-size: $font-size-16;
      font-weight: bold;
      text-align: center;
      margin-bottom: $size-m;
    }
    dd {
      margin-bottom: $size-m;
    }

    .merit-image {
      text-align: center;
      img{
        display: inline-block;
        max-width: 120px;
      }
    }
  }
</style>
