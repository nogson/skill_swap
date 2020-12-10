<template>
  <div class="login">
    <div class="login-box">
      <common-title>プロフィール</common-title>
      <div class="box-thumbnail-upload">
        <div class="thumbnail-upload">
          <font-awesome-icon :icon="['fas','user']" class="icon" />
        </div>
        <button class="button-s button-black-line">
          画像アップロード
        </button>
      </div>

      <common-input-filed v-model="profile.name" label="ユーザー名" />
      <common-input-filed v-model="profile.email" label="メールアドレス" />
      <common-input-filed v-model="profile.profile" label="プロフィール" />
      <common-input-filed v-model="profile.address" label="住所" />
      <common-input-filed v-model="profile.strong" label="得意なこと" />
      <common-input-filed v-model="profile.strong_description" label="得意なことの補足" />
      <common-input-filed v-model="profile.weak" label="学びたいこと" />
      <common-input-filed v-model="profile.weak_description" label="学びたいことの補足" />
      <common-input-filed v-model="profile.link" label="関連リンク" />

      <button class="button-primary-fill button-l mt-l" @click="updateUserProfile" :disabled="isEnabled">
        <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />
        プロフィール登録
      </button>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Watch, Provide} from 'nuxt-property-decorator'
    import {UserStore} from '@/store'
    import {IProfile} from '@/utils/interface/profile'
    import CommonTitle from '@/components/CommonTitle.vue'
    import CommonInputFiled from '@/components/CommonInputFiled.vue'

    @Component({
        components: {CommonInputFiled, CommonTitle},
        layout: 'simpleBase',
        middleware: 'authenticated'
    })

    export default class extends Vue {
        @Provide() private userId!:number
        @Provide() private profile:IProfile = {
            name: '',
            email: '',
            profile: '',
            address: '',
            strong: [],
            strong_description: '',
            weak: [],
            weak_description: '',
            link: ''
        }

        @Provide() private isLoading:boolean = false

        created () {
            this.setProfileData()
        }

        setProfileData ():void {
            this.profile.name = this.userData.name
            this.profile.email = this.userData.email
            this.profile.profile = this.userData.profile
            this.profile.strong = this.userData.strong
            this.profile.strong_description = this.userData.strong_description
            this.profile.weak = this.userData.weak
            this.profile.weak_description = this.userData.weak_description
            this.profile.link = this.userData.link
        }

        async updateUserProfile () {
            this.isLoading = true
            await UserStore.updateUserData({id: this.userData.id, params: this.profile})
            this.isLoading = false
        }

        get userData () {
            return UserStore.getUserData
        }

        get isEnabled() {
            return this.isLoading
        }


        @Watch('userData')
        onUserDataChange () {
            this.setProfileData()
        }
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
