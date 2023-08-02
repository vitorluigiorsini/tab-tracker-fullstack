<template>
  <div>Register</div>

  <input type="email" name="email" placeholder="Email" v-model="email" />
  <br />
  <input type="password" name="password" placeholder="Password" v-model="password" />
  <br />
  <button @click="register">Sign up</button>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data() {
    return {
      email: '',
      password: ''
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
        console.error(error.message)
      }
    }
  }
}
</script>

<style scoped></style>
