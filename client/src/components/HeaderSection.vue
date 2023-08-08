<template>
  <VAppBar color="blue" class="text-start">
    <VBtn height="100%" to="/">
      <VAppBarTitle class="mr-4"> TabTracker </VAppBarTitle>
    </VBtn>
    <!-- TODO: implement me -->
    <!-- <VBtn flat>Browse</VBtn> -->
    <VSpacer></VSpacer>
    <VBtn flat height="100%" to="login"> Login </VBtn>
    <VBtn flat height="100%" to="register"> Sign Up </VBtn>
  </VAppBar>
</template>

<script>
import { VAppBar, VAppBarTitle, VBtn, VSpacer } from 'vuetify/lib/components/index.mjs'

export default {
  data() {
    return {}
  },
  components: { VAppBar, VAppBarTitle, VBtn, VSpacer }
}
</script>

<style scoped>
.v-app-bar-title {
  flex: 0 0 auto;
}
</style>
