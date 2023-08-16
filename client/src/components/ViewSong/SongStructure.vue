<template>
  <div class="mt-12">
    <div class="d-flex">
      <VBtn :active="isTabActive" @click="toggleIsTabActive" color="blue" class="mr-2">Tab</VBtn>
      <VBtn :active="!isTabActive" @click="toggleIsTabActive" color="blue">Lyrics</VBtn>
    </div>
    <VTextarea
      v-if="isTabActive"
      no-resize
      readonly
      auto-grow
      variant="plain"
      :model-value="song.tab"
    >
    </VTextarea>
    <VTextarea
      v-if="!isTabActive"
      no-resize
      readonly
      auto-grow
      variant="plain"
      :model-value="song.lyrics"
    >
      {{ song.lyrics }}
    </VTextarea>
  </div>
</template>

<script>
import { VBtn, VTextarea } from 'vuetify/lib/components/index.mjs'

export default {
  data() {
    return {
      isTabActive: true
    }
  },
  props: ['song'],
  methods: {
    toggleIsTabActive() {
      this.isTabActive = !this.isTabActive
    }
  },
  components: { VBtn, VTextarea }
}
</script>

<style scoped></style>
