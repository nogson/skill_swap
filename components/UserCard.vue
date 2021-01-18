<template>
  <div class="user-card box-card">
    <div class="user-card-head">
      <img class="thumbnail-s" :src="user.thumbnail">
      <div class="user-card-head-content">
        <nuxt-link :to="userDetailPath">
          <h3 class="user-card-head-content-name">
            {{ user.name }}
          </h3>
        </nuxt-link>
        <star :value="user.star" />
      </div>
    </div>
    <div class="user-card-description">
      <p>
        {{ user.profile }}
      </p>
    </div>
    <dl class="user-card-info">
      <dt>得意なこと</dt>
      <dd>{{ user.strong_description }}</dd>
      <dd class="mb-s">
        <span class="tag-normal" v-for="strong in user.strong" :key="strong.id">{{ strong.name }}</span>
      </dd>
    </dl>
    <dl class="user-card-info">
      <dt>学びたいコト</dt>
      <dd>{{ user.weak_description }}</dd>
      <dd class="mb-s">
        <span class="tag-normal" v-for="weak in user.weak" :key="weak.id">{{ weak.name }}</span>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'nuxt-property-decorator'
  import Star from '~/components/Star.vue'
  import {IUser} from '~/utils/interface/user'

  @Component({
    components: {Star}
  })
  export default class UserCard extends Vue {
    @Prop()
    user: IUser

    get userDetailPath ():string {
      return `/user/${this.user.id}`
    }
  }
</script>

<style scoped lang="scss">
  .user-card-head {
    display: flex;
    align-items: center;
    margin-bottom: $size-m;
  }

  .user-card-head-content {
    flex-grow: 1;
    margin-left: $size-m;
    .user-card-head-content-name {
      word-break: break-all;
      line-height: 1.2;
      margin-bottom: $size-xs;
    }
  }

  .user-card-description {
    overflow: hidden;
    width: 100%;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }

  .user-card-info {
    margin-top: $size-m;
    dt {
      font-weight: bold;
    }
    dd {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
