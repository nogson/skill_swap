<template>
  <label class="box-input">
    <span class="label">{{ label }}</span><input :value="value" type="text" @input="input($event.target.value)">
  </label>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from 'nuxt-property-decorator'

  @Component
  export default class CommonInputFiled extends Vue {
      @Prop({default: 'label'})
      label: string

      @Prop()
      public value!: string;

      @Emit()
      public input (value: string) {}
  }
</script>

<style scoped lang="scss">
.box-input{
  display: flex;
  align-items: center;
  margin-bottom: $size-l;
  .label {
    margin-right: $size-m;
    min-width: 120px;
    text-align: left;
  }
  input {
    width: 100%;
  }
}
</style>
