<template>
  <VRow>
    <VCol sm="6" offset-sm="3">
      <SongsSearch />
      <SongsList />
    </VCol>
  </VRow>
</template>

<script>
import { VCol, VRow } from 'vuetify/lib/components/index.mjs'
import SongsList from './SongsList.vue'
import SongsSearch from './SongsSearch.vue'

export default {
  components: { VRow, VCol, SongsList, SongsSearch }
}
</script>

<style scoped></style>
