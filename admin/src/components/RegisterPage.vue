<template>
  <div>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h2 class="card-title text-center mb-4">Create Your Account!</h2>
      <div class="card" style="width: 100%; max-width: 500px;">
        <div class="card-body m-4">
          <form @submit.prevent="submitForm">
            <div class="form-group mb-4">
              <label class="mb-1">Username</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                placeholder="Enter Username"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid username.
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="mb-1">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Enter email"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid email.
              </div>
            </div>

            <div class="form-group mb-4">
              <label class="mb-1">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid password.
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="mb-1">Confirm Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid password.
              </div>
              <div v-if="passwordsMismatch" class="text-danger">
        Passwords do not match.
      </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-center mt-3">
        <span>Existing User?</span>
        <button
          class="btn btn-link text-blue text-decoration-underline"
          @click="$router.push('/login')">
          Login
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
  name: 'SignupPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordsMismatch: undefined,
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        this.passwordsMismatch = true;
        return;
      } else {
        this.passwordsMismatch = false;

      }
      
      const formData = {
        name: this.username,
        email: this.email,
        password: this.password,
      };
      
      axios.post('http://localhost:3000/api/signup', formData)
        .then(response => {
          console.log('Signup successful:', response.data);
          toast.success("Login successful", {
            autoClose: 3000,
          });
          setTimeout(() => {
            this.$router.push('/login');
          }, 3000);
        })
        .catch(error => {
          console.log('Error signing up:', error.response.data);
          if (error.response.data.error == "Email already exists") {
            toast.error("Email already exists", {
              autoClose: 3000,
            });
          }
        });
    },
  },
};
</script>
