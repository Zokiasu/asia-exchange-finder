<template>
<div class="mt-14">
    <transition-group name="slide-fade">
        <div v-if="!userConnected" class="w-full flex justify-center">
            <pulse-loader></pulse-loader>
        </div>
        <div v-if="userConnected" class="w-full">
            <div class="w-full relative space-x-2 flex justify-center mb-10 font-bold text-xl">
                <button v-if="!generalUniversity && checkAdmin" @click="setGeneral">General</button>
                <button v-if="checkAdmin && generalUniversity" @click="setGeneral">In Process</button>
                <button class="focus:text-red-600" v-if="!checkAdmin" @click="filterCreation('General')">General</button>
                <p v-if="!checkAdmin">|</p>
                <button class="focus:text-red-600" v-if="!checkAdmin" @click="filterCreation('creation')">Your Creations</button>
            </div>
            <div v-if="!generalUniversity">
                <notifications group="foo"/>
                <div class="w-full relative py-2 px-3 flex justify-between">
                    <div class="flex">
                        <p v-if="!checkAdmin && message.message0" class=" rounded-full bg-transparent w-6 h-6 pb-1 text-center text-white border-white border-2">i</p>
                        <transition name="slide-fade" mode="out-in">
                            <p v-if="message.message0" class="text-white pl-2 pt-0.5">{{message.message1}}</p>
                        </transition>
                    </div>
                    <!--<button v-if="checkAdmin" @click="updateFormData()" class="Button bg-blue-500 rounded-3xl">Modify all data</button>-->
                    <button @click="addUniversity()" class="Button text-white font-bold bg-red-500 rounded-3xl py-2 px-5">Add University</button>
                </div>
                <div class="flex flex-col mb-20">
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
                                            Edited
                                        </th>
                                        <th scope="col" class="relative px-4 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>
                                    <UET v-for="(university, index) in universitySend"
                                        :key="index"
                                        :university="university"
                                        :admin="checkAdmin"
                                        @myEvents="removeUniversityFromForm(index)"
                                        @addPartner="adPartner(index)"
                                        @sendData="updateFormSpecificData(index)">
                                    </UET>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="generalUniversity && checkAdmin">
                <!--<div class="w-full relative py-2 px-3 flex space-x-2 justify-start">
                    <button v-if="checkAdmin" @click="updateEditedFormData()" class="Button bg-blue-500 rounded-3xl">Modify all data</button>
                    <button v-if="checkAdmin" @click="moveEditedToOfficial()" class="Button bg-green-500 rounded-3xl">Send all data</button>
                </div>-->
                <div class="flex flex-col mb-20">
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
                                            Edited
                                        </th>
                                        <th scope="col" class="relative px-4 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>
                                    <UETT v-for="(university, index) in editedForm"
                                        :key="index"
                                        :university="university"
                                        :admin="checkAdmin"
                                        @myEvents="removeUniversityFromTmp(index)"
                                        @addPartner="adPartner(index)"
                                        @modifyData="updateEditedFormSpecificData(index)"
                                        @sendDataToOfficial="moveEditedToOfficialSpecific(index)">
                                    </UETT>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition-group>
</div>
</template>

