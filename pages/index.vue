<template>
  <div>
    <div id="hero-img">
      <h2>お互い得意なスキルを交換しあって、スキルアップを目指そう！</h2>
      <div class="hero-img-wrap">
        <img src="~/assets/images/chara/chara_1.png">
        <img src="~/assets/images/swap.png" class="swap">
        <img src="~/assets/images/chara/chara_2.png">
      </div>
    </div>
    <article class="box-content">
      <common-title klass="title-1">
        KOOKAN-KOって何?
      </common-title>
      <div class="about-kookanko">
        <p>KOOKAN-KO(コウカンコ)は、新しいスキルを学びたい人達をマッチングするサービスです。</p>
        <p>自分の得意なスキルを学びたいと思っている人が、自分に無いスキルを持っていることはよくあることです。<br>お互い得意分野を教え合い、さらなるスキルアップを目指すサービスです。</p>
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
    padding: $size-xxl;
    background: $color-primary;
    margin-bottom: $size-xxl;

    h2{
      text-align: center;
      color: $color-black;
      margin-bottom: $size-xl;
    }

    .hero-img-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
      >* {
        height: 250px;
      }
      .swap {
        width: 150px;
        height: auto;
        padding: 0 $size-xl;
      }
    }

  }
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
