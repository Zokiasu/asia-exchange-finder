<template>
    <div class="absolute mx-auto justify-center items-center min-h-screen w-full flex flex-wrap content-center">
        <div class="mx-auto flex justify-center items-center w-full ">
            <div class="p-5 bg-white text-black rounded-xl">
                <div class="font-bold grid grid-cols-2 gap-2">
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceName" v-model="university.universitySourceName" type="text" placeholder="University Name">
                            <label for="universitySourceName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Name</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceAddress" v-model="university.universitySourceAddress" type="text" placeholder="University Address">
                            <label for="universitySourceAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Address</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceCountry" v-model="university.universitySourceCountry" type="text" placeholder="Country">
                            <label for="universitySourceCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Country</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceCity" v-model="university.universitySourceCity" type="text" placeholder="City">
                            <label for="universitySourceCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">City</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceImageLink" v-model="university.universitySourceImageLink" type="url" placeholder="Link University Picture">
                            <label for="universitySourceImageLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Link University Picture</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceWebsiteLink" v-model="university.universitySourceWebsiteLink" type="url" placeholder="Website Link">
                            <label for="universitySourceWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Website Link</label>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-between text-white">
                    <div>
                        <button @click="close" class="bg-red-500 rounded-xl px-5 py-1 mt-5 mr-2">Cancel</button>
                    </div>
                    <div>
                        <button @click="callNewUniversity" type="button" class="bg-green-500 rounded-xl px-5 py-1 mt-5 mr-2">Send University</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {name} from '../../main.js'

    export default {
        data() {
            return {
                "university": {
                    "universitySourceId": "",
                    "universitySourceName": "",
                    "universitySourceCountry": "",
                    "universitySourceCity": "",
                    "universitySourceAddress": "",
                    "universitySourceImageLink": "",
                    "universitySourceWebsiteLink": "",
                    "universitySourceDisplay": "False",
                    "universitySourceCreator": name,
                    "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                    "universitySourcerPartner": [], 
                }
            }
        },

        methods: {
            close(){
                this.$emit('close');
            },

            callNewUniversity(){
                this.$emit("addNewUniversity", this.university)
                this.$emit('close');
            },
        }
    }

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