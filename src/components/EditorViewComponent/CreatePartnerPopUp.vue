<template>
    <div class="absolute mx-auto justify-center items-center min-h-screen w-full flex flex-wrap content-center">
        <div class="mx-auto flex justify-center items-center w-full ">
            <div class="px-10 py-5 bg-white text-black rounded-xl border-gray-500 shadow-2xl">
                <h1 class="mb-5 font-semibold text-xl">Creation of new partner</h1>
                <div class="font-bold grid grid-cols-2 gap-2">
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universityPartnerName" v-model="universitysPartner.universityPartnerName" type="text" placeholder="Partner Name">
                            <label for="universityPartnerName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Name</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universityPartnerAddress" v-model="universitysPartner.universityPartnerAddress" type="text" placeholder="Partner Address">
                            <label for="universityPartnerAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Address</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universityPartnerCountry" v-model="universitysPartner.universityPartnerCountry" type="text" placeholder="Partner Country">
                            <label for="universityPartnerCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Country</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universityPartnerCity" v-model="universitysPartner.universityPartnerCity" type="text" placeholder="Partner City">
                            <label for="universityPartnerCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner City</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universityPartnerWebsiteLink" v-model="universitysPartner.universityPartnerWebsiteLink" type="url" placeholder="Partner Website Link">
                            <label for="universityPartnerWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Website Link</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating col-start-1 col-end-7">
                            <textarea class="autoexpand tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                v-model="universitysPartner.universityPartnerCondition" placeholder="Partner Condition..."></textarea>
                            <label class="absolute tracking-wide py-2 px-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="Condition">Partner Condition...</label>
                        </div>
                    </div>
                    <div class="col-start-1 col-end-7">
                        <smart-tagz
                            editable
                            autosuggest
                            input-placeholder="Partner Speciality ..."
                            :sources= listOfSpeciality
                            :on-changed="logResult"
                            :allowPaste="{delimiter: ','}"
                            :allowDuplicates="false"
                            :max-tags="100"
                        />
                    </div>
                </div>
                <div class="w-full flex justify-between text-white">
                    <div>
                        <button @click="close" class="bg-red-500 rounded-xl px-5 py-1 mt-5 mr-2">Cancel</button>
                    </div>
                    <div>
                        <button @click="callNewPartner" type="button" class="bg-green-500 rounded-xl px-5 py-1 mt-5 mr-2">Send Partner</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { SmartTagz } from "smart-tagz";
    import "smart-tagz/dist/smart-tagz.css";
    import { defineComponent } from "vue";

    import {name} from '../../main.js'

    export default defineComponent ({
        name: "Basic",

        components:{
            SmartTagz,
        },

        props: ['universitysPartner', 'listOfSpeciality'],

        setup(props) {
            const logResult = (result) =>{
                props.universitysPartner.universityPartnerSpeciality = result
            };

            return {
                logResult,
            };
        },

        methods: {
            close(){
                this.$emit('close');
            },

            callNewPartner(){
                this.universitysPartner.universityPartnerDisplay = "True"
                this.universitysPartner.universityPartnerCreator = name
                this.universitysPartner.universityPartnerLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                this.$emit("addNewPartnerToUniversity")
                this.$emit('close');
            },
        }
    });

</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .8s ease-out;
    }

    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter-from{
        transform: translateY(20px);
        opacity: 0;
    } 
    
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>