<template>
  <div class="login">
    <div class="login-box">
      <common-title>新規登録</common-title>
      <common-input-filed label="ユーザー名" />
      <common-input-filed label="メールアドレス" />
      <common-input-filed label="パスワード" />
      <common-input-filed label="パスワード(確認用)" />

      <button class="button-primary-fill button-l mt-l">
        ユーザー登録
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
    align-items: center;
    justify-content: center;
    height: calc(100vh - #{$header-h});
  }
  .login-box {
    background: #FFF;
    border-radius: $size-s;
    border:1px solid $color-gray-thin1;
    padding: $size-xl;
    text-align: center;
    margin-top: -$header-h;
  }
</style>
