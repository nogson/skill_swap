<template>
  <div class="box-card">
    <h3 class="skill-card-title">
      PHP
    </h3>
    <ul class="thumbnails mb-s">
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_1.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_2.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_3.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_4.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_5.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_6.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_7.png"></li>
      <li><img class="thumbnail-s" src="~/assets/images/dummy/user/user_8.png"></li>
    </ul>
    <p class="skill-card-length">
      提供者10人
    </p>
    <div class="skill-card-footer">
      <button class="button-black-line button-s">詳しく見る</button>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'nuxt-property-decorator'

    @Component
    export default class SkillCard extends Vue {
        @Prop({default: 'title-1'})
        klass: string
    }
</script>

<style scoped lang="scss">
  .skill-card-title {
    text-align: center;
    margin-bottom: $size-m;
    font-size: $font-size-16;
  }

  .thumbnails {
    display: grid;
    align-self: center;
    grid-template-columns: repeat(auto-fill, minmax($thumbnail-size-s, 1fr));

    > * {
      width: $thumbnail-size-s;
      margin: $size-xs;
    }
  }

  .skill-card-length{
    font-size: $font-size-10;
    text-align: right;
    margin-bottom: $size-xs;
  }

  .skill-card-footer{
    text-align: center;
  }
</style>
