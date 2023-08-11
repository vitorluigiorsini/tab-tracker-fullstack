<template>
  <VContainer>
    <VRow>
      <VCol sm="6" offset-sm="3">
        <PanelContainer title="Songs">
          <template v-slot:action>
            <VBtn icon="mdi-plus" to="/songs/create"></VBtn>
          </template>
          <template v-slot:default>
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
                  </VCol>
                  <VCol sm="6">
                    <VImg
                      class="ma-auto"
                      :aspect-ratio="1"
                      max-width="120"
                      :src="song.albumImageUrl"
                    ></VImg>

                    <div class="song-album">
                      {{ song.album }}
                    </div>
                  </VCol>
                </VRow>
              </VContainer>
            </div>
          </template>
        </PanelContainer>
      </VCol>
    </VRow>
  </VContainer>
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
  components: { PanelContainer, VContainer, VRow, VCol, VBtn, VImg }
}
</script>

<style scoped></style>
