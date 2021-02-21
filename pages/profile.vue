<template>
  <div class="login">
    <div class="login-box">
      <common-title>プロフィール</common-title>
      <div class="box-thumbnail-upload">
        <img v-if="profile.thumbnail && !selectedThumbnail" :src="profile.thumbnail" class="thumbnail-upload">
        <img v-else-if="selectedThumbnail" :src="selectedThumbnail" class="thumbnail-upload">
        <div v-else class="thumbnail-upload">
          <font-awesome-icon :icon="['fas','user']" class="icon" />
        </div>
        <label class="button-s button-black-line">
          画像アップロード
          <input type="file" name="datafile" @change="onFileChange">
        </label>
      </div>
      <common-input-filed v-model="profile.name" label="ユーザー名" />
      <common-input-filed v-model="profile.email" label="メールアドレス" />
      <common-input-filed v-model="profile.profile" label="プロフィール" />
      <common-input-filed v-model="profile.address" label="住所" />
      <category-select-box :values.sync="profile.strong" label="得意なこと" />
      <common-input-filed v-model="profile.strong_description" label="得意なことの補足" />
      <category-select-box :values.sync="profile.weak" label="学びたいこと" />
      <common-input-filed v-model="profile.weak_description" label="学びたいことの補足" />
      <common-input-filed v-model="profile.link" label="関連リンク" />

      <button class="button-primary-fill button-l mt-l" :disabled="isEnabled" @click="updateUserProfile">
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
    import Combobox from '@/components/Combobox.vue'
    import SelectCombobox from '~/components/SelectCombobox.vue'
    import CategorySelectBox from '~/components/CategorySelectBox.vue'

    interface HTMLElementEvent<T extends HTMLElement> extends Event {
        target: T
    }

    @Component({
        components: {CategorySelectBox, SelectCombobox, Combobox, CommonInputFiled, CommonTitle},
        middleware: ['authenticated', 'common']
    })

    export default class extends Vue {
        @Provide() private userId!: number
        @Provide() private profile: IProfile = {
            name: '',
            email: '',
            profile: '',
            address: '',
            strong: [],
            strong_description: '',
            weak: [],
            weak_description: '',
            link: '',
            thumbnail: ''
        }

        @Provide() private isLoading: boolean = false
        @Provide() private selectedThumbnail: any = null

        created () {
            this.setProfileData()
        }

        setProfileData (): void {
            const userData = JSON.parse(JSON.stringify(this.userData))
            this.profile.name = userData.name
            this.profile.email = userData.email
            this.profile.profile = userData.profile
            this.profile.strong = userData.strong || []
            this.profile.strong_description = userData.strong_description
            this.profile.weak = userData.weak || []
            this.profile.weak_description = userData.weak_description
            this.profile.link = userData.link
            this.profile.thumbnail = userData.thumbnail
        }

        onFileChange (e: HTMLElementEvent<HTMLInputElement>) {
            const files: any = e.target.files
            this.createImage(files[0])
        }

        createImage (file: any) {
            const reader = new FileReader()

            reader.onload = (e: any) => {
                this.selectedThumbnail = e.target.result
            }
            reader.readAsDataURL(file)
        }

        async updateUserProfile () {
            this.isLoading = true
            const params = JSON.parse(JSON.stringify(this.profile))
            params.thumbnail = this.selectedThumbnail
            await UserStore.updateUserData({id: this.userData.id, params})
            this.isLoading = false
        }

        get userData () {
            return UserStore.getLoginUserData
        }

        get isEnabled () {
            return this.isLoading
        }

        // @Watch('userData')
        // onUserDataChange() {
        //     //  this.setProfileData()
        // }
    }
</script>

<style scoped lang="scss">

  .login {
    display: flex;
    justify-content: center;
    padding: $size-xl 0;

    input[type="file"] {
      display: none;
    }
  }

  .login-box {
    width: 600px;
    background: #FFF;
    border-radius: $size-s;
    border: 1px solid $color-gray-thin1;
    padding: $size-xl;
    text-align: center;
  }

  .box-thumbnail-upload {
    margin-bottom: $size-l;
  }

  .thumbnail-upload {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background: $color-gray;
    margin: 0 auto $size-m;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      color: $color-gray-thin1;
      font-size: $font-size-50;
    }
  }
</style>
