<template>
    <div class="mt-14">
        <transition-group name="slide-fade">
            <!-- Waiting Dashboard -->
            <div v-if="!userConnected" class="w-full flex justify-center">
                <pulse-loader></pulse-loader>
            </div>
            <!-- Dashboard -->
            <div v-if="userConnected" class="w-full">
                <!-- Navigation -->
                <div class="w-full relative space-x-2 flex justify-center mb-10 font-bold text-xl">
                    
                    <button v-if="!generalUniversity && checkAdmin" @click="setGeneral">General</button>
                    <button v-if="checkAdmin && generalUniversity" @click="setGeneral">In Process</button>

                    <button v-if="!checkAdmin" @click="filterCreation('General')" :class="[ !yourCreationsFilter ? 'text-red-500 font-semibold' : 'text-white' ]">General</button>
                    <p v-if="!checkAdmin">|</p>
                    <button v-if="!checkAdmin" @click="filterCreation('Creation')" :class="[ !yourCreationsFilter ? 'text-white' : 'text-red-500 font-semibold' ]">Your Creations</button>
                </div>

                <!-- General/Your Creation -->
                <div v-if="!generalUniversity">
                    <notifications group="foo"/>
                    <div class="w-full relative py-2 px-3 flex justify-between">
                        <div class="flex">
                            <p v-if="message.message0" class=" rounded-full bg-transparent w-6 h-6 pb-1 text-center text-white border-white border-2">i</p>
                            <transition name="slide-fade" mode="out-in">
                                <p v-if="message.message0" class="text-white pl-2 pt-0.5">{{message.message1}}</p>
                            </transition>
                        </div>
                        <button v-if="yourCreationsFilter" @click="setCreateUniversity" class="Button text-white font-bold bg-red-500 rounded-3xl py-2 px-5">Add University</button>
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
                                                    Last Update
                                                </th>
                                                <th scope="col" class="relative px-4 py-3">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <UET class="bg-gray-200" 
                                            v-for="(university, index) in universitySend"
                                            :key="index"
                                            :university="university"
                                            :admin="checkAdmin"
                                            :herCreation="yourCreationsFilter"
                                            :listOfSpeciality="listOfSpeciality"
                                            ref="form"
                                            @deleteUniversity="removeUniversityByUser(index)"
                                            @deleteOfficialUniversity="removeOfficialUniversityByAdmin(index)"
                                            @addPartner="addPartnerByUser(index)"
                                            @sendData="updateEditedSpecificDataByUser(index)">
                                        </UET>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- In Process -->
                <div v-if="generalUniversity && checkAdmin">
                    <div class="w-full relative py-2 px-3 flex justify-between">
                        <div class="flex">
                            <p v-if="message.message0" class=" rounded-full bg-transparent w-6 h-6 pb-1 text-center text-white border-white border-2">i</p>
                            <transition name="slide-fade" mode="out-in">
                                <p v-if="message.message0" class="text-white pl-2 pt-0.5">{{message.message1}}</p>
                            </transition>
                        </div>
                        <button @click="setCreateUniversity" class="Button text-white font-bold bg-red-500 rounded-3xl py-2 px-5">Add University</button>
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
                                                Last Update
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
                                            :listOfSpeciality="listOfSpeciality"
                                            @removeTmpUniversity="removeUniversityInProcess(index)"
                                            @addPartnerEdited="addPartnerInProcess(index)"
                                            @modifyData="updateSpecificDataInProcess(index)"
                                            @sendDataToOfficial="moveDataToInProgressToOfficialSpecific(index)">
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
    <CUP 
        @created="setCreateUniversity" 
        @addNewUniversity="addNewUniversityInProcess"
        :listOfSpeciality="listOfSpeciality"
        v-if="createUniversityPopUp" 
        class="mx-auto flex flex-col">
    </CUP>
</template>

