<template>
  <div class="side-nav">
    <h4 class="side-nav-title">カテゴリ</h4>
    <nav>
      <select class="selectbox">
        <option value="1">プログラム</option>
      </select>
      <ul class="side-nav-list">
        <li>PHP</li>
        <li>Laravel</li>
        <li>GO</li>
        <li>HTML・CSS</li>
        <li>iOS</li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'nuxt-property-decorator'
  import CommonTitle from "~/components/CommonTitle.vue";
  @Component({
      components: {CommonTitle}
  })
  export default class SideNav extends Vue {
  }
</script>

<style scoped lang="scss">
  .side-nav-title {
    font-size: $font-size-14;
    font-weight: bold;
    margin-bottom: $size-m;
  }
  .side-nav {
    width: 300px;
    padding-right:$size-xl;
  }
  .selectbox {
    width: 100%;
    margin-bottom: $size-l;
  }
  .side-nav-list {
    >* {
      margin-bottom: $size-s;
    }
  }
</style>
