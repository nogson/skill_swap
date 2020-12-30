<template>
  <section>
    <common-header />
    <Nuxt />
    <common-footer />
    <notifications group="all" />
  </section>
</template>
<script>
import CommonHeader from '../components/CommonHeader'
import CommonFooter from '../components/CommonFooter'
export default {
  components: {CommonFooter, CommonHeader}
}
</script>
<style scoped>
</style>
