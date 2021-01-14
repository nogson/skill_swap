<template>
  <div class="star">
    <span v-for="(klass, $index) in starsClass" :key="$index">
      <font-awesome-icon :icon="klass" class="icon" />
    </span>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'nuxt-property-decorator'

  @Component
  export default class Star extends Vue {
    @Prop()
    value: Number

    get starsClass () {
      const arr = [['far', 'star'], ['far', 'star'], ['far', 'star'], ['far', 'star'], ['far', 'star']]
      for (const v of [...Array(this.value).keys()]) {
        arr[v] = ['fas', 'star']
      }

      return arr
    }
  }
</script>

<style scoped lang="scss">
  .star {
    .icon {
      color: $color-primary;
    }
  }
</style>
