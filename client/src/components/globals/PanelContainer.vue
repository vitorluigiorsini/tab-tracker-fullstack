<template>
  <VSheet color="white" elevation="2">
    <VToolbar flat density="compact" color="blue" class="text-start">
      <VToolbarTitle>{{ title }} </VToolbarTitle>
      <VSpacer></VSpacer>

      <slot name="action"></slot>
    </VToolbar>
    <VSheet class="pl-4 pr-4 pt-2 pb-2">
      <slot>No slot content defined</slot>
    </VSheet>
  </VSheet>
</template>

<script>
import { VSheet, VSpacer, VToolbar, VToolbarTitle } from 'vuetify/lib/components/index.mjs'
export default {
  data() {
    return {}
  },
  props: ['title'],
  components: { VToolbar, VSheet, VToolbarTitle, VSpacer }
}
</script>

<style scoped></style>
