<template>
  <header id="header">
    <h1 class="logo">
      <nuxt-link to="/">
        <img src="@/assets/images/logo.png">
      </nuxt-link>
    </h1>
    <div v-if="!useSimple" class="header-items">
      <!-- <input class="header_search" type="text">-->
      <div v-if="userData" class="header-buttons is-login">
        <div class="my-navigation">
          <span v-if="isLoading" class="spinner">
            <font-awesome-icon :icon="['fas','spinner']" spin />
          </span>
          <img v-else class="my-navigation-thumbnail thumbnail-xs" :src="thumbnail" @click="showMyNavigation">
          <nav v-if="displayNavigation" class="my-navigation-list">
            <ul @click="showMyNavigation">
              <li>
                <nuxt-link to="/profile">
                  プロフィール
                </nuxt-link>
              </li>
              <li @click="logout">
                ログアウト
              </li>
            </ul>
          </nav>
        </div>
        <nuxt-link to="/notification" :class="{'unread':unread}">
          <font-awesome-icon :icon="['fas','bell']" class="icon" />
        </nuxt-link>
      </div>
      <div v-else class="header-buttons">
        <nuxt-link to="/login">
          ログイン
        </nuxt-link>
        <nuxt-link to="/register" class="button-primary-fill">
          新規登録
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'nuxt-property-decorator'
  import {IUser} from '@/utils/interface/user'
  import {UserStore, AuthStore, NotificationStore} from '@/store'
  import noIconImg from '~/assets/images/no_icon.png'

  @Component
  export default class CommonHeader extends Vue {
    private displayNavigation: boolean = false
    private isLoading: boolean = false

    @Prop({default: false})
    useSimple: boolean

    async fetch () {
     await NotificationStore.unread()
    }

    showMyNavigation () {
      this.displayNavigation = !this.displayNavigation
    }

    async logout () {
      this.isLoading = true
      await AuthStore.logout()
      this.isLoading = false
    }

    get thumbnail (): String {
      return this.userData.thumbnail ? this.userData.thumbnail : noIconImg
    }

    get userData (): IUser {
      return UserStore.getLoginUserData
    }

    get unread (): boolean {
      return NotificationStore.getUnread
    }
  }
</script>

<style scoped lang="scss">
  #header {
    padding: $size-m $size-l;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 1px $shadow-color;
    background: #FFF;
    width: 100%;
    position: relative;

    .logo {
      img {
        height: 20px;
      }
    }

    .header-items {
      display: flex;
      flex-grow: 1;
    }

    .header-buttons {
      display: flex;
      align-items: center;
      margin-left: auto;

      > * {
        margin-left: $size-m;
      }

      &.is-login {
        .icon {
          color: $color-black;
          font-size: $font-size-20;
        }
      }

      .unread {
        position: relative;

        &::after {
          content: "";
          display: block;
          background: $color-secondly;
          width: 10px;
          height: 10px;
          position: absolute;
          top: -10px;
          right: -10px;
          border-radius: 100%;
        }
      }
    }

    .header_search {
      margin-left: $size-m;
    }

    .my-navigation {
      position: relative;

      .my-navigation-thumbnail {
        cursor: pointer;
      }

      .spinner {
        border: 1px solid $color-gray;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
      }

      .my-navigation-list {
        width: 150px;
        position: absolute;
        right: -10px;
        bottom: -100px;
        z-index: 10;
        background: rgba(#FFF, 0.9);
        padding: $size-m;
        border-radius: $size-xs;
        box-shadow: 1px 1px 2px 2px rgba($color-black, 0.25);

        li {
          cursor: pointer;

          a {
            color: $color-black;
          }
        }

        li:not(:last-child) {
          margin-bottom: $size-s;
        }
      }
    }

  }
</style>
