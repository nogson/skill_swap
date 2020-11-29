<template>
  <div class="star">
    <span>
      <font-awesome-icon :icon="['far','star']" class="icon" />
    </span>
    <span>
      <font-awesome-icon :icon="['far','star']" class="icon" />
    </span>
    <span>
      <font-awesome-icon :icon="['far','star']" class="icon" />
    </span>
    <span>
      <font-awesome-icon :icon="['far','star']" class="icon" />
    </span>
    <span>
      <font-awesome-icon :icon="['far','star']" class="icon" />
    </span>
    <!--    <font-awesome-icon :icon="['fas','star-half']" class="icon" />-->
    <!--    <font-awesome-icon :icon="['far','star']" class="icon" />-->
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'nuxt-property-decorator'

  @Component
  export default class Start extends Vue {
  }
</script>

<style scoped lang="scss">
.star {
  .icon {
    color: $color-primary;
  }
}
</style>
