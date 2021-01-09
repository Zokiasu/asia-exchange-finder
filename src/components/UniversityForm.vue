<template>
    <div class="my-12">
        <form id="login-form" class="mx-10 lg:mx-40 xl:mx-64 2xl:mx-96 px-5 pt-1 pb-5 rounded-xl bg-gray-400 bg-opacity-70 text-black" v-for="(source,a) in form" :key="a">
            <h2 class="w-full my-2 text-3xl leading-tight font-bold">University form</h2>
            <!-- University Source -->
            <div class="space-y-5 font-bold mb-5">
                <div class="flex flex-wrap mb-6">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="universitySourceName" v-model="source.universitySourceName" type="text" placeholder="University Name">
                        <label for="universitySourceName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Name</label>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="universitySourceCountry" v-model="source.universitySourceCountry" type="text" placeholder="Country">
                        <label for="universitySourceCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Country</label>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="universitySourceCity" v-model="source.universitySourceCity" type="text" placeholder="City">
                        <label for="universitySourceCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">City</label>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="universitySourceAddress" v-model="source.universitySourceAddress" type="text" placeholder="Address">
                        <label for="universitySourceAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Address</label>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="universitySourceImageLink" v-model="source.universitySourceImageLink" type="link" placeholder="Image Link">
                        <label for="universitySourceImageLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Image Link</label>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="universitySourceWebsiteLink" v-model="source.universitySourceWebsiteLink" type="link" placeholder="Website Link">
                        <label for="universitySourceWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Website Link</label>
                    </div>
                </div>
            </div>
            <!-- Partner Form -->
            <div class="bg-gray-600 bg-opacity-70 rounded px-5 pb-5 pt-1" v-for="(partner,b) in source.universitySourcerPartner" :key="b">
                <h2 class="w-full my-2 text-3xl leading-tight font-bold">Partner form</h2>
                <div class="flex flex-wrap">
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" v-model="partner.universityPartnerName" id="universityPartnerName" placeholder="University Name">
                        <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="universityPartnerName">University Name</label>
                    </div>
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" v-model="partner.universityPartnerCountry" id="universityPartnerCountry" placeholder="Country">
                        <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="universityPartnerCountry">Country</label>
                    </div>
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" v-model="partner.universityPartnerAddress" id="universityPartnerAddress" placeholder="Address">
                        <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="universityPartnerAddress">Address</label>
                    </div>
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="text" v-model="partner.universityPartnerCity" id="universityPartnerCity" placeholder="City">
                        <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="universityPartnerCity">City</label>
                    </div>
                    <div class="relative w-full appearance-none label-floating">
                        <input class="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        type="link" v-model="partner.universityPartnerWebsiteLink" id="universityPartnerWebsiteLink" placeholder="Website Link">
                        <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="universityPartnerWebsiteLink">Website Link</label>
                    </div>
                    <div class="relative w-full appearance-none label-floating mb-2">
                        <div class="" v-for="(speciality,k) in partner.universityPartnerSpeciality" :key="k">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            type="text" v-model="speciality.specialityName" id="specialityName" placeholder="Speciality">
                            <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="speciality">Speciality</label>
                            <span class="">
                                <button class="text-green-500 text-sm mr-2" @click="addSpeciality(k, partner, b)" v-show="k == partner.universityPartnerSpeciality.length-1">Add Speciality</button>
                                <span class="mr-2" v-show="k == partner.universityPartnerSpeciality.length-1 && partner.universityPartnerSpeciality.length > 1">|</span>
                                <button class="text-red-500 text-sm" @click="removeSpeciality(k, partner, b)" v-show="k || ( !k && partner.universityPartnerSpeciality.length > 1)">Remove Speciality</button>
                            </span>
                        </div>
                    </div>
                    <div class="relative w-full appearance-none label-floating">
                        <textarea class="autoexpand tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                        v-model="partner.universityPartnerCondition" @input="resize($event)" placeholder="Condition..."></textarea>
                        <label class="absolute tracking-wide py-2 px-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="Condition">Condition...</label>
                    </div>
                </div>

                <span>
                    <button class="text-white bg-blue-500 rounded-xl px-5 py-1 mt-5 mr-2" @click="addPartner(b, source)" v-show="b == source.universitySourcerPartner.length-1">Add Partner</button>
                    <span class="mr-2" v-show="b == source.universitySourcerPartner.length-1 && source.universitySourcerPartner.length > 1">|</span>
                    <button class="text-white bg-red-500 rounded-xl px-5 py-1 mt-5" @click="removePartner(b, source)" v-show="b || ( !b && source.universitySourcerPartner.length > 1)">Remove Partner</button>
                </span>
            </div>
            <!-- Bouton Send -->
            <div class="w-full mt-5">
                <div v-if="errorMessage !== ''" class="" role="alert">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage !== ''" class="" role="alert">
                    {{ successMessage }}
                </div>
                <button @click="sendData" v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="text-white font-bold bg-green-500 rounded-3xl p-2 w-full">
                    <span v-if="! xhrRequest">Send</span>
                    <span v-if="xhrRequest">Please Wait...</span>
                </button>
                <div v-if="xhrRequest" class="" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import db from '../main.js'

    export default {

        async created(){
            var num;
            await db.ref("universitys").once("value", function(snapshot){
                num = snapshot.numChildren();
            })
            this.numberChildOnDatabase = num
        },

        async updated(){
            var num;
            await db.ref("universitys").once("value", function(snapshot){
                num = snapshot.numChildren();
            })
            this.numberChildOnDatabase = num
        },

        data () {
            return {
                numberChildOnDatabase: 0,
                xhrRequest: false,
                errorMessage: "",
                successMessage: "",

                "form": [
                    {
                        "universitySourceName": "",
                        "universitySourceCountry": "",
                        "universitySourceCity": "",
                        "universitySourceAddress": "",
                        "universitySourceImageLink": "",
                        "universitySourceWebsiteLink": "",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": "Anonymous",
                        "universitySourceLastUpdate": new Date().toLocaleDateString(),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerSpeciality": [
                                    {
                                        "specialityName": ""
                                    }
                                ],
                            }
                        ], 
                    }
                ]
            }
        },
        
        methods: {

            resize(e){
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
            },

            async befores(){
                var num;
                await db.ref("universitys").once("value", function(snapshot){
                    num = snapshot.numChildren();
                })

                return num
            },

            sendData(){
                this.xhrRequest = true;
                this.errorMessage = "";
                this.successMessage = "";

                db.ref().child("universitys").push(this.form[0]).then (    
                    () => {
                        this.$router.replace('/Dashboard')
                        this.xhrRequest = false;
                    }, 
                    (error) => {
                        this.errorMessage = error.message;
                        this.xhrRequest = false;
                    }
                )
            },

            addPartner(index, source) {
                source.universitySourcerPartner.push(
                    {
                        "universityPartnerName": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
                        "universityPartnerAddress": "",
                        "universityPartnerWebsiteLink": "",
                        "universityPartnerCondition": "",
                        "universityPartnerSpeciality": [
                            {
                                "specialityName": ""
                            }
                        ],
                    }
                )
            },
            removePartner(index, source) {
                source.universitySourcerPartner.splice(index, 1);
            },

            addSpeciality(index, partner, parentIndex) {
                partner.universityPartnerSpeciality.push({ "specialityName": "" });
            },
            removeSpeciality(index, partner, parentIndex) {
                partner.universityPartnerSpeciality.splice(index, 1);
            }
        }
    }
</script>

<style>
  /* RED BORDER ON INVALID INPUT */
  .check input:invalid {
      border-color: red;
  }

  /* FLOATING LABEL */
  .label-floating input:not(:placeholder-shown),
  .label-floating textarea:not(:placeholder-shown) {
      padding-top: 1.4rem;
  }
  .label-floating input:not(:placeholder-shown) ~ label,
  .label-floating textarea:not(:placeholder-shown) ~ label {
      font-size: 0.8rem;
      transition: all 0.2s ease-in-out;
      color: #1f9d55;
      opacity: 1;
  }

</style>