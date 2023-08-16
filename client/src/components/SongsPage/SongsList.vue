<template>
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
</template>

<script>
import { VBtn, VCol, VContainer, VImg, VRow } from 'vuetify/lib/components/index.mjs'
import SongsService from '../../services/SongsService'

export default {
  data() {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo(songId) {
      this.$router.push({ name: 'song', params: { songId: songId } })
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler(value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  },
  components: { VContainer, VRow, VCol, VBtn, VImg }
}
</script>

<style scoped></style>
