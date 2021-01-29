<template>
    <div class="absolute mx-auto justify-center items-center bg-black bg-opacity-90 min-h-full w-full">
        <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full">
            <form class="contact-form bg-white p-10 rounded-2xl items-center" @submit.prevent="sendEmail">
                <div class="pb-5">
                    <label class="text-black font-bold text-2xl">Contact</label>
                </div>
                <div class="grid grid-cols-1 gap-6">
                    <div class="hidden md:visible md:flex flex-wrap mb-2 col-span-3">
                        <div class="relative w-full appearance-none">
                            <input disabled class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            type="text" name="to_name" placeholder="To" v-model="name">
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-start-1 col-end-7 md:col-span-3">
                        <div class="relative w-full appearance-none">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            type="email" name="from_name" placeholder="Email" v-model="email">
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-start-1 col-end-7">
                        <div class="relative w-full appearance-none">
                            <textarea class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            name="message" placeholder="Message" v-model="message"></textarea>
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-start-1 col-end-7">
                        <div class="relative w-full appearance-none">
                            <input class="container tracking-wide py-2 px-4 leading-relaxed appearance-none block text-black bg-green-400 border border-green-400 rounded" 
                            type="submit" value="Send">
                        </div>
                    </div>
                </div>
            </form>
            <button @click="close" class="font-bold bg-red-500 text-white -mt-96 ml-1 px-2 rounded-full">X</button>
        </div>
    </div>
</template>

<script>
    import emailjs from 'emailjs-com';
    import { init } from 'emailjs-com';
    init("user_LjdyAMDHMFXk6Or6Ffd5a");
    import {apps, name, grade} from '../main.js'
    import db from '../main.js'

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
                }, (error) => {
                    console.log('FAILED...', error);
                });
            }
        }
    }
</script>