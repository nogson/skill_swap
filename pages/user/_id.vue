<template>
  <div class="user-detail main-content">
    <div v-if="user" class="user-data-box">
      <div class="user-card-head">
        <img class="thumbnail-l" :src="user.thumbnail">
        <div class="user-card-head-content">
          <nuxt-link to="/">
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
          <span v-for="strong in user.strong" :key="strong.id">{{ strong.name }}</span>
        </dd>
      </dl>
      <dl class="user-card-info">
        <dt>学びたいコト</dt>
        <dd>{{ user.weak_description }}</dd>
        <dd class="mb-s">
          <span v-for="weak in user.weak" :key="weak.id">{{ weak.name }}</span>
        </dd>
      </dl>
    </div>
    <div>bbb</div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator'
  import {UserStore, SkillStore} from '@/store'
  import Star from '~/components/Star.vue'

  import {IUser} from '~/utils/interface/user'

  @Component({
    components: {Star},
    middleware: ['authenticated', 'common']
  })

  export default class extends Vue {
    @Provide() private user: IUser| null = null

    async created () {
      const res = await UserStore.requestUserData(Number(this.$route.params.id))
      this.user = res.response
    }
  }
</script>

<style scoped lang="scss">
  .user-detail {
    display: flex;
  }

  .user-data-box {
    background: #FFF;
    padding: $size-l;
    border-radius: 8px;
    border: 1px solid $color-gray-thin1;
  }

  .box-category-main {
    width: 100%;
  }
</style>
