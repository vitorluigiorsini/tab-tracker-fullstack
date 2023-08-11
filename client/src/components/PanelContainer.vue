<template>
  <VSheet color="white" elevation="2">
    <VToolbar flat density="compact" color="blue" class="text-start">
      <VToolbarTitle>{{ title }} </VToolbarTitle>
      <VSpacer></VSpacer>

      <slot name="action"></slot>
    </VToolbar>
    <v-col>
      <v-sheet class="pl-4 pr-4 pt-2 pb-2"> </v-sheet>
      <slot>No slot content defined</slot>
    </v-col>
  </VSheet>
</template>

<script>
import { VCol, VSheet, VSpacer, VToolbar, VToolbarTitle } from 'vuetify/lib/components/index.mjs'
export default {
  data() {
    return {}
  },
  props: ['title'],
  components: { VToolbar, VCol, VSheet, VToolbarTitle, VSpacer }
}
</script>

<style scoped></style>
