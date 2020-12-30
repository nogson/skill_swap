<template>
  <div class="login">
    <div class="login-box">
      <common-title>新規登録</common-title>
      <common-input-filed v-model="name" label="ユーザー名" />
      <common-input-filed v-model="email" label="メールアドレス" />
      <common-input-filed v-model="password" label="パスワード" />
      <common-input-filed v-model="passwordCheck" label="パスワード(確認用)" />

      <button class="button-primary-fill button-l mt-l" :disabled="disabledButton" @click="register">
        <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />
        ユーザー登録
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator'
  import {AuthStore, UserStore} from '@/store'
  import CommonTitle from '@/components/CommonTitle.vue'
  import CommonInputFiled from '@/components/CommonInputFiled.vue'

  @Component({
    components: {CommonInputFiled, CommonTitle},
    layout: 'simpleBase'
  })

  export default class extends Vue {
    @Provide() name: string = ''
    @Provide() email: string = ''
    @Provide() password: string = ''
    @Provide() passwordCheck: string = ''
    @Provide() isLoading: boolean = false

    async register () {
      this.isLoading = true

      try {
        await AuthStore.login({
          password: this.password,
          username: this.email
        })
      } catch (e) {
        this.isLoading = false
        this.$notify({
          group: 'all',
          type: 'error',
          title: 'ログインに失敗しました',
          text: 'メールアドレス、パスワードをご確認ください。'
        })
        return
      }

      await UserStore.requestUserData()

      this.isLoading = false
      this.$router.push('/')
    }

    get disabledButton (): boolean {
      return this.isLoading || !this.password || !this.email
    }
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
    border: 1px solid $color-gray-thin1;
    padding: $size-xl;
    text-align: center;
    margin-top: -$header-h;
  }

</style>
