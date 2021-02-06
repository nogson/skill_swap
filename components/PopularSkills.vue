<template>
  <div v-if="skills">
    <div class="cards mb-m">
      <skill-card v-for="skill in skills" :key="skill.id" :skill="skill" />
    </div>
  </div>
  <div v-else class="spinner-box">
    <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator'
  import {SkillStore} from '@/store'
  import {ISkill} from '@/utils/interface/skill'

  @Component
  export default class PopularSkills extends Vue {
    @Provide() private skills:ISkill[] | null = null
    @Provide() private isLoading: boolean = true

    async created () {
       const res = await SkillStore.requestPopularSkills()
      // const skills = res.response.sort((a: ISkill, b: ISkill) => a.users.length < b.users.length ? 1 : -1)
       this.skills = res.response
      //
       this.isLoading = false
    }

    getSkillListPath (id?: Number): string {
      let skillId = id
      if (!skillId && this.skills) {
        skillId = this.skills[0].id
      }

      return `/skill/${skillId}`
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

  .category-box-more {
    text-align: right;
  }
</style>
