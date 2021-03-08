<template>
  <div class="storong-category">
    <label class="label">{{ label }}</label>
    <div>
      <select-combobox
        v-for="(value, $index) in settingValues"
        :key="$index"
        class="select-combobox"
        :value="value"
        @change="change($event,$index)"
      />
      <div class="mb-l text-alg-right">
        <button class="button-black-line button-s" @click="addSkill">
          追加
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, PropSync} from 'nuxt-property-decorator'
    import SelectCombobox from '~/components/SelectCombobox.vue'

    @Component({
        components: {SelectCombobox}
    })
    export default class CategorySelectBox extends Vue {
        // @Provide() private comboboxValue: string | null = null
        //
        @Prop()
        public label!: string

        @PropSync('values')
        settingValues: number[]

        change (id:number, index:number) {
            this.settingValues.splice(index, 1, id)
        }

      addSkill () {
        this.settingValues.push(0)
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
  .select-combobox{
    margin-bottom: $size-m;
  }
</style>
