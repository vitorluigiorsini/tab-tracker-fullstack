<template>
  <VRow>
    <VCol sm="6" offset-sm="3">
      <PanelContainer title="Register">
        <VForm>
          <VTextField type="email" label="E-mail" variant="underlined" v-model="email" />
          <br />
          <VTextField type="password" label="Password" variant="underlined" v-model="password" />
          <br />
          <VTextField
            type="password"
            label="Confirm Password"
            variant="underlined"
            v-model="confirmPassword"
          />
          <br />
          <div class="text-red" v-html="error"></div>
          <br />
          <VBtn color="blue" @click="register">Register</VBtn>
        </VForm>
        <br />
        <div>
          Already have an account?
          <VBtn class="pa-0 text-decoration-underline text-blue" variant="text" to="/login">
            Log in</VBtn
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
      confirmPassword: '',
      error: null
    }
  },
  setup() {
    const userStore = useUserStore()

    return { userStore }
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.confirmPassword) {
          return (this.error = 'The password confirmation is incorrect')
        }
        const response = await AuthenticationService.register({
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
