<template>
  <h1>Register</h1>

  <input type="email" name="email" placeholder="Email" v-model="email" />
  <br />
  <input type="password" name="password" placeholder="Password" v-model="password" />
  <br />
  <div class="error" v-html="error"></div>
  <br />
  <button @click="register">Sign up</button>
</template>

<script>
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
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
