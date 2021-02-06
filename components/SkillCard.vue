<template>
  <div class="box-card">
    <h3 class="skill-card-title">
      {{ skill.name }}
    </h3>
    <div v-if="skill.users">
      <ul class="thumbnails mb-s">
        <li v-for="user in skill.users" :key="user.id">
          <nuxt-link :to="`/user/${user.id}`">
            <img class="thumbnail-s" :src="user.thumbnail">
          </nuxt-link>
        </li>
      </ul>
      <p class="skill-card-length">
        提供者{{ skill.users.length }}人
      </p>
      <div class="skill-card-footer">
        <nuxt-link class="button-black-line button-s" :to="`/skill/${skill.id}`">
          詳しく見る
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Provide} from 'nuxt-property-decorator'
  import {CategoryStore} from '@/store'
  import {ISkill} from '@/utils/interface/skill'

  @Component
  export default class SkillCard extends Vue {
    @Prop()
    skill: ISkill
  }
</script>

<style scoped lang="scss">
  .skill-card-title {
    text-align: center;
    margin-bottom: $size-m;
    font-size: $font-size-16;
  }

  .thumbnails {
    display: grid;
    align-self: center;
    grid-template-columns: repeat(auto-fill, minmax($thumbnail-size-s, 1fr));

    > * {
      width: $thumbnail-size-s;
      margin: $size-xs;
    }
  }

  .skill-card-length {
    font-size: $font-size-10;
    text-align: right;
    margin-bottom: $size-xs;
  }

  .skill-card-footer {
    text-align: center;
  }

  .spinner-box {
    text-align: center;
    font-size: $font-size-20;
    padding: $size-l 0;
  }

  .category-box-more {
    text-align: right;
  }
</style>
