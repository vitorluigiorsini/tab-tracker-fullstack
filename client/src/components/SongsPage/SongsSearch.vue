<template>
  <VTextField
    label="Search by song title, artist, album or genre"
    variant="outlined"
    v-model="search"
  />
</template>

<script>
import { VTextField } from 'vuetify/lib/components/index.mjs'
import _ from 'lodash'

export default {
  data() {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function () {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      async handler(value) {
        this.search = value
      }
    }
  },
  components: { VTextField }
}
</script>

<style scoped></style>
