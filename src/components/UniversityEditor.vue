<template>
    <div class="w-full">
        <div class="w-full relative py-2 px-3 flex justify-between">
            <button @click="updateData()" class="Button">Send data</button>
            <button @click="addUniversity()" class="text-white font-bold bg-red-500 rounded-3xl py-2 px-5">Add University</button>
        </div>
        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="align-middle inline-block w-full">
                    <div class="shadow border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    University Name
                                </th>
                                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Localisation
                                </th>
                                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Display
                                </th>
                                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    By
                                </th>
                                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Update
                                </th>
                                <th scope="col" class="relative px-4 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                                </tr>
                            </thead>
                            <UET v-for="(university, index) in form"
                                :key="index"
                                :university="university"
                                @myEvents="removeUniversity(index)">
                            </UET>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import db from '../main.js'
    import UET from './UniversityEditorTbody.vue'

    export default {

        components:{
            UET
        },

        async created(){
            var num;
            var testuni = this.form
            var keyT

            await db.ref("universitys").once("value", function(snapshot){
                num = snapshot.numChildren();
                snapshot.forEach(function(element){
                    testuni.push(element.val())
                })
            })
            this.numberChildOnDatabase = num
            this.form = testuni
            this.form.splice(0,1)
        
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
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
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
                for (let index = 0; index < this.form.length; index++) {
                    db.ref("universitys").push(this.form[index]).then (    
                        () => {
                            this.$router.replace('/Dashboard')
                            this.xhrRequest = false;
                        }, 
                        (error) => {
                            this.errorMessage = error.message;
                            this.xhrRequest = false;
                        }
                    )                    
                }
            },

            updateData(){
                let v = this;
                v.xhrRequest = true;
                v.errorMessage = "";
                v.successMessage = "";
                var up = {}
                up['/universitys/'] = this.form
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

            addUniversity() {
                this.form.push(
                    {
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
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
                                "universityPartnerCreator": "Anonymous",
                                "universityPartnerSpeciality": [
                                    {
                                        "specialityName": ""
                                    }
                                ],
                            }
                        ], 
                    }
                )

            },

            removeUniversity(index) {
                this.form.splice(index, 1);
            },
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