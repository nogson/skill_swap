<template>
  <div class="main-content">
    <nav class="side-nav">
      <common-title klass="title-4">受信ボックス</common-title>
      <ul>
        <li class="side-nav-li">
          <img class="thumbnail-s" src="../assets/images/dummy/user/user_1.png">
          <span class="side-nav-li-name">ガバオ</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Provide} from 'nuxt-property-decorator'
  import CommonTitle from "~/components/CommonTitle.vue";
  @Component({
      components: {CommonTitle},
      middleware: ['authenticated', 'common']
  })
  export default class extends Vue {

  }
</script>

<style scoped lang="scss">
.side-nav{
  width: 300px;
  border-right: 1px solid $color-gray-thin1;

  li {
    display: flex;
    align-items: center;
    margin-bottom: $size-m;
    border-bottom: 1px solid $color-gray-thin1;
    padding: $size-m;
    .side-nav-li-name {
      font-weight: bold;
      margin-left: $size-m;
    }
  }
}
</style>
