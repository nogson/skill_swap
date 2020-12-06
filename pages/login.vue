<template>
  <div class="login">
    <div class="login-box">
      <common-title>ログイン</common-title>
      <common-input-filed v-model="email" label="メールアドレス" />
      <common-input-filed v-model="password" label="パスワード" />
      <button class="button-primary-fill button-l mt-l" @click="login">
        ログイン
      </button>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Provide} from 'nuxt-property-decorator'
    import {AuthStore} from '@/store'
    import CommonTitle from '@/components/CommonTitle.vue'
    import CommonInputFiled from '@/components/CommonInputFiled.vue'

    @Component({
        components: {CommonInputFiled, CommonTitle},
        layout: 'simpleBase'
    })

    export default class extends Vue {
        @Provide() email: string = ''
        @Provide() password: string = ''

        async login () {
            await AuthStore.login({
                password: this.password,
                username: this.email
            })

            await AuthStore.requestUserData()
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
