<template>
  <VRow>
    <VCol sm="4">
      <PanelContainer title="Song Info">
        <VTextField
          :rules="[required]"
          label="Title"
          variant="underlined"
          v-model="song.title"
        ></VTextField>
        <VTextField
          :rules="[required]"
          label="Artist"
          variant="underlined"
          v-model="song.artist"
        ></VTextField>
        <VTextField
          :rules="[required]"
          label="Genre"
          variant="underlined"
          v-model="song.genre"
        ></VTextField>
        <VTextField
          :rules="[required]"
          label="Album"
          variant="underlined"
          v-model="song.album"
        ></VTextField>
        <VTextField
          :rules="[required]"
          label="Album Image Url"
          variant="underlined"
          v-model="song.albumImageUrl"
        ></VTextField>
        <VTextField
          :rules="[required]"
          label="Youtube ID"
          variant="underlined"
          v-model="song.youtubeId"
        ></VTextField>
      </PanelContainer>
    </VCol>
    <VCol sm="8">
      <PanelContainer title="Song Structure">
        <VTextarea
          :rules="[required]"
          label="Lyrics"
          variant="underlined"
          v-model="song.lyrics"
        ></VTextarea>
        <VTextarea
          :rules="[required]"
          label="Tab"
          variant="underlined"
          v-model="song.tab"
        ></VTextarea>
      </PanelContainer>
      <br />
      <div class="text-red" v-if="error">{{ error }}</div>
      <br />
      <VBtn color="blue" @click="save">Save Song</VBtn>
    </VCol>
  </VRow>
</template>

<script>
import { VBtn, VCol, VRow, VTextField, VTextarea } from 'vuetify/lib/components/index.mjs'
import SongsService from '../services/SongsService'
export default {
  data() {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async save() {
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.song).every((key) => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }

      const songId = this.$route.params.songId
      try {
        await SongsService.update(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    try {
      const songId = this.$route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (error) {
      console.log(error)
    }
  },
  components: {
    VTextField,
    VRow,
    VCol,
    VTextarea,
    VBtn
  }
}
</script>

<style scoped></style>
