<template>
  <div id="hero-img">
    <h2>お互い得意なスキルを交換しあって、スキルアップを目指そう！</h2>
      <div class="hero-img-box">
        <img src="~/assets/images/chara/chara_1.png">
        <img src="~/assets/images/swap.png" class="swap">
        <img src="~/assets/images/chara/chara_2.png">
        <img src="~/assets/images/swap.png" class="swap">
        <img src="~/assets/images/chara/chara_1.png">
      </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'

    @Component({
    })
    export default class HeroImg extends Vue {

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

    .hero-img-box{
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
</style>
