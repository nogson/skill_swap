<template>
  <div class="storong-category">
    <label class="label">得意なこと</label>
    <div>
      <select-combobox v-for="(value, $index) in settingValues" :value="value" :key="$index" @change="change($event,$index)" />
    </div>
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
        @PropSync('values')
        settingValues: number[]

        change (id:number, index:number) {
            this.settingValues.splice(index, 1, id)
        }
    }
</script>

<style scoped lang="scss">

  .storong-category {
    display: flex;

    .label {
      margin-right: $size-m;
      min-width: 120px;
      text-align: left;
    }
  }
</style>
