<template>
  <div class="text-h2">Welcome to Tab Tracker App!</div>
  <VImg class="ma-auto mt-6" :aspect-ratio="1" max-width="400" :src="GuitarImg"></VImg>
</template>

<script>
import { VImg } from 'vuetify/lib/components/index.mjs'
import GuitarImg from '../assets/guitar.png'

export default {
  data() {
    return {
      GuitarImg: GuitarImg
    }
  },
  components: { VImg }
}
</script>

<style scoped></style>
