<template>
  <div class="select-combobox">
    <select v-model="selectedCategory" @change="changeSelectedCategory">
      <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <select v-model="selectedSkill" :disabled="disabledSkill" @change="change">
      <option v-for="option in skillsOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Provide, Emit} from 'nuxt-property-decorator'
  import {ICategory} from '@/utils/interface/category'
  import {ISkill} from '@/utils/interface/skill'
  import {CategoryStore, SkillStore} from '@/store'

  @Component
  export default class SelectCombobox extends Vue {
    @Provide() private selectedCategory: Number = 0
    @Provide() private selectedSkill: Number = 0

    @Prop({type: Number})
    value: Number

    created () {
      if (SkillStore.getSkills) {
        const selectedSkill = SkillStore.getSkills.find(d => d.id === this.value)
        this.selectedCategory = selectedSkill ? selectedSkill.category_id : 0
        this.selectedSkill = selectedSkill ? this.value : 0
      }
    }

    changeSelectedCategory () {
      this.selectedSkill = 0
    }

    get disabledSkill () {
      return !this.selectedCategory
    }

    get categoryOptions (): { value: Number, label: String }[] {
      const categories: ICategory[] | null = CategoryStore.getCategories
      let options: { value: Number, label: String }[] = []
      if (categories) {
        options = categories.map((d) => {
          return {
            value: d.id,
            label: d.name
          }
        })
        options.unshift({value: 0, label: '選択してください'})
      }

      return options
    }

    get skillsOptions (): { value: Number, label: String }[] {
      const skills: ISkill[] | null = SkillStore.getSkills
      let options: { value: Number, label: String }[] = []
      if (skills) {
        options = skills.filter(d => d.category_id === this.selectedCategory).map((d) => {
          return {
            value: d.id,
            label: d.name
          }
        })
        options.unshift({value: 0, label: '選択してください'})
      }
      return options
    }

    @Emit()
    change () {
      return this.selectedSkill
    }
  }
</script>

<style scoped lang="scss">

  .select-combobox {
    display: flex;

    > * {
      flex-grow: 1;
      margin-right: $size-s;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
