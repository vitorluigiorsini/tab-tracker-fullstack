<template>
  <VRow>
    <VCol sm="6" offset-sm="3">
      <PanelContainer title="Songs List">
        <template v-slot:action>
          <VBtn icon="mdi-plus" to="/songs/create"></VBtn>
        </template>

        <div v-for="song in songs" :key="song.title">
          <VContainer>
            <VRow>
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
                <VBtn color="blue" @click="navigateTo(song.id)">View</VBtn>
              </VCol>
              <VCol sm="6">
                <VImg
                  class="ma-auto"
                  :aspect-ratio="1"
                  max-width="120"
                  :src="song.albumImageUrl"
                ></VImg>

                <div>
                  {{ song.album }}
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </div>
      </PanelContainer>
    </VCol>
  </VRow>
</template>

<script>
import PanelContainer from './PanelContainer.vue'
import SongsService from '../services/SongsService'
import { VBtn, VCol, VContainer, VImg, VRow } from 'vuetify/lib/components/index.mjs'
export default {
  data() {
    return {
      songs: null
    }
  },
  async mounted() {
    this.songs = (await SongsService.index()).data
  },
  methods: {
    navigateTo(songId) {
      this.$router.push({ name: 'song', params: { songId: songId } })
    }
  },
  components: { PanelContainer, VContainer, VRow, VCol, VBtn, VImg }
}
</script>

<style scoped></style>
