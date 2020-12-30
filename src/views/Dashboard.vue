<template>
    <div class="my-12">

        <form @submit.prevent="loginRequest" id="login-form" class="mx-10 lg:mx-40 xl:mx-64 2xl:mx-96 p-10 rounded-xl border-black bg-gray-500 bg-opacity-50" v-for="(source,a) in form" :key="a">
            <!-- University Source -->
            <div class="space-y-5">
                <div class="grid grid-cols-1 gap-1">
                    <label class="ms:text-2xl font-bold" for="universitySourceName">University Name</label>
                    <input class="" type="text" v-model="source.universitySourceName" id="universitySourceName">
                </div>
                <div class="grid grid-cols-1 gap-1">
                    <label class="ms:text-2xl font-bold" for="universitySourceCountry">Country</label>
                    <input class="" type="text" v-model="source.universitySourceCountry" id="universitySourceCountry">
                </div>
                <div class="grid grid-cols-1 gap-1">
                    <label class="ms:text-2xl font-bold" for="universitySourceCity">City</label>
                    <input class="" type="text" v-model="source.universitySourceCity" id="universitySourceCity">
                </div>
                <div class="grid grid-cols-1 gap-1">
                    <label class="ms:text-2xl font-bold" for="universitySourceImageLink">Image Link</label>
                    <input class="" type="link" v-model="source.universitySourceImageLink" id="universitySourceImageLink">
                </div>
                <div class="grid grid-cols-1 gap-1">
                    <label class="ms:text-2xl font-bold" for="universitySourceWebsiteLink">Website Link</label>
                    <input class="" type="link" v-model="source.universitySourceWebsiteLink" id="universitySourceWebsiteLink">
                </div>
            </div>
            <p class="ms:text-2xl font-bold mt-5">Partner</p>
            <!-- University Partner -->
            <div class="bg-gray-600 bg-opacity-70 rounded p-3.5" v-for="(partner,b) in source.universitySourcerPartner" :key="b">

                <div class="space-y-2">
                    <div class="grid grid-cols-1 gap-1">
                        <label class="ms:text-xl font-bold" for="universityPartnerName">University Name</label>
                        <input class="" type="text" v-model="partner.universityPartnerName" id="universityPartnerName">
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <label class="ms:text-xl font-bold" for="universityPartnerCountry">Country</label>
                        <input class="" type="text" v-model="partner.universityPartnerCountry" id="universityPartnerCountry">
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <label class="ms:text-xl font-bold" for="universityPartnerCity">City</label>
                        <input class="" type="text" v-model="partner.universityPartnerCity" id="universityPartnerCity">
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <label class="ms:text-xl font-bold" for="universityPartnerWebsiteLink">Website Link</label>
                        <input class="" type="link" v-model="partner.universityPartnerWebsiteLink" id="universityPartnerWebsiteLink">
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <label class="ms:text-xl font-bold" for="speciality">Speciality</label>
                        <div class="form-group grid grid-cols-1 gap-1" v-for="(speciality,k) in partner.universityPartnerSpeciality" :key="k">
                            <input type="text" class="form-control" v-model="speciality.specialityName" id="specialityName">
                            <span class="">
                                <button class="text-blue-500 font-bold mr-2" @click="addSpeciality(k, partner, b)" v-show="k == partner.universityPartnerSpeciality.length-1">Add</button>
                                <span class="mr-2" v-show="k == partner.universityPartnerSpeciality.length-1 && partner.universityPartnerSpeciality.length > 1">|</span>
                                <button class="text-red-500 font-bold" @click="removeSpeciality(k, partner, b)" v-show="k || ( !k && partner.universityPartnerSpeciality.length > 1)">Remove</button>
                            </span>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <label class="ms:text-xl font-bold" for="Condition">Condition</label>
                        <!--<AppFormTextarea
                            name=""
                            v-model="partner.universityPartnerCondition"
                        />-->
                        <textarea v-model="partner.universityPartnerCondition" @input="resize($event)"></textarea>
                    </div>
                </div>

                <span>
                    <button class="text-white bg-blue-500 rounded-xl px-5 py-1 mt-5 font-bold mr-2" @click="addPartner(b, source)" v-show="b == source.universitySourcerPartner.length-1">Add Partner</button>
                    <span class="mr-2" v-show="b == source.universitySourcerPartner.length-1 && source.universitySourcerPartner.length > 1">|</span>
                    <button class="text-white bg-red-500 rounded-xl px-5 py-1 mt-5 font-bold" @click="removePartner(b, source)" v-show="b || ( !b && source.universitySourcerPartner.length > 1)">Remove Partner</button>
                </span>

            </div>
            <!-- Bouton Send -->
            <div class="w-full">
                <div v-if="errorMessage !== ''" class="mb-2" role="alert">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage !== ''" class="mb-2" role="alert">
                    {{ successMessage }}
                </div>
                <button @click="sendData" v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="text-white bg-green-500 rounded-3xl p-2 w-full font-bold">
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
    import AppFormTextarea from '../components/form/AppFormTextarea.vue'
    import db from '../main.js'
    
    export default {
        components: {
            AppFormTextarea
        },

        async created(){
            var num;
            await db.ref("universitys").once("value", function(snapshot){
                num = snapshot.numChildren();
            })
            this.numberChildOnDatabase = num
            console.log("created")
            console.log(this.numberChildOnDatabase)
        },

        async updated(){
            var num;
            await db.ref("universitys").once("value", function(snapshot){
                num = snapshot.numChildren();
            })
            this.numberChildOnDatabase = num
            console.log("updated")
            console.log(this.numberChildOnDatabase)
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
                        "universitySourceImageLink": "",
                        "universitySourceWebsiteLink": "",
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
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
                let v = this;

                v.xhrRequest = true;
                v.errorMessage = "";
                v.successMessage = "";

                console.log(this.form[0])
                var up = {}
                up['/universitys/' + this.numberChildOnDatabase] = this.form[0]
                return db.ref().update(up).then (    
                    () => {
                        this.$router.replace('/Dashboard')
                        v.xhrRequest = false;
                    }, 
                    (error) => {
                        v.errorMessage = error.message;
                        v.xhrRequest = false;
                    }
                )
            },

            addPartner(index, source) {
                source.universitySourcerPartner.push(
                    {
                        "universityPartnerName": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
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

</style>