<template>
  <div v-if="!isLoading" class="user-detail main-content">
    <div>
      <div class="user-detail-box">
        <div class="user-detail-box-main">
          <div
            class="user-detail-box-sub"
          >
            <img class="thumbnail-auto mb-m" :src="user.thumbnail">
            <p class="user-detail-box-sub-address">
              <font-awesome-icon :icon="['fas','map-marker']" class="icon" />
              {{ user.address }}
            </p>
            <star :value="user.star" />
            <button class="button-primary-fill button-m mt-l button-send-message" @click="sendMessage">
              メッセージを送る
            </button>
          </div>
          <div class="user-detail-box-detail">
            <common-title klass="title-2">
              {{ user.name }}
            </common-title>
            <p class="mb-l">
              {{ user.profile }}
            </p>
            <dl class="user-detail-box-detail-info">
              <dt>得意なこと</dt>
              <dd>
                <p class="user-detail-box-detail-info-description">
                  {{ user.strong_description }}
                </p>
                <div class="user-detail-box-detail-info-skills">
                  <span v-for="strong in user.strong" :key="strong.id" class="tag-normal">{{ strong.name }}</span>
                </div>
              </dd>
            </dl>
            <dl class="user-detail-box-detail-info">
              <dt>学びたいコト</dt>
              <dd>
                <p class="user-detail-box-detail-info-description">
                  {{ user.weak_description }}
                </p>
                <div class="user-detail-box-detail-info-skills">
                  <span v-for="weak in user.weak" :key="weak.id" class="tag-normal">{{ weak.name }}</span>
                </div>
              </dd>
            </dl>
            <dl class="user-detail-box-detail-info">
              <dt>関連リンク</dt>
              <dd><a :href="user.link">{{ user.link }}</a></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="user-detail-recommend-users">
      <common-title klass="title-3">
        関連ユーザー
      </common-title>
      <div v-if="!noRelatedUsers">
        <user-card v-for="user in relatedUsers" :key="user.id" :user="user" class="related-users" />
      </div>
      <p v-else>
        情報がありません
      </p>
    </div>
    <message-dialog :enabled-dialog.sync="enabledMassageDialog" :user="user" />
  </div>
  <div v-else class="main-content loading">
    <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Provide} from 'nuxt-property-decorator'
    import {UserStore} from '@/store'
    import Star from '~/components/Star.vue'
    import {IUser} from '~/utils/interface/user'
    import CommonTitle from '~/components/CommonTitle.vue'
    import UserCard from '~/components/UserCard.vue'
    import MessageDialog from '~/components/MessageDialog.vue'

    @Component({
        components: {MessageDialog, UserCard, CommonTitle, Star},
        middleware: ['authenticated', 'common']
    })

    export default class extends Vue {
        @Provide() private user: IUser | null = null
        @Provide() private relatedUsers: IUser[] | null = null
        @Provide() private isLoading: boolean = true
        @Provide() private enabledMassageDialog: boolean = false

        async created () {
            const userId = Number(this.$route.params.id)
            const userRes = await UserStore.requestUserData(userId)
            this.user = userRes.response
            if (!this.user) {
                return
            }

            const ids: number[] = this.user.strong.map(d => d.id)

            const skillUserRes = await UserStore.requestUserDataBySkill({ids})
          if (UserStore.getLoginUserData) {
            this.relatedUsers = skillUserRes.response.filter((d: IUser) => ![UserStore.getLoginUserData.id, userId].includes(d.id))
          } else {
            this.relatedUsers = skillUserRes.response.filter((d: IUser) => ![userId].includes(d.id))
          }
            this.isLoading = false
        }

        sendMessage () {
            if (!this.userData) {
                this.$router.push({path: '/login', query: {redirectId: this.$route.params.id}})
                return
            }

            this.enabledMassageDialog = true
        }

        get noRelatedUsers (): boolean {
            return !this.isLoading && (!this.relatedUsers || this.relatedUsers.length === 0)
        }

        get userData (): IUser {
            return UserStore.getLoginUserData
        }
    }
</script>

<style scoped lang="scss">
  .user-detail {
    display: flex;
  }

  .user-detail-box {
    background: #FFF;
    padding: $size-l;
    border-radius: 8px;
    border: 1px solid $color-gray-thin1;
  }

  .user-detail-box-main {
    display: flex;

    .user-detail-box-detail {
      flex-grow: 1;
    }

    .user-detail-box-sub {
      margin-right: $size-xl;
      min-width: 160px;

      .user-detail-box-sub-address {
        .icon {
          margin-right: $size-s;
          color: $color-primary;
        }
      }

      .button-send-message {
        width: 100%;
        display: block;
        text-align: center;

        .icon {
          margin-right: $size-s;
        }
      }
    }

    .user-detail-box-detail-info {
      display: flex;
      margin-bottom: $size-m;

      dt {
        width: 100px;
        font-weight: bold;
        margin-right: $size-l;
        flex-shrink: 0;
      }

      dd {
      }
    }
  }

  .user-detail-recommend-users {
    width: 300px;
    margin-left: $size-xl;
    flex-shrink: 0;
  }

  .user-detail-box-detail-info-description {
    margin-bottom: $size-s;
  }

  .user-detail-box-detail-info-skills {
    display: flex;
    flex-wrap: wrap;
  }

  .related-users {
    margin-bottom: $size-l;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: xx-large;
    height: 90vh;

  }
</style>
