<template>
  <div class="mb-l">
    <label class="box-input">
      <span class="label">{{ label }}<span v-if="note" class="note"> {{ note }}</span></span><input :value="value" type="text" @input="input($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from 'nuxt-property-decorator'

  @Component
  export default class CommonInputFiled extends Vue {
      @Prop({default: 'label'})
      label: string

      @Prop()
      public value!: string;

      @Prop()
      public note!: string;

      @Emit()
      public input (value: string) {}
  }
</script>

<style scoped lang="scss">
.box-input{
  display: flex;
  align-items: center;
  .label {
    margin-right: $size-m;
    min-width: 140px;
    text-align: left;
  }
  input {
    width: 100%;
  }
}

.note {
  font-size: $font-size-12;
  color: $color-gray2;
  text-align: left;
  display: block;
}
</style>
