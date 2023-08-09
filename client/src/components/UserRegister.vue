<template>
  <VContainer>
    <VRow>
      <VCol sm="6" offset-sm="3">
        <VSheet color="white" elevation="2">
          <VToolbar flat density="compact" color="blue" class="text-start">
            <VToolbarTitle>Register</VToolbarTitle>
          </VToolbar>
          <v-col>
            <v-sheet class="pl-4 pr-4 pt-2 pb-2">
              <VForm>
                <VTextField type="email" label="Email" variant="underlined" v-model="email" />
                <br />
                <VTextField
                  type="password"
                  label="Password"
                  variant="underlined"
                  v-model="password"
                />
                <br />
                <div class="text-red" v-html="error"></div>
                <br />
                <VBtn color="blue" @click="register">Register</VBtn>
              </VForm>
            </v-sheet>
          </v-col>
        </VSheet>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import {
  VBtn,
  VCol,
  VContainer,
  VForm,
  VRow,
  VSheet,
  VTextField,
  VToolbar,
  VToolbarTitle
} from 'vuetify/lib/components/index.mjs'
import AuthenticationService from '../services/AuthenticationService'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: { VToolbar, VToolbarTitle, VContainer, VTextField, VSheet, VCol, VRow, VBtn, VForm }
}
</script>

<style scoped></style>
