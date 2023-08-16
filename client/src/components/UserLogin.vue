<template>
  <VRow>
    <VCol sm="6" offset-sm="3">
      <PanelContainer title="Login">
        <VForm>
          <VTextField type="email" label="E-mail" variant="underlined" v-model="email" />
          <br />
          <VTextField type="password" label="Password" variant="underlined" v-model="password" />
          <br />
          <div class="text-red" v-html="error"></div>
          <br />
          <VBtn color="blue" @click="login">Login</VBtn>
        </VForm>
        <br />
        <div>
          Need an account?
          <VBtn class="pa-0 text-decoration-underline text-blue" variant="text" to="/register">
            Sign up</VBtn
          >
        </div>
      </PanelContainer>
    </VCol>
  </VRow>
</template>

<script>
import { VBtn, VCol, VForm, VRow, VTextField } from 'vuetify/lib/components/index.mjs'
import AuthenticationService from '../services/AuthenticationService'
import { useUserStore } from '../stores/userStore'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  setup() {
    const userStore = useUserStore()

    return { userStore }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.userStore.setUser(response.data.user)
        this.userStore.setToken(response.data.token)
        this.$router.push({ name: 'songs' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    VTextField,
    VBtn,
    VForm,
    VRow,
    VCol
  }
}
</script>

<style scoped></style>
