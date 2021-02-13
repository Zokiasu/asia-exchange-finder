<template>
    <div class="absolute mx-auto justify-center items-center bg-black bg-opacity-70 h-screen w-full">
        <div class="mx-auto flex justify-center items-center w-full">
            <div @submit.prevent="loginRequest" id="login-form" class="bg-white p-10 rounded-2xl">
                <div class="grid grid-cols-1 gap-6">
                    <div class="flex flex-wrap mb-2">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="email" v-model="email" type="email" placeholder="Email Address">
                            <label for="email" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Email Address</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="password" v-model="password" type="password" placeholder="Password">
                            <label for="password" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Password</label>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <div v-if="errorMessage !== ''" class="mb-2 text-black" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div v-if="successMessage !== ''" class="mb-2 text-black" role="alert">
                            {{ successMessage }}
                        </div>
                        <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="Button bg-blue-500 container">
                            <span v-if="!xhrRequest">Login</span>
                            <span v-if="xhrRequest">Please Wait...</span>
                        </button>
                        <div v-if="xhrRequest" class="" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="close" class="font-bold bg-red-500 text-white -mt-72 ml-1 px-2 rounded-full">X</button>
        </div>
        <div class="col-sm-12 text-center form-group mt-5">
            <button @click="resetPassword()" class="font-bold text-red-500">Reset Password</button>
        </div>
    </div>
</template>

<script>
    import {apps} from '../main.js'

    export default {
        data() {
            return {
                email: "",
                password: "",
                xhrRequest: false,
                errorMessage: "",
                successMessage: "",
            }
        },

        methods: {
            close(){
                this.$emit('created');
            },
            
            userlog(){
                this.$emit('loged');
            },

            resetPassword(){
                if (!this.email) {
                    this.errorMessage = "Please type in a valid email address.";
                    return;
                }
                apps.auth().sendPasswordResetEmail(this.email).then(() => {
                    this.successMessage = "The password reset email has been sent to " + this.email
                }).catch(error => {
                    this.errorMessage = error.message;
                });
            },

            loginRequest() {
                this.xhrRequest = true;
                this.errorMessage = "";
                this.successMessage = "";
                apps.auth().setPersistence(apps.auth.Auth.Persistence.LOCAL).then(() => {
                    return apps.auth().signInWithEmailAndPassword(this.email, this.password).then(
                            (authUser) => {
                                this.$router.replace('/')
                                this.xhrRequest = false;
                                this.userlog();
                                this.close();
                            }
                    ).catch((error) => {
                            this.errorMessage = error.message;
                            this.xhrRequest = false;
                        }
                    )
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

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