<script>
    import UET from './UniversityEditorTbody.vue'
    import UETT from './UniversityEditorTbodyTmp.vue'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import firebase from 'firebase'
    import db from '../main.js'
    import {apps, name, grade} from '../main.js'
    import { ssrContextKey } from 'vue'

    export default {

        components:{
            UET,
            UETT,
            PulseLoader
        },
        

        data () {
            return {
                numberChildOnDatabase: 0,
                xhrRequest: false,
                errorMessage: "",
                successMessage: "",
                nameFilter: "",
                checkAdmin: false,
                generalUniversity: false,
                userConnected: false,
                message:{
                    message0: true,
                    message1: "When display is set to false the information is being processed.",
                },
                actualUser:{
                    username: name,
                    userGrade: grade,
                },
                "universitySend": [],

                "form": [
                    {
                        "universitySourceId": "",
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
                        "universitySourceAddress": "",
                        "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
                        "universitySourceWebsiteLink": "#",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toLocaleDateString(),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "#",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "False",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toLocaleDateString(),  
                                "universityPartnerSpeciality": [
                                    {
                                        "specialityName": ""
                                    }
                                ],
                            }
                        ], 
                    }
                ],

                "editedForm": [
                    {
                        "universitySourceId": "",
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
                        "universitySourceAddress": "",
                        "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
                        "universitySourceWebsiteLink": "#",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toLocaleDateString(),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "#",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "False",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toLocaleDateString(),  
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

        async beforeCreate(){
            await firebase.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.userConnected = true
                        this.actualUser.username = snapshot.val().pseudo
                        this.actualUser.userGrade = snapshot.val().grade
                        if(this.actualUser.userGrade == "Admin") {
                            this.checkAdmin = true
                        }
                    })
                }
            })
        },

        async created(){
            var tmpForm = this.form
            var tmpEditedForm = this.editedForm
            
            await db.ref("universitys").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    //console.log(element.key)
                    tmpForm.push(element.val())
                    if(tmpForm[tmpForm.length-1].universitySourceId == undefined){
                        tmpForm[tmpForm.length-1].universitySourceId = element.key
                        console.log(tmpForm[tmpForm.length-1].universitySourceId)
                    }
                })
            })
            
            await db.ref("universitysEdited").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    tmpEditedForm.push(element.val())
                })
            })
            this.form = tmpForm
            this.editedForm = tmpEditedForm
            this.form.splice(0,1)
            this.editedForm.splice(0,1)
            this.universitySend = this.form
        },

        mounted: function () {
            if(grade != "Admin") {
                this.$nextTick(function () {
                    window.setInterval(() => {
                        this.selectMessage()
                    },6000);
                })
            }
        },
        
        methods: {
            selectMessage(){
                var i = this.getRandomInt(3)
                console.log(i)

                this.message.message0 = false

                if(i == 0) {
                    this.message.message1 = "When display is set to false the information is being processed."
                } else if (i == 1) {
                    this.message.message1 = "Any modification must first be validated by an administrator before appearing officially."
                } else if (i == 2) {
                    this.message.message1 = "We thank you for your interest in the project and for your help in making it grow."
                } 
                
                this.message.message0 = true
            },

            getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            },

            updateFormData(){
                let v = this;
                v.xhrRequest = true;
                v.errorMessage = "";
                v.successMessage = "";

                var testA = "";
                
                var up = {};
                console.log(this.form.length)
                if(this.form.length <= 0){
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
                } else {
                    for (let index = 0; index < this.form.length; index++) {
                        
                        if(this.form[index].universitySourceId == "" || this.form[index].universitySourceId == undefined) {
                            testA = db.ref().child('universitys').push().key;
                            this.form[index].universitySourceId = testA;
                            this.writeUpdateData('/universitys/', testA, this.form[index])
                        } else {
                            this.writeUpdateData('/universitys/', this.form[index].universitySourceId, this.form[index])
                        }

                        //db.ref().update(up);
                    }
                }
            },

            updateFormSpecificData(index){
                let v = this;
                v.xhrRequest = true;
                v.errorMessage = "";
                v.successMessage = "";

                var testA = "";

                var up = {};

                if(this.form[index].universitySourceId == "" || this.form[index].universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    this.form[index].universitySourceId = testA;
                    this.form[index].universitySourceLastUpdate = new Date().toLocaleDateString()
                    this.form[index].universitySourceCreator = name
                    this.form[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + testA] = this.form[index]
                    this.editedForm.push(this.form[index])
                } else {
                    this.form[index].universitySourceLastUpdate = new Date().toLocaleDateString()
                    this.form[index].universitySourceCreator = name
                    this.form[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + this.form[index].universitySourceId] = this.form[index]
                    this.editedForm.push(this.form[index])
                }

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/Dashboard')
                        v.xhrRequest = false;
                        this.$toast.success(`Your changes has been sent successfully.`);
                        this.$toast.info(`All changes will have to be validated to appear.`);
                        setTimeout(this.$toast.clear, 10000)
                    }, 
                    (error) => {
                        v.errorMessage = error.message;
                        v.xhrRequest = false;
                    }
                )
            },

            updateEditedFormData(){
                let v = this;
                v.xhrRequest = true;
                v.errorMessage = "";
                v.successMessage = "";

                var testA = "";
                
                var up = {};

                if(this.editedForm.length <= 0){
                    up['/universitysEdited/'] = this.editedForm
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
                } else {
                    for (let index = 0; index < this.editedForm.length; index++) {
                        
                        if(this.editedForm[index].universitySourceId == "" || this.editedForm[index].universitySourceId == undefined) {
                            testA = db.ref().child('universitys').push().key;
                            this.editedForm[index].universitySourceId = testA;
                            //up['/universitysEdited/' + testA] = this.editedForm[index]
                            this.writeUpdateData('/universitysEdited/', testA, this.editedForm[index])
                        } else {
                            //up['/universitysEdited/' + this.editedForm[index].universitySourceId] = this.editedForm[index]
                            this.writeUpdateData('/universitysEdited/', this.editedForm[index].universitySourceId, this.editedForm[index])
                        }

                        //db.ref().update(up);
                    }
                }
            },

            writeUpdateData(datasource, uid, element){
                var up = {};
                up[datasource + uid] = element
                return db.ref().update(up).then (
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

            updateEditedFormSpecificData(index){
                let v = this;
                v.xhrRequest = true;
                v.errorMessage = "";
                v.successMessage = "";

                var testA = "";

                var up = {};

                if(this.editedForm[index].universitySourceId == "" || this.editedForm[index].universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    this.editedForm[index].universitySourceId = testA;
                    this.editedForm[index].universitySourceLastUpdate = new Date().toLocaleDateString()
                    this.editedForm[index].universitySourceCreator = name
                    this.editedForm[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + testA] = this.editedForm[index]
                } else {
                    this.editedForm[index].universitySourceLastUpdate = new Date().toLocaleDateString()
                    this.editedForm[index].universitySourceCreator = name
                    this.editedForm[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + this.editedForm[index].universitySourceId] = this.editedForm[index]
                }

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

            moveEditedToOfficial(){
                let count = 0;
                for (let index = 0; index < this.editedForm.length; index++) {
                    if(this.editedForm[index].universitySourceDisplay == "True") {
                        for (let index2 = 0; index2 < this.form.length; index2++) {
                            if(this.editedForm[index].universitySourceId === this.form[index2].universitySourceId){
                                this.form[index2] = this.editedForm[index]
                            } else {
                                count++
                            }
                        }
                        if(count == this.form.length){
                            this.moveEditedToOfficialSpecific(index)
                        }
                    }
                }
            },

            moveEditedToOfficialSpecific(dex){
                let count = 0;

                for (let index2 = 0; index2 < this.form.length; index2++) {
                    if(this.editedForm[dex].universitySourceId === this.form[index2].universitySourceId){
                        this.form[index2] = this.editedForm[dex]
                        count = 0
                    } else {
                        count++
                    }
                }

                if(count == this.form.length){
                    this.form.push(this.editedForm[dex])
                }
                this.editedForm.splice(dex, 1)
                this.updateFormData()
                this.updateEditedFormData()
            },

            addUniversity() {
                this.form.push(
                    {
                        "universitySourceId": "",
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
                        "universitySourceAddress": "",
                        "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
                        "universitySourceWebsiteLink": "#",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toLocaleDateString(),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "#",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "False",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toLocaleDateString(),  
                                "universityPartnerSpeciality": [
                                    {
                                        "specialityName": ""
                                    }
                                ],
                            }
                        ], 
                    }
                )
                this.updateFormSpecificData(this.form.length-1)

            },

            adPartner(index) {
                this.form[index].universitySourcerPartner.push(
                    {
                        "universityPartnerName": "University Partner",
                        "universitySourceId": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
                        "universityPartnerAddress": "",
                        "universityPartnerWebsiteLink": "#",
                        "universityPartnerCondition": "",
                        "universityPartnerDisplay": "False",
                        "universityPartnerCreator": name,
                        "universityPartnerLastUpdate": new Date().toLocaleDateString(),  
                        "universityPartnerSpeciality": [
                            {
                                "specialityName": ""
                            }
                        ],
                    }
                )
            },

            removeUniversityFromForm(index) {
                this.form.splice(index, 1);
                this.updateFormData()
            },

            removeUniversityFromTmp(index) {
                this.editedForm.splice(index, 1);
                this.updateEditedFormData()
            },

            filterCreation: function(callFilter){
                console.log("Call filterCreation")
                this.universitySend = [];
                if(callFilter == "General") {
                    this.universitySend = this.form
                } else {
                    this.form.forEach((el)=>{
                        if(el.universitySourceCreator == name){
                            this.universitySend.push(el)
                        }
                    })

                    this.editedForm.forEach((el)=>{
                        if(el.universitySourceCreator == name){
                            this.universitySend.push(el)
                        }
                    })
                }

                this.universitySend = [...new Set(this.universitySend)]
            },

            setGeneral: function() {
                console.log("Call setGeneral")
                if(grade == "Admin"){
                    this.generalUniversity = !this.generalUniversity
                }
            },
        }
    }
</script>

<style>

    .slide-fade-enter-active {
    transition: all .8s;
    }
    .slide-fade-leave-active {
    transition: all .8s;
    opacity: 0;
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateZ(0px) translateX(-10px);
    opacity: 0;
    }

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