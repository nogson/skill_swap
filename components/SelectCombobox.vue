<template>
  <div class="select-combobox">
    <select v-model="selectedCategory">
      <option v-for="option in categoryOptions" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
    <select v-model="selectedSkill" :disabled="disabledSkill">
      <option v-for="option in skillOptions" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, PropSync, Provide} from 'nuxt-property-decorator'

    @Component
    export default class SelectCombobox extends Vue {
      @Provide() private selectedCategory: string = ''
      @Provide() private categoryOptions: {value:string, label:string}[] = [
        {value: '', label: '選択してください'},
        {value: '1', label: 'IT・プログラミング'},
        {value: '2', label: 'デザイン'},
        {value: '3', label: '動画・写真'},
        {value: '4', label: 'Webマーケティング'}
      ]
      @Provide() private selectedSkill: string = ''
      @Provide() private skillOptions: {value:string, label:string}[] = [
        {value: '', label: '選択してください'},
        {value: '1', label: 'スキル1'},
        {value: '2', label: 'スキル2'},
        {value: '3', label: 'スキル3'},
        {value: '4', label: 'スキル4'}
      ]

      //
        // @Prop()
        // public label!: string
        //
        // @PropSync('values')
        // settingValues: string[]
        //
        // setValue (): void {
        //     if (this.comboboxValue) {
        //         this.settingValues.push(this.comboboxValue)
        //         this.comboboxValue = null
        //     }
        // }
        //
        // deleteValue (index:number):void{
        //     this.settingValues.splice(index, 1)
        // }

      get disabledSkill () {
           return !this.selectedCategory
      }
    }
</script>

<style scoped lang="scss">

.select-combobox{
  display: flex;
  >* {
    margin-right: $size-l;
  }
}
</style>
