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
              <div class="d-flex">
                <VCol sm="6">
                  <VImg
                    class="ma-auto"
                    :aspect-ratio="1"
                    max-width="160"
                    :src="song.albumImageUrl"
                  ></VImg>

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

              <div class="mt-12">
                <div class="d-flex">
                  <VBtn :active="isTabActive" @click="toggleIsTabActive" color="blue" class="mr-2"
                    >Tab</VBtn
                  >
                  <VBtn :active="!isTabActive" @click="toggleIsTabActive" color="blue">Lyrics</VBtn>
                </div>
                <VTextarea
                  v-if="isTabActive"
                  no-resize
                  readonly
                  auto-grow
                  variant="plain"
                  v-model="song.tab"
                >
                </VTextarea>
                <VTextarea
                  v-if="!isTabActive"
                  no-resize
                  readonly
                  auto-grow
                  variant="plain"
                  v-model="song.lyrics"
                >
                </VTextarea>
              </div>
            </VCol>
            <VCol sm="6">
              <YouTube :id="song.youtubeId" :title="youtubeVideoTitle" />
            </VCol>
          </VRow>
        </VContainer>
      </PanelContainer>
    </VCol>
  </VRow>
</template>

<script>
import { VBtn, VCol, VContainer, VImg, VRow, VTextarea } from 'vuetify/lib/components/index.mjs'
import PanelContainer from './PanelContainer.vue'
import SongsService from '../services/SongsService'
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

export default {
  data() {
    return {
      song: {},
      youtubeVideoTitle: null,
      iconHeart: null,
      isTabActive: true
    }
  },
  async mounted() {
    const songId = this.$route.params.songId
    this.song = (await SongsService.show(songId)).data
    this.youtubeVideoTitle = `${this.song.artist} - ${this.song.title}`
    this.iconHeart = 'mdi-heart-outline'
  },
  methods: {
    toggleIsTabActive() {
      this.isTabActive = !this.isTabActive
    },
    navigateTo(songId) {
      this.$router.push({ name: 'song-edit', params: { songId: songId } })
    }
  },
  components: {
    PanelContainer,
    VContainer,
    VRow,
    VCol,
    VBtn,
    VImg,
    VTextarea,
    YouTube: LiteYouTubeEmbed
  }
}
</script>

<style scoped></style>
