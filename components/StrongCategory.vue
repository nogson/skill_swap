<template>
  <div class="storong-category">
    <label class="label">得意なこと</label>
    <select-combobox />
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, PropSync, Provide} from 'nuxt-property-decorator'
    import SelectCombobox from '~/components/SelectCombobox.vue'
    @Component({
      components: {SelectCombobox}
    })
    export default class StrongCategory extends Vue {
        // @Provide() private comboboxValue: string | null = null
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
    }
</script>

<style scoped lang="scss">

.storong-category{
  display: flex;
  .label {
    margin-right: $size-m;
    min-width: 120px;
    text-align: left;
  }
}
</style>
