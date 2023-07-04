<template>
  <div>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h2 class="card-title text-center mb-4">Welcome!</h2>
      <div class="card" style="width: 100%; max-width: 500px;">
        <div class="card-body m-4">
          <form @submit="login">
            <div class="form-group mb-4">
              <label class="mb-1">Email</label>
              <input type="email" class="form-control" placeholder="Enter email" required v-model="email" />
              <div class="invalid-feedback">
                Please provide a valid email.
              </div>
            </div>

            <div class="form-group mb-4">
              <label class="mb-1">Password</label>
              <input type="password" class="form-control" placeholder="Password" required v-model="password" />
              <div class="invalid-feedback">
                Please provide a valid password.
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-center mt-3">
        <span>Do you have an account?</span>
        <button class="btn btn-link text-blue text-decoration-underline" @click="this.$router.push('/register')">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login(event) {
      event.preventDefault();

      const loginData = {
        email: this.email,
        password: this.password,
      };

      axios.post('http://localhost:3000/api/login', loginData)
        .then(response => {
          console.log(response.data);

          localStorage.setItem('userData', JSON.stringify(response.data));

          setTimeout(() => {
            this.$router.push('/home/dashboard');

          }, 2000);
          
          toast.success("Login successful", {
            autoClose: 3000,
          });
        })
        .catch(error => {
          toast.error("Login failed", {
            autoClose: 3000,
          });
          console.error(error);
        });
    },
  },
};
</script>
