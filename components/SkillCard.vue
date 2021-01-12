<template>
  <div v-if="skills" class="cards mb-m">
    <div v-for="skill in skills" class="box-card">
      <h3 class="skill-card-title">
        {{ skill.name }}
      </h3>
      <div v-if="skill.users">
        <ul class="thumbnails mb-s">
          <li v-for="user in skill.users" :key="user.id">
            <img class="thumbnail-s" :src="user.thumbnail">
          </li>
        </ul>
        <p class="skill-card-length">
          提供者{{ skill.users.length }}人
        </p>
        <div class="skill-card-footer">
          <button class="button-black-line button-s">
            詳しく見る
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="spinner-box">
    <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner"/>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Provide} from 'nuxt-property-decorator'
  import {CategoryStore} from '@/store'
  import {ICategory} from '@/utils/interface/category'
  import {ISkill} from '@/utils/interface/skill'

  @Component
  export default class SkillCard extends Vue {
    @Provide() private skills = null
    @Provide() private isLoading: boolean = true

    @Prop()
    category: ICategory

    async created() {
      const res = await CategoryStore.requestUserBySkill(this.category.id)
      const skills = res.response.sort((a: ISkill, b: ISkill) => a.users.length < b.users.length ? 1 : -1)
      this.skills = skills.splice(0, 3)


      this.isLoading = false
    }
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
</style>
