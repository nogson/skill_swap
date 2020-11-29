<template>
  <div class="login">
    <div class="login-box">
      <common-title>プロフィール</common-title>
      <div class="box-thumbnail-upload">
        <div class="thumbnail-upload">
          <font-awesome-icon :icon="['fas','user']" class="icon" />
        </div>
        <button class="button-s button-black-line">画像アップロード</button>
      </div>

      <common-input-filed label="ユーザー名" />
      <common-input-filed label="メールアドレス" />
      <common-input-filed label="プロフィール" />
      <common-input-filed label="住所" />
      <common-input-filed label="得意なこと" />
      <common-input-filed label="得意なことの補足" />
      <common-input-filed label="学びたいこと" />
      <common-input-filed label="学びたいことの補足" />
      <common-input-filed label="関連リンク" />

      <button class="button-primary-fill button-l mt-l">
        プロフィール登録
      </button>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import CommonTitle from '~/components/CommonTitle.vue'
    import CommonInputFiled from '~/components/CommonInputFiled.vue'

    @Component({
        components: {CommonInputFiled, CommonTitle},
        layout: 'simpleBase'
    })

    export default class extends Vue {
    }
</script>

<style scoped lang="scss">

  .login {
    display: flex;
    justify-content: center;
    padding: $size-xl 0;
  }
  .login-box {
    background: #FFF;
    border-radius: $size-s;
    border:1px solid $color-gray-thin1;
    padding: $size-xl;
    text-align: center;
  }

  .box-thumbnail-upload {
    margin-bottom: $size-l;
  }

  .thumbnail-upload{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background: $color-gray;
    margin: 0 auto $size-m;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      color:$color-gray-thin1;
      font-size: $font-size-50;
    }
  }
</style>
