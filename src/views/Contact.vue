<template>
    <div class="m-10 mb-24  md:mb-10 p-10 xl:mx-52 bg-gray-500 bg-opacity-90">
        <div class="space-x-3 mb-5">
            <router-link to="/about">About Us</router-link>
            <router-link to="/contact" class="text-black font-semibold">Contact</router-link>
            <router-link to="/privacy">Privacy Policy</router-link>
            <router-link to="/terms">Terms of Use</router-link>
        </div>
        <div class="mb-5 font-bold text-4xl">
            <h1>Contact</h1>
        </div>
        <div class="row-auto">
            <div>
                <form class="contact-form items-center" @submit.prevent="sendEmail">
                    <div class="grid grid-cols-1 gap-4">
                        <div v-if="name == ''" class="flex flex-wrap col-start-1 col-end-7">
                            <div class="relative w-full appearance-none">
                                <input disabled class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                type="text" name="to_name" placeholder="To" v-model="name">
                            </div>
                        </div>
                        <div class="flex flex-wrap col-start-1 col-end-7">
                            <div class="relative w-full appearance-none">
                                <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                type="email" name="from_name" placeholder="Your Email" v-model="email">
                            </div>
                        </div>
                        <div class="flex flex-wrap col-start-1 col-end-7">
                            <div class="relative w-full appearance-none">
                                <textarea class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full h-52 text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                name="message" placeholder="Message" v-model="message"></textarea>
                            </div>
                        </div>
                        <div class="flex flex-wrap col-start-1 col-end-7">
                            <div class="relative w-full appearance-none">
                                <input class="w-full tracking-wide py-2 px-4 leading-relaxed appearance-none block text-black bg-green-400 border border-green-400 rounded" 
                                type="submit" value="Send">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {apps} from '../main.js'

    import emailjs from 'emailjs-com';
    import { init } from 'emailjs-com';
    
    init("user_LjdyAMDHMFXk6Or6Ffd5a");

    export default {

        props: ['actualUser'],

        data(){
            return{
                name:'Asia Studeler',
                email:'',
                message:'',
            }
        },

        mounted(){
            apps.auth().onAuthStateChanged((user) =>  {
                if(user != undefined) {
                    this.email = user.email
                } else {
                    this.email = ''
                }
            })
        },

        methods: {
            close(){
                this.$emit('created');
            },

            sendEmail: function(e) {
                emailjs.sendForm('service_2i8qxun', 'template_jyrc5ge', e.target, 'user_LjdyAMDHMFXk6Or6Ffd5a')
                .then((result) => {
                    console.log('SUCCESS!', result.status, result.text);
                    this.$toast.success(`Your message has been sent successfully.`, {position:"top", duration: 5000, max:1});
                    this.close()
                }, (error) => {
                    console.log('FAILED...', error);
                });
            }
        }
    }
</script>