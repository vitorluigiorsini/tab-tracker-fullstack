<template>
  <LiteYouTubeEmbed :id="song.youtubeId" :title="youtubeVideoTitle" />
</template>

<script>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

export default {
  data() {
    return {
      youtubeVideoTitle: null
    }
  },
  props: ['song'],
  mounted() {
    this.youtubeVideoTitle = `${this.song.artist} - ${this.song.title}`
  },
  components: {
    LiteYouTubeEmbed
  }
}
</script>

<style scoped></style>
