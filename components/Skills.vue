<template>
  <div v-if="skills">
    <div class="cards mb-m">
      <skill-card v-for="skill in skills" :key="skill.id" :skill="skill" />
    </div>
    <div class="category-box-more">
      <nuxt-link class="text-link" :to="getSkillListPath()">
        もっと見る<font-awesome-icon :icon="['fa','angle-right']" class="ml-s" />
      </nuxt-link>
    </div>
  </div>
  <div v-else class="spinner-box">
    <font-awesome-icon v-if="isLoading" :icon="['fas','spinner']" spin class="spinner" />
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Provide} from 'nuxt-property-decorator'
  import {CategoryStore} from '@/store'
  import {ICategory} from '@/utils/interface/category'
  import {ISkill} from '@/utils/interface/skill'
  import SkillCard from '@/components/SkillCard.vue'
  @Component({
      components: {SkillCard}
  })
  export default class Skills extends Vue {
    @Provide() private skills:ISkill[] | null = null
    @Provide() private isLoading: boolean = true

    @Prop()
    category: ICategory

    async created () {
      const res = await CategoryStore.requestUserByCategory(this.category.id)
      const skills = res.response.sort((a: ISkill, b: ISkill) => a.users.length < b.users.length ? 1 : -1)
      this.skills = skills.splice(0, 3)

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
  .spinner-box {
    text-align: center;
    font-size: $font-size-20;
    padding: $size-l 0;
  }

  .category-box-more {
    text-align: right;
  }
</style>
