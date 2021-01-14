<template>
  <div class="side-nav">
    <h4 class="side-nav-title">
      カテゴリ
    </h4>
    <nav>
      <select v-model="selectedCategoryId" class="selectbox" @change="changeCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <ul class="side-nav-list">
        <li v-for="skill in skills" :key="skill.id" :class="{act:actNav(skill.id)}">
          <nuxt-link :to="getSkillPath(skill.id)">
            {{ skill.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Provide} from 'nuxt-property-decorator'
  import CommonTitle from '@/components/CommonTitle.vue'
  import {ICategory} from '@/utils/interface/category'
  import {SkillStore} from '@/store'
  import {ISkill} from '@/utils/interface/skill'

  @Component({
      components: {CommonTitle}
  })
  export default class SideNav extends Vue {
    @Provide() private selectedCategoryId: Number = 1

    @Prop()
    selectedCategory:ICategory

    @Prop()
    selectedSkill:ISkill

    @Prop()
    categories:ICategory[]

    created () {
      this.selectedCategoryId = this.selectedCategory.id
    }

    getSkillPath (id:Number) :string {
      return `/skill/${id}`
    }

    changeCategory () {
      if (this.skills) {
        this.$router.push(`/skill/${this.skills[0].id}`)
      }
    }

    actNav (id:Number) {
      return id === this.selectedSkill.id
    }

    get skills () {
      if (SkillStore.getSkills) {
        return SkillStore.getSkills.filter(d => d.category_id === this.selectedCategoryId)
      }
    }
  }
</script>

<style scoped lang="scss">
  .side-nav-title {
    font-size: $font-size-14;
    font-weight: bold;
    margin-bottom: $size-m;
  }
  .side-nav {
    width: 300px;
    padding-right:$size-xl;
  }
  .selectbox {
    width: 100%;
    margin-bottom: $size-l;
  }
  .side-nav-list {
    >* {
      margin-bottom: $size-s;
    }

    .act{
      pointer-events: none;
      font-weight: bold;
    }
  }
</style>
