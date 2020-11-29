<template>
  <div>
    <h1 v-if="klass === 'title-1'" :class="klass">
      <span><slot /></span>
    </h1>
    <h1 v-if="klass === 'title-2'" :class="klass">
      <span><slot /></span>
    </h1>
    <h2 v-if="klass === 'title-3'" :class="klass">
      <span><slot /></span>
    </h2>
  </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'nuxt-property-decorator'

    @Component
    export default class CommonTitle extends Vue {
        @Prop({default: 'title-1'})
        klass: string
    }
</script>

<style scoped lang="scss">
  .title-1 {
    text-align: center;
    margin-bottom: $size-xl;

    span {
      font-size: 2.4rem;
      text-align: center;
      border-bottom: 4px solid $color-primary;
      padding-bottom: $size-xs;
    }
  }

  .title-2 {
    font-size: $font-size-20;
    font-weight: bold;
    margin-bottom: $size-m;
  }

  .title-3 {
    font-size: $font-size-18;
    font-weight: bold;
    margin-bottom: $size-m;
  }
</style>
