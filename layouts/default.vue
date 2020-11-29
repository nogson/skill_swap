<template>
  <section>
    <common-header />
    <Nuxt />
    <common-footer />
  </section>
</template>
<script>
import CommonHeader from '../components/CommonHeader'
import CommonFooter from '../components/CommonFooter'
export default {
  components: { CommonFooter, CommonHeader }
}
</script>
<style scoped>
</style>
