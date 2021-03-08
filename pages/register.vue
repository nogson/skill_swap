<template>
  <div class="login">
    <div class="login-box">
      <common-title>新規登録</common-title>
      <common-input-filed v-model="name" label="ユーザー名" />
      <common-input-filed v-model="email" label="メールアドレス" />
      <common-input-filed v-model="password" label="パスワード" note="6文字以上" />
      <common-input-filed v-model="passwordCheck" label="パスワード(確認用)" note="6文字以上" />

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
        await AuthStore.register({
          name: this.name,
          password: this.password,
          email: this.email
        })

        await UserStore.requestLoginUserData()
        this.$router.push('/')
      } catch (e) {
        // @ts-ignore
        this.$notify({
          group: 'all',
          type: 'error',
          title: 'ユーザー登録に失敗しました',
          text: 'メールアドレス、パスワードをご確認ください。'
        })
      }

      this.isLoading = false
    }

    get disabledButton (): boolean {
      return this.isLoading || !this.name || !this.password || !this.email || !this.passwordCheck || this.passwordCheck !== this.password
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
