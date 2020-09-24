<template>
  <div class="register container" style="margin-top: 37px;">
    <h1 style="font-size: 75px;color: white;">REGISTER</h1>
    <div class="form-register">
      <form v-on:submit.prevent="onRegister">
        <input type="text" v-model="form.email" class="m-2 form-control" placeholder="email">
        <input type="password" v-model="form.password" class="m-2 form-control" placeholder="password">
        <button type="submit" class="btn btn-success">Register</button>
      </form>
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
    onRegister () {
      this.actionRegister(this.form).then((response) => {
        alert(response)
        window.location = '/login'
      }).catch((err) => {
        alert(err)
      })
    },
    ...mapActions({
      actionRegister: 'auth/register'
    })
  }
}
</script>

<style>
.register {
  background-image: url('../assets/login.jpg');
  width: 100%;
  height: 550px;
}
.form-register {
  padding-top: 85px;
  width: 80%;
  padding-left: 135px;
  align-items: center;
}

</style>
