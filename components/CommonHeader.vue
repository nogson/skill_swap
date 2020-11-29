<template>
  <header id="header">
    <h1 class="logo">
      Skill swap
    </h1>
    <div v-if="!useSimple" class="header-items">
      <input class="header_search" type="text">
      <div class="header-buttons">
        <nuxt-link to="/login">
          ログイン
        </nuxt-link>
        <nuxt-link to="/login" class="button-primary-fill">
          新規登録
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'nuxt-property-decorator'

    @Component
    export default class CommonHeader extends Vue {
        @Prop({default: false})
        useSimple: boolean
    }
</script>

<style scoped lang="scss">
  #header {
    padding: $size-m $size-l;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 1px $shadow-color;
    background: #FFF;
    width: 100%;
    position: relative;

    .header-items {
      display: flex;
      flex-grow: 1;
    }

    .header-buttons {
      display: flex;
      align-items: center;
      margin-left: auto;

      > * {
        margin-left: $size-m;
      }
    }

    .header_search {
      margin-left: $size-m;
    }
  }
</style>
