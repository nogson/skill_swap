<template>
  <div class="login">
    <div class="login-box">
      <common-title>ログイン</common-title>
      <common-input-filed v-model="email" label="メールアドレス" />
      <common-input-filed v-model="password" label="パスワード" />
      <button class="button-primary-fill button-l mt-l" :disabled="disabledButton" @click="login">
        <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />ログイン
      </button>
      <div class="mt-l">
        <nuxt-link to="/register">
          アカウントがない方はこちら
        </nuxt-link>
      </div>
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
        @Provide() email: string = ''
        @Provide() password: string = ''
        @Provide() isLoading:boolean = false

        async login () {
            this.isLoading = true

            try {
                await AuthStore.login({
                    password: this.password,
                    username: this.email
                })
              await UserStore.requestLoginUserData()
                if (this.$route.query.redirectId) {
                    this.$router.push(`user/${this.$route.query.redirectId}`)
                } else {
                    this.$router.push('/')
                }
            } catch (e) {
              // @ts-ignore
                this.$notify({
                    group: 'all',
                    type: 'error',
                    title: 'ログインに失敗しました',
                    text: 'メールアドレス、パスワードをご確認ください。'
                })
            }

            this.isLoading = false
        }

        get disabledButton () :boolean {
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
