<template>
  <section>
    <common-header :use-simple="true" />
    <Nuxt />
  </section>
</template>
<script lang="ts">
    import {Vue, Component} from 'nuxt-property-decorator'
    import CommonHeader from '~/components/CommonHeader.vue'

    @Component({
        components: {CommonHeader}
    })
    export default class extends Vue {
    }
</script>
<style scoped>
</style>
