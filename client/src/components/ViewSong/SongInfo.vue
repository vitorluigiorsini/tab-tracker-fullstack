<template>
  <div class="d-flex">
    <VCol sm="6">
      <VImg class="ma-auto" :aspect-ratio="1" max-width="160" :src="song.albumImageUrl"></VImg>

      <div>{{ song.album }}</div>
    </VCol>
    <VCol sm="6">
      <div class="text-h5">
        {{ song.title }}
      </div>
      <div class="text-h6">
        {{ song.artist }}
      </div>
      <div>
        {{ song.genre }}
      </div>
      <br />
      <VBtn color="blue" :icon="iconHeart"></VBtn>
    </VCol>
  </div>
</template>

<script>
import { VBtn, VCol, VImg } from 'vuetify/lib/components/index.mjs'

export default {
  data() {
    return {
      iconHeart: null
    }
  },
  props: ['song'],
  mounted() {
    this.iconHeart = 'mdi-heart-outline'
  },
  components: { VCol, VImg, VBtn }
}
</script>

<style scoped></style>
