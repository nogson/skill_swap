<template>
  <div class="main-content">
    <div class="notification-box">
      <nav class="side-nav">
        <div class="side-nav-title">
          <font-awesome-icon :icon="['fas','envelope']" class="icon" />
          <span class="title">受信ボックス</span>
        </div>
        <ul>
          <li v-for="user in users" :key="user.id" class="side-nav-li" @click="selectUser(user.id)">
            <img class="thumbnail-xs" :src="user.thumbnail">
            <span class="side-nav-li-name">{{ user.name }}</span>
          </li>
        </ul>
      </nav>
      <div class="notification-box-content">
        <article>
          <div class="message-date">
            2020 10/10
          </div>
          <dl v-for="message in messages" :key="message.id" class="message">
            <dt>
              <img class="thumbnail-s" src="../assets/images/dummy/user/user_1.png">
            </dt>
            <dd>テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります</dd>
          </dl>
        </article>
        <div class="message-textarea">
          <textarea v-model="message" rows="4" />
          <button class="button-primary-fill" :disabled="disabledSendBtn" @click="send">
            送信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Provide} from 'nuxt-property-decorator'
    import {NotificationStore} from '@/store'
    import {IUser} from '@/utils/interface/user'
    import {IMessage} from '@/utils/interface/notification'
    import CommonTitle from '~/components/CommonTitle.vue'

    @Component({
        components: {CommonTitle},
        middleware: ['authenticated', 'common']
    })
    export default class extends Vue {
        @Provide() private message: string = ''
        @Provide() private isLoading: boolean = false
        @Provide() private users: IUser[] = []
        @Provide() private messages: IMessage[] = []

        async created () {
            const res = await NotificationStore.getUsers()
            this.users = res.response

            if (this.users.length > 0) {
                await this.getMessage(this.users[0].id)
            }
        }

        async send (id: number) {
            await NotificationStore.sendMessage({message: this.message, receiver_id: id})
        }

        async getMessage (id: Number) {
            const res = await NotificationStore.getMessage(id)
            this.messages = res.response
        }

        async selectUser (id: number) {
            await this.getMessage(id)
        }

        get disabledSendBtn (): boolean {
            return this.message === ''
        }

        // TODO ここから メッセージを、ログインユーザーのものか、その他かでだしわけ
        // get isLoginUser (): boolean {
        //     return (message: IMessage) => {
        //       return false
        //     }
        // }
    }
</script>

<style scoped lang="scss">
  .notification-box {
    display: flex;
    min-height: calc(100vh - #{$header-height} - #{$footer-height} - #{$size-l} * 2);
  }

  .side-nav {
    width: 300px;
    flex-shrink: 0;
    border-right: 1px solid $color-gray-thin1;

    .side-nav-title {
      display: flex;
      align-items: center;

      .icon {
        margin-right: $size-s;
        color: $color-primary;
      }

      .title {
        margin-bottom: 0 !important;
        font-weight: bold;
        font-size: $font-size-16;
      }
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: $size-m;
      border-bottom: 1px solid $color-gray-thin1;
      padding: $size-m;
      cursor: pointer;

      .side-nav-li-name {
        font-weight: bold;
        margin-left: $size-m;
      }
    }
  }

  .notification-box-content {
    position: relative;

    .message {
      padding: $size-l;
      display: flex;
      align-items: center;

      dt {
        margin-right: $size-l;
        flex-shrink: 0;
      }

      dd {
        background: #FFF;
        border: 1px solid $color-gray-thin1;
        border-radius: 50px;
        padding: $size-m;
      }
    }

    .message-date {
      text-align: center;
      padding: $size-s;
      background: $color-gray;
      width: 150px;
      margin: 0 auto;
      border-radius: 50px;
      margin-bottom: $size-l;
      color: $color-gray2;
    }

    .message-textarea {
      position: absolute;
      bottom: 0;
      padding: $size-l $size-l 0 $size-l;
      width: 100%;
      border-top: 1px solid $color-gray-thin1;

      textarea {
        width: 100%;
        border-color: $color-gray-thin1;
      }

      .button-primary-fill {
        display: block;
        width: 200px;
        margin: 0 auto;
        margin-top: $size-m;
      }
    }
  }
</style>
