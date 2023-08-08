<template>
  <div id="app">
    <VApp>
      <HeaderSection />
      <VMain>
        <VContainer fluid>
          <router-view />
        </VContainer>
      </VMain>
    </VApp>
  </div>
</template>

<script>
import { VApp, VContainer, VMain } from 'vuetify/lib/components/index.mjs'
import HeaderSection from './components/HeaderSection.vue'
export default {
  data() {
    return {}
  },
  components: {
    HeaderSection,
    VApp,
    VMain,
    VContainer
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
