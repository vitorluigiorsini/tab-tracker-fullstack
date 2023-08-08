<template>
  <VContainer>
    <h1>Welcome to TabTracker App!</h1>
    <VImg class="ma-auto mt-6" :aspect-ratio="1" max-width="280" cover :src="GuitarImg"></VImg>
  </VContainer>
</template>

<script>
import { VContainer, VImg } from 'vuetify/lib/components/index.mjs'
import GuitarImg from '../assets/guitar.png'

export default {
  data() {
    return {
      GuitarImg: GuitarImg
    }
  },
  components: { VImg, VContainer }
}
</script>

<style scoped></style>