<script>
    import UET from './UniversityEditorTbody.vue'
    import UETT from './UniversityEditorTbodyTmp.vue'
    import CUP from './CreateUniversityPopUp.vue'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import firebase from 'firebase'
    import db from '../main.js'
    import {apps, name, grade} from '../main.js'

    export default {

        components:{
            UET,
            UETT,
            CUP,
            PulseLoader
        },
        
        data () {
            return {
                checkAdmin: false,
                generalUniversity: false,
                yourCreationsFilter: false,
                userConnected: false,
                createUniversityPopUp: false,
                listOfSpeciality: [],
                message:{
                    message0: true,
                    message1: "Any modification must be validated by an administrator before appearing officially.",
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
                        "universitySourceWebsiteLink": "",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
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
                        "universitySourceWebsiteLink": "",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
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
                        this.actualUser.username = snapshot.val().username
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
                    tmpForm.push(element.val())
                    if(tmpForm[tmpForm.length-1].universitySourceId == undefined){
                        tmpForm[tmpForm.length-1].universitySourceId = element.key
                    }
                })
            })
            
            await db.ref("universitysEdited").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    tmpEditedForm.push(element.val())
                })
            })

            var specialityPartener = [];

            tmpForm.forEach(el => {
                el.universitySourcerPartner.forEach(el2 => {
                    el2.universityPartnerSpeciality.forEach(el3 => {
                        if(el3 != "" && el3 != "N/A") {
                            specialityPartener.push(el3)
                        }
                    })
                })
            })

            tmpEditedForm.forEach(el => {
                el.universitySourcerPartner.forEach(el2 => {
                    el2.universityPartnerSpeciality.forEach(el3 => {
                        if(el3 != "" && el3 != "N/A") {
                            specialityPartener.push(el3)
                        }
                    })
                })
            })

            this.listOfSpeciality = [...new Set(specialityPartener)]
            
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
                        this.randomHelpedMessage()
                    },6000);
                })
            }
        },
        
        methods: {

            randomHelpedMessage(){
                var i = this.getRandomInt(4)

                this.message.message0 = false

                if (i == 0) {
                    this.message.message1 = "Any modification must be validated by an administrator before appearing officially."
                } else if (i == 1) {
                    this.message.message1 = "We thank you for your interest in this project and for your help in making it grow."
                }  else if (i == 2) {
                    this.message.message1 = "In the general section you will find all the currently validated universities."
                }  else if (i == 3) {
                    this.message.message1 = "In your creations section you will find all your creations validated or not by the administrators."
                }
                
                this.message.message0 = true
            },

            getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            },

            filterCreation: function(callFilter){
                console.log("filtreCreators")
                this.universitySend = [];
                var tmpUniversitySend = [];
                if(callFilter == "General") {
                    tmpUniversitySend = this.form
                    this.yourCreationsFilter = false
                } else {
                    this.yourCreationsFilter = true

                    this.form.forEach((el)=>{
                        if(el.universitySourceCreator == name){
                            tmpUniversitySend.push(el)
                        }
                    })

                    this.editedForm.forEach((el)=>{
                        el
                        if(el.universitySourceCreator == name){
                            tmpUniversitySend.push(el)
                        }
                    })
                }

                this.universitySend = [...new Set(tmpUniversitySend)]
            },

            setGeneral: function() {
                if(grade == "Admin"){
                    this.generalUniversity = !this.generalUniversity
                }
            },

            setCreateUniversity: function() {
                this.createUniversityPopUp = !this.createUniversityPopUp
            },

            //General function

            addUniversityInProcess() {
                console.log("addUniversityInProcess")
                //added a new University into evaluation process
                this.editedForm.push(
                    {
                        "universitySourceId": "",
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
                        "universitySourceAddress": "",
                        "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
                        "universitySourceWebsiteLink": "",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
                            }
                        ], 
                    }
                )
                //Updating data during the evaluation process
                this.updateSpecificDataInProcess(this.editedForm.length-1)
                //Check actual filter used
                if(this.yourCreationsFilter) {
                    //Update 'Your Creation' page
                    this.filterCreation('Creation')
                } else {
                    //Update 'General' page
                    this.filterCreation('General')
                }
                /*setTimeout(()=>{
                    this.$refs.form.openUniversityForm()
                    document.body.scrollTop = document.body.scrollHeight;
                },200)*/
            },

            addNewUniversityInProcess(newUniversity) {
                console.log("addUniversityInProcess")
                //added a new University into evaluation process
                this.editedForm.push(
                    {
                        "universitySourceId": newUniversity.universitySourceId,
                        "universitySourceName": newUniversity.universitySourceName,
                        "universitySourceCountry": newUniversity.universitySourceCountry,
                        "universitySourceCity": newUniversity.universitySourceCity,
                        "universitySourceAddress": newUniversity.universitySourceAddress,
                        "universitySourceImageLink": newUniversity.universitySourceImageLink,
                        "universitySourceWebsiteLink": newUniversity.universitySourceWebsiteLink,
                        "universitySourceDisplay": newUniversity.universitySourceDisplay,
                        "universitySourceCreator": newUniversity.universitySourceCreator,
                        "universitySourceLastUpdate": newUniversity.universitySourceLastUpdate,   
                        "universitySourcerPartner": newUniversity.universitySourcerPartner, 
                    }
                )
                //Updating data during the evaluation process
                this.updateSpecificDataInProcess(this.editedForm.length-1)
                //Check actual filter used
                if(this.yourCreationsFilter) {
                    //Update 'Your Creation' page
                    this.filterCreation('Creation')
                } else {
                    //Update 'General' page
                    this.filterCreation('General')
                }
                /*setTimeout(()=>{
                    this.$refs.form.openUniversityForm()
                    document.body.scrollTop = document.body.scrollHeight;
                },200)*/
            },

            writeUpdateData(datasource, uid, element){
                console.log("writeUpdateData")
                var up = {};
                up[datasource + uid] = element
                return db.ref().update(up);
            },

            writeUpdateDataHistory(datasource, uid, element){
                console.log("writeUpdateDataHistory")
                var up = {};
                up[datasource + uid + '/' + element.universitySourceLastUpdate] = element
                return db.ref().update(up);
            },

            //User function

            addPartnerByUser(index) {
                console.log("addPartnerByUser")
                //added a new partner in university into user list
                this.universitySend[index].universitySourcerPartner.push(
                    {
                        "universityPartnerName": "University Partner",
                        "universitySourceId": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
                        "universityPartnerAddress": "",
                        "universityPartnerWebsiteLink": "",
                        "universityPartnerCondition": "",
                        "universityPartnerDisplay": "True",
                        "universityPartnerCreator": name,
                        "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                        "universityPartnerSpeciality": [],
                    }
                )
                //Check actual filter used
                if(this.yourCreationsFilter) {
                    //Update 'Your Creation' page
                    this.filterCreation('Creation')
                } else {
                    //Update 'General' page
                    this.filterCreation('General')
                }
            },

            removeUniversityByUser(index) {
                console.log("removeUniversityByUser")
                //Check if user is on 'Your Creation' page
                if(this.yourCreationsFilter) {
                    for (let i = 0; i < this.editedForm.length; i++) {

                        if(this.universitySend[index].universitySourceId == this.editedForm[i].universitySourceId){
                            this.editedForm.splice(i, 1);
                            break;
                        }
                    }
                    //Remove university in firebase for In Process list
                    apps.database().ref('/universitysEdited/' + this.universitySend[index].universitySourceId).set(null)
                    //Update 'Your Creation' page
                    this.filterCreation('Creation')
                }
            },

            updateEditedSpecificDataByUser(index){
                console.log("updateEditedSpecificDataByUser")

                var testA = "";
                var up = {};

                if(this.universitySend[index].universitySourceId == "" || this.universitySend[index].universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    this.universitySend[index].universitySourceId = testA;
                    this.universitySend[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.universitySend[index].universitySourceCreator = name
                    this.universitySend[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + testA] = this.universitySend[index]
                } else {
                    this.universitySend[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.universitySend[index].universitySourceCreator = name
                    this.universitySend[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + this.universitySend[index].universitySourceId] = this.universitySend[index]
                }

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/Dashboard')
                        this.$toast.success(`Your changes has been sent successfully.`);
                        this.$toast.info(`All changes will have to be validated to appear.`);
                        setTimeout(this.$toast.clear, 10000)
                    }
                )
            },

            //Admin function

            addPartnerInProcess(index) {
                console.log("addPartnerInProcess")
                //added a new partner in university into evaluation process
                this.editedForm[index].universitySourcerPartner.push(
                    {
                        "universityPartnerName": "University Partner",
                        "universitySourceId": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
                        "universityPartnerAddress": "",
                        "universityPartnerWebsiteLink": "",
                        "universityPartnerCondition": "",
                        "universityPartnerDisplay": "True",
                        "universityPartnerCreator": name,
                        "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                        "universityPartnerSpeciality": [],
                    }
                )
            },

            removeOfficialUniversityByAdmin(index) {
                console.log("removeOfficialUniversityByAdmin")
                for (let i = 0; i < this.form.length; i++) {
                    if(this.universitySend[index].universitySourceId == this.form[i].universitySourceId){
                        //Remove university in firebase for In Process list
                        apps.database().ref('/universitys/' + this.universitySend[index].universitySourceId).set(null)
                        apps.database().ref('/universityHistory/' + this.universitySend[index].universitySourceId).set(null)
                        apps.database().ref('/universitysEdited/' + this.universitySend[index].universitySourceId).set(null)
                        this.form.splice(i, 1);
                        break;
                    }
                }
                //Update 'Your Creation' page
                this.filterCreation('General')
            },

            removeUniversityInProcess(index) {
                console.log("removeUniversityInProcess")
                //Remove university in firebase for In Process list
                apps.database().ref('/universitysEdited/' + this.editedForm[index].universitySourceId).set(null)
                this.editedForm.splice(index, 1);
            },

            addAllDataInOfficialBase(){
                console.log("addAllDataInOfficialBase")

                var testA = "";
                var up = {};

                if(this.form.length <= 0){
                    up['/universitys/'] = this.form
                    return db.ref().update(up);
                } else {
                    for (let index = 0; index < this.form.length; index++) {
                        if(this.form[index].universitySourceId == "" || this.form[index].universitySourceId == undefined) {
                            //If the university has not yet been associated with its unique id the search and record it.
                            testA = db.ref().child('universitys').push().key;
                            this.form[index].universitySourceId = testA;
                            //Add university changes in official database
                            this.writeUpdateData('/universitys/', testA, this.form[index])
                            //Adds university changes to its modification history
                            this.writeUpdateDataHistory('/universityHistory/', testA, this.form[index])
                        } else {
                            this.writeUpdateData('/universitys/', this.form[index].universitySourceId, this.form[index])
                            //Adds university changes to its modification history
                            this.writeUpdateDataHistory('/universityHistory/', this.form[index].universitySourceId, this.form[index])
                        }
                    }
                }
            },

            addAllDataInInProcessBase(){
                console.log("addAllDataInInProcessBase")

                var testA = "";
                var up = {};

                if(this.editedForm.length <= 0){
                    up['/universitysEdited/'] = this.editedForm
                    return db.ref().update(up);
                } else {
                    for (let index = 0; index < this.editedForm.length; index++) {
                        if(this.editedForm[index].universitySourceId == "" || this.editedForm[index].universitySourceId == undefined) {
                            //If the university has not yet been associated with its unique id the search and record it.
                            testA = db.ref().child('universitys').push().key;
                            this.editedForm[index].universitySourceId = testA;
                            //Add university changes in process database
                            this.writeUpdateData('/universitysEdited/', testA, this.editedForm[index])
                        } else {
                            //Add university changes in process database
                            this.writeUpdateData('/universitysEdited/', this.editedForm[index].universitySourceId, this.editedForm[index])
                        }
                    }
                }
            },

            updateSpecificDataInProcess(index){
                console.log("updateEditedSpecificData")

                var testA = "";
                var up = {};

                if(this.editedForm[index].universitySourceId == "" || this.editedForm[index].universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    this.editedForm[index].universitySourceId = testA;
                    this.editedForm[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.editedForm[index].universitySourceCreator = name
                    this.editedForm[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + testA] = this.editedForm[index]
                } else {
                    this.editedForm[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.editedForm[index].universitySourceCreator = name
                    this.editedForm[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + this.editedForm[index].universitySourceId] = this.editedForm[index]
                }

                return db.ref().update(up);
            },

            moveDataToInProgressToOfficialSpecific(dex){
                console.log("moveDataToInProgressToOfficialSpecific")
                let count = 0;

                for (let index2 = 0; index2 < this.form.length; index2++) {
                    //Check if the university is in the online base to update it
                    if(this.editedForm[dex].universitySourceId === this.form[index2].universitySourceId){
                        this.form[index2] = this.editedForm[dex]
                        count = 0;
                        break;
                    } else {
                        count++
                    }
                }
                //If the university is not present in the list of the online base
                if(count == this.form.length){
                    this.form.push(this.editedForm[dex])
                }
                //Remove the university from the list in progress
                this.editedForm.splice(dex, 1)
                //Updates the list of the official database
                this.addAllDataInOfficialBase()
                //Updated the list of the database under study
                this.addAllDataInInProcessBase()
            },

            //Under consideration
            updateOfficialSpecificData(index){
                console.log("updateOfficialSpecificData")
                var testA = "";
                var up = {};

                if(this.form[index].universitySourceId == "" || this.form[index].universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    this.form[index].universitySourceId = testA;
                    this.form[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.form[index].universitySourceCreator = name
                    this.form[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + testA] = this.form[index]
                    this.editedForm.push(this.form[index])
                } else {
                    this.form[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.form[index].universitySourceCreator = name
                    this.form[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + this.form[index].universitySourceId] = this.form[index]
                    this.editedForm.push(this.form[index])
                }

                return db.ref().update(up);
            },
        },
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