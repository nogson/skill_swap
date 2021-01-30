<template>
  <transition>
    <div v-if="dialogFlag" class="message-dialog">
      <div class="message-dialog-box">
        <common-title klass="title-3">
          メッセージの送信先 : {{ user.name }}
        </common-title>
        <textarea v-model="message" class="message-dialog-textarea" rows="5" />
        <div class="message-dialog-footer">
          <button class="button-black-text" @click="cancel">
            キャンセル
          </button>
          <button class="button-primary-fill" @click="send">
            <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />
            送信
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
    import {Vue, Component, Prop, PropSync, Provide} from 'nuxt-property-decorator'
    import {NotificationStore} from '@/store'
    import CommonTitle from '~/components/CommonTitle.vue'
    import {IUser} from '~/utils/interface/user'

    @Component({
        components: {CommonTitle}
    })
    export default class MessageDialog extends Vue {
        @Provide() private message: string
        @Provide() private isLoading: boolean = false

        @Prop()
        user: IUser

        @PropSync('enabledDialog', {type: Boolean})
        dialogFlag: boolean

        async send () {
            this.isLoading = true
            await NotificationStore.sendMessage({message: this.message, receiver_id: this.user.id})
            this.isLoading = false
            this.dialogFlag = false
        }

        cancel () {
            this.dialogFlag = false
        }
    }
</script>

<style scoped lang="scss">
  .message-dialog {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(#000, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;

    .message-dialog-box {
      background: #FFF;
      width: 600px;
      border-radius: $size-s;
      padding: $size-l;
    }

    .message-dialog-textarea {
      border-color: $color-gray-thin1;
      width: 100%;
    }

    .message-dialog-footer {
      text-align: right;
      margin-top: $size-l;

      button {
        width: 150px;
      }
    }
  }

  .v-enter-active, .v-leave-active {
    transition: opacity .5s
  }

  .v-enter, .v-leave-to {
    opacity: 0
  }
</style>
