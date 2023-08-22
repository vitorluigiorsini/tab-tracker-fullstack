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
      <VBtn
        v-if="isUserLoggedIn && !bookmark"
        @click="setAsBookmark"
        color="blue"
        icon="mdi-heart-outline"
      ></VBtn>
      <VBtn
        v-if="isUserLoggedIn && bookmark"
        @click="unsetAsBookmark"
        color="blue"
        icon="mdi-heart"
      ></VBtn>
    </VCol>
  </div>
</template>

<script>
import { VBtn, VCol, VImg } from 'vuetify/lib/components/index.mjs'
import { useUserStore } from '../../stores/userStore'
import { storeToRefs } from 'pinia'
import BookmarksService from '../../services/BookmarksService'

export default {
  data() {
    return {
      bookmark: null
    }
  },
  setup() {
    const userStore = useUserStore()
    const { isUserLoggedIn } = storeToRefs(userStore)
    return { userStore, isUserLoggedIn }
  },
  props: ['song'],
  watch: {
    async song() {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.bookmark = (
          await BookmarksService.index({
            songId: this.song.id,
            userId: this.userStore.user.id
          })
        ).data
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    async setAsBookmark() {
      try {
        this.bookmark = (
          await BookmarksService.post({
            songId: this.song.id,
            userId: this.userStore.user.id
          })
        ).data
      } catch (error) {
        console.log(error)
      }
    },
    async unsetAsBookmark() {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: { VCol, VImg, VBtn }
}
</script>

<style scoped></style>
