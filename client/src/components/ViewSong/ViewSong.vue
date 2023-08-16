<template>
  <VRow>
    <VCol sm="6" offset="3">
      <PanelContainer title="Song Info">
        <template v-slot:action>
          <VBtn icon="mdi-pencil" @click="navigateTo(song.id)"></VBtn>
        </template>
        <VContainer>
          <VRow>
            <VCol sm="6">
              <SongInfo :song="song" />

              <SongStructure :song="song" />
            </VCol>
            <VCol sm="6">
              <YouTube :song="song" />
            </VCol>
          </VRow>
        </VContainer>
      </PanelContainer>
    </VCol>
  </VRow>
</template>

<script>
import { VBtn, VCol, VContainer, VRow } from 'vuetify/lib/components/index.mjs'
import SongsService from '../../services/SongsService'
import SongInfo from './SongInfo.vue'
import SongStructure from './SongStructure.vue'
import YouTube from './YouTube.vue'

export default {
  data() {
    return {
      song: {},
      isTabActive: true
    }
  },
  async mounted() {
    const songId = this.$route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  methods: {
    navigateTo(songId) {
      this.$router.push({ name: 'song-edit', params: { songId: songId } })
    }
  },
  components: {
    VContainer,
    VRow,
    VCol,
    VBtn,
    SongInfo,
    SongStructure,
    YouTube
  }
}
</script>

<style scoped></style>
