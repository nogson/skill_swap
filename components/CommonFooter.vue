<template>
  <footer id="footer">
    <p class="copyright">
      © 2020 satofaction.net
    </p>
  </footer>
</template>

<script lang="ts">
    export default {
        name: 'CommonFooter'
    }
</script>

<style scoped lang="scss">
#footer{
  background: $color-black;
  padding: $size-l;
  .copyright{
    color: #FFF;
    text-align: center;
  }
}
</style>
