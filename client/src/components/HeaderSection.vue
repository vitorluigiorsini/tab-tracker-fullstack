<template>
  <VAppBar color="blue" class="text-start">
    <VBtn height="100%" to="/">
      <VAppBarTitle class="mr-4"> TabTracker </VAppBarTitle>
    </VBtn>
    <VBtn flat height="100%" to="/songs">Browse</VBtn>
    <VSpacer></VSpacer>
    <VBtn v-if="!isUserLoggedIn" flat height="100%" to="/login"> Login </VBtn>
    <VBtn v-if="!isUserLoggedIn" flat height="100%" to="/register"> Sign Up </VBtn>
    <VBtn v-if="isUserLoggedIn" @click="logout" flat height="100%" to="/"> Log Out </VBtn>
  </VAppBar>
</template>

<script>
import { VAppBar, VAppBarTitle, VBtn, VSpacer } from 'vuetify/lib/components/index.mjs'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

export default {
  data() {
    return {}
  },
  setup() {
    const userStore = useUserStore()
    const { isUserLoggedIn } = storeToRefs(userStore)
    return { userStore, isUserLoggedIn }
  },
  methods: {
    logout() {
      this.userStore.$reset()
    }
  },
  components: { VAppBar, VAppBarTitle, VBtn, VSpacer }
}
</script>

<style scoped>
.v-app-bar-title {
  flex: 0 0 auto;
}
</style>
