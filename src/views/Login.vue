<template>
  <div class="login container" style="margin-top: 37px;">
    <p style="font-size: 75px;color: white;">LOGIN</p>
    <div class="form-login">
      <form v-on:submit.prevent="onLogin">
        <input type="text" v-model="form.email" class="m-2 form-control" placeholder="email">
        <input type="password" v-model="form.password" class="m-2 form-control" placeholder="password">
        <button type="submit" class="btn btn-success">Login</button>
      </form>
      <router-link to="/Register"><button type="text" class="btn btn-danger" style="margin-top: 10px;">Register</button></router-link>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.actionLogin(this.form).then((response) => {
        alert(response)
        window.location = '/home'
      }).catch((err) => {
        alert(err)
      })
    },
    ...mapActions({
      actionLogin: 'auth/login'
    })
  }
}
</script>

<style>
.login {
  background-image: url('../assets/login.jpg');
  width: 100%;
  height: 550px;
}
.form-login {
  padding-top: 48px;
  width: 80%;
  padding-left: 135px;
  align-items: center;
}
</style>
