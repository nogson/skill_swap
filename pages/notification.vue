<template>
  <div class="main-content">
    <div class="notification-box">
      <nav class="side-nav">
        <div class="side-nav-title">
          <font-awesome-icon :icon="['fas','envelope']" class="icon" />
          <span class="title">受信ボックス</span>
        </div>
        <ul>
          <li
            v-for="user in users"
            :key="user.data.id"
            class="side-nav-li"
            :class="{'is-active':selectedUser.data && user.data.id === selectedUser.data.id}"
            @click="selectUser(user.data.id)"
          >
            <span :class="{'unread':user.unread}"><img class="thumbnail-xs" :src="user.data.thumbnail"></span>
            <span class="side-nav-li-name">{{ user.data.name }}</span>
          </li>
        </ul>
      </nav>
      <article v-if="isLoading" class="spinner-box">
        <font-awesome-icon :icon="['fas','spinner']" spin class="spinner" />
      </article>
      <div v-else-if="hasUser" class="notification-box-content">
        <article v-if="!isLoading" class="notification-box-content-scroll-box">
          <div v-for="(messageGroup,$index) in messageGroups" :key="$index" class="message-group">
            <div class="message-date">
              {{ messageGroup.date }}
            </div>
            <dl
              v-for="message in messageGroup.messages"
              :key="message.id"
              class="message"
              :class="{'is-self':message.is_self}"
            >
              <dt v-if="!message.is_self">
                <img class="thumbnail-xs" :src="selectedUser.data.thumbnail">
              </dt>
              <dd>{{ message.message }}</dd>
            </dl>
          </div>
        </article>
        <div class="message-textarea">
          <textarea v-model="message" rows="4" />
          <button class="button-primary-fill" :disabled="disabledSendBtn" @click="send">
            <font-awesome-icon v-if="isSending" :icon="['fas','spinner']" spin class="spinner" />
            送信
          </button>
        </div>
      </div>
      <div v-else class="no-messages">
        メッセージがありません
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator'
  import {NotificationStore} from '@/store'
  import {IMessageUser} from '@/utils/interface/user'
  import {IMessageGroup} from '@/utils/interface/notification'
  import CommonTitle from '~/components/CommonTitle.vue'

  @Component({
    components: {CommonTitle},
    middleware: ['authenticated', 'common']
  })
  export default class extends Vue {
    @Provide() private message: string = ''
    @Provide() private isLoading: boolean = true
    @Provide() private isSending: boolean = false
    @Provide() private users: IMessageUser[] = []
    @Provide() private messageGroups: IMessageGroup[] = []
    @Provide() private selectedUser: IMessageUser | null = null

    async mounted () {
      const res = await NotificationStore.getUsers()
      this.users = res.response

      if (this.users.length > 0) {
        this.selectedUser = this.users[0]
        this.updateUsers(this.selectedUser.data.id)
        await this.getMessage(this.selectedUser.data.id)
      } else {
        this.isLoading = false
      }
    }

    async send () {
      if (!this.selectedUser) {
        return
      }
      this.isSending = true
      await NotificationStore.sendMessage({message: this.message, receiver_id: this.selectedUser.data.id})
      await this.getMessage(this.selectedUser.data.id, true)
      this.message = ''
      this.isSending = false
    }

    async getMessage (id: Number, isBackGroundUpdate: boolean = false) {
      this.isLoading = !isBackGroundUpdate
      const res = await NotificationStore.getMessage(id)
      this.messageGroups = res.response
      this.isLoading = false
    }

    async selectUser (id: number) {
      this.selectedUser = this.users.find(d => d.data.id === id) || null
      await NotificationStore.updateReadStatus(id)
      this.updateUsers(id)
      await this.getMessage(id)
    }

    updateUsers (id:Number) {
      this.users.forEach((d) => {
        if (d.data.id === id) {
          d.unread = false
        }
      })
    }

    get disabledSendBtn (): boolean {
      return this.message === '' || this.isSending
    }

    get hasUser (): boolean {
      return this.users.length > 0
    }
  }
</script>

<style scoped lang="scss">
  $message-box-height: 350px;

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

    .side-nav-li {
      display: flex;
      align-items: center;
      margin-bottom: $size-m;
      border-bottom: 1px solid $color-gray-thin1;
      padding: $size-m;
      cursor: pointer;

      .unread {
        position: relative;

        &::after {
          content: "";
          display: block;
          background: $color-secondly;
          width: 10px;
          height: 10px;
          position: absolute;
          top: -5px;
          right: -5px;
          border-radius: 100%;
        }
      }

      img {
        opacity: 0.5;
      }

      .side-nav-li-name {
        font-weight: bold;
        margin-left: $size-m;
      }

      &.is-active {
        opacity: 1;
        cursor: auto;

        img {
          opacity: 1;
        }
      }
    }
  }

  .notification-box-content {
    width: 100%;

    .message {
      padding: $size-l $size-l 0;
      display: flex;
      align-items: center;

      dt {
        margin-right: $size-l;
        flex-shrink: 0;
      }

      dd {
        background: #FFF;
        border: 1px solid $color-gray-thin1;
        border-radius: 20px;
        padding: $size-s $size-m;
      }

      &.is-self {
        dd {
          margin-left: auto;
          border: 1px solid $color-primary;
        }
      }
    }

    .message-date {
      text-align: center;
      padding: $size-s;
      color: $color-gray2;
    }

    .notification-box-content-scroll-box {
      height: calc(100vh - #{$message-box-height});
      overflow: scroll;
    }

    .message-textarea {
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

  .message-group {
    margin-bottom: $size-l;
  }

  .spinner-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .spinner {
      font-size: $size-xl;
    }
  }

  .no-messages {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-16;
    font-weight: bold;
  }
</style>
