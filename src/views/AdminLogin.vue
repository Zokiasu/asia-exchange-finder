<template>
    <div class="bg-black bg-opacity-30 h-auto text-white absolute inset-x-0 top-0 flex flex-col">

        <h1 class="font-bold text-center mt-20 ms:mt-24 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Asia Exchange Finder</h1>

        <div class="mt-12 md:mt-12 mx-auto flex justify-center items-center w-full ">
            <form @submit.prevent="loginRequest" id="login-form">
                <div class="grid grid-cols-1 gap-6">
                    <div class="grid grid-cols-1 gap-1">
                        <label class="place-self-center ms:text-2xl" for="email">Email Address</label>
                        <input type="email" v-model="email" id="email" class="">
                    </div>
                    <div class="grid grid-cols-1 gap-1 mb-2">
                        <label class="place-self-center ms:text-2xl" for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="">
                    </div>
                    <div class="">
                        <div v-if="errorMessage !== ''" class="mb-2" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div v-if="successMessage !== ''" class="mb-2" role="alert">
                            {{ successMessage }}
                        </div>
                        <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="Button container ">
                            <span v-if="! xhrRequest">Login</span>
                            <span v-if="xhrRequest">Please Wait...</span>
                        </button>
                        <div v-if="xhrRequest" class="" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <!--<div class="col-sm-12 text-center form-group mt-5">
                        <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
                    </div>-->
                </div>
            </form>
        </div>

        <p class="mt-10 ms:mt-14 mb-72 ms:mb-80 py-5 text-base ms:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center bg-black bg-opacity-50 w-full">
            This page is only for administrators if you are not an administrator you don't have to do anything here.
        </p>
    </div>
</template>
<script>
import firebase from "firebase";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            xhrRequest: false,
            errorMessage: "",
            successMessage: ""
        }
    },
    methods: {
        loginRequest() {
            let v = this;

            v.xhrRequest = true;
            v.errorMessage = "";
            v.successMessage = "";

            firebase.auth().signInWithEmailAndPassword(v.email, v.password).then(
                () => {
                    this.$router.replace('/Dashboard')
                    v.xhrRequest = false;
                }, 
                (error) => {
                    v.errorMessage = error.message;
                    v.xhrRequest = false;
                }
            )
        }
    }
}
</script>

<style scoped>
.loader {
    position:relative;
    top:6px;
    left:10px;
}
</style>