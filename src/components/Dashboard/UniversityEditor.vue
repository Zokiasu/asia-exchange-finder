<template>
    <div class="mt-14">
        <transition-group name="slide-fade">
            <!-- Waiting Dashboard -->
            <div v-if="!userConnected" class="flex justify-center">
                <pulse-loader></pulse-loader>
            </div>
            <!-- Dashboard -->
            <div v-if="userConnected" class="w-full">
                <!-- In Process -->
                <div v-if="checkAdmin">
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
                                <v-pagination v-if="numberPageTmp => 0" class="bg-white flex justify-center"
                                    v-model="page"
                                    :pages="numberPageTmp"
                                    :range-size="1"
                                    active-color="#DCEDFF">
                                </v-pagination>
                                <p v-if="numberPageTmp < 0" class="bg-white flex justify-center text-black py-2">No university has been edited for the moment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import db from '../../main.js'
    import {apps, name, grade} from '../../main.js'
    
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import VPagination from "vue3-pagination"
    import "vue3-pagination/dist/vue3-pagination.css"
    import Multiselect from '@vueform/multiselect'

    import UETT from '../Dashboard/UniversityEditorTbodyTmp.vue'

    export default {

        components:{
            UETT,
            PulseLoader,
            VPagination,
            Multiselect
        },
        
        data () {
            return {
                page: 1,
                numberPage: 1,
                numberPageTmp: 1,
                checkAdmin: false,
                generalUniversity: false,
                yourCreationsFilter: false,
                userConnected: false,
                createUniversityPopUp: false,
                listOfSpeciality: [],
                listOfUniversityName: [],
                modelUniversityName:'',
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
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
                                "universityPartnerCycle": [],
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
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
                                "universityPartnerCycle": [],
                            }
                        ], 
                    }
                ]
            }
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.actualUser.username = snapshot.val().username
                        this.actualUser.userGrade = snapshot.val().grade
                        if(this.actualUser.userGrade == "Admin") {
                            this.userConnected = true
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
            var listUniversityNameTmp = [];

            tmpForm.forEach(el => {
                listUniversityNameTmp.push(el.universitySourceName)
                if(el.universitySourcerPartner){
                    el.universitySourcerPartner.forEach(el2 => {
                        if(el2.universityPartnerSpeciality != undefined){
                            for (let index = 0; index < el2.universityPartnerSpeciality.length; index++) {
                                specialityPartener.push(el2.universityPartnerSpeciality[index])
                            }
                        }
                    })
                }

            })

            tmpEditedForm.forEach(el => {
                listUniversityNameTmp.push(el.universitySourceName)
                if(el.universitySourcerPartner){
                    el.universitySourcerPartner.forEach(el2 => {
                        if(el2.universityPartnerSpeciality != undefined) {
                            for (let index = 0; index < el2.universityPartnerSpeciality.length; index++) {
                                specialityPartener.push(el2.universityPartnerSpeciality[index])
                            }
                        }
                    })
                }
            })

            this.listOfSpeciality = [...new Set(specialityPartener)]
            this.listOfUniversityName = [...new Set(listUniversityNameTmp)]
            this.listOfUniversityName.splice(0,1)
            
            this.form = tmpForm
            this.editedForm = tmpEditedForm
            this.form.splice(0,1)
            this.editedForm.splice(0,1)
            this.universitySend = this.form
            this.numberPage = Math.round(this.universitySend.length/9)
            this.numberPageTmp = Math.round(this.editedForm.length/9)
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

        watch: {
            modelUniversityName: function(val){
                var tmp = '';
                tmp = this.listOfUniversityName[val]
                if(tmp == null) {
                    this.universitySend = this.form
                    this.numberPage = Math.round(this.universitySend.length/9)
                } else {
                    this.universitySend = this.form.filter(
                        (el) => {
                            return (el.universitySourceName.toLowerCase() === tmp.toLowerCase())
                        }
                    )
                    this.numberPage = 1
                }
            },
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
                this.universitySend = [];
                var tmpUniversitySend = [];
                var listUniversityNameTmp = [];

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
                        if(el.universitySourceCreator == name){
                            tmpUniversitySend.push(el)
                        }
                    })
                }

                tmpUniversitySend.forEach(el => {
                    listUniversityNameTmp.push(el.universitySourceName)
                })

                this.universitySend = [...new Set(tmpUniversitySend)]
                this.listOfUniversityName = [...new Set(listUniversityNameTmp)]
                this.numberPage = Math.round(this.universitySend.length/9)
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
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
                                "universityPartnerCycle": [],
                            }
                        ], 
                    }
                )
                this.numberPageTmp = Math.round(this.editedForm.length/9)
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
                this.numberPageTmp = Math.round(this.editedForm.length/9)
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
                var up = {};
                up[datasource + uid] = element
                return db.ref().update(up);
            },

            writeUpdateDataHistory(datasource, uid, element){
                var up = {};
                up[datasource + uid + '/' + element.universitySourceLastUpdate] = element
                return db.ref().update(up);
            },

            //User function

            addPartnerByUser(index) {
                //added a new partner in university into user list                
                if(!this.universitySend[index].universitySourcerPartner) {
                    this.universitySend[index].universitySourcerPartner = 
                        [
                            {
                                "universityPartnerName": "University Partner",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
                                "universityPartnerCycle": [],
                            }
                        ]
                } else {
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
                            "universityPartnerCycle": [],
                        }
                    )
                }
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
                //Check if user is on 'Your Creation' page
                if(this.yourCreationsFilter) {
                    for (let i = 0; i < this.editedForm.length; i++) {

                        if(this.universitySend[index].universitySourceId == this.editedForm[i].universitySourceId){
                            this.editedForm.splice(i, 1);
                            this.numberPageTmp = Math.round(this.editedForm.length/9)
                            break;
                        }
                    }
                    //Remove university in firebase for In Process list
                    apps.database().ref('/universitysEdited/' + this.universitySend[index].universitySourceId).set(null)
                    //Update 'Your Creation' page
                    this.filterCreation('Creation')
                    this.$router.replace('/Dashboard')
                    this.$toast.error('University successfully deleted')
                    setTimeout(this.$toast.clear, 10000)
                }
            },

            updateEditedSpecificDataByUser(index){
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
                        this.$toast.success(`Your changes has been successfully added in "In Progress" list for a validation.`);
                        this.$toast.info(`Thank you for your help in improving our database.`);
                        setTimeout(this.$toast.clear, 10000)
                    }
                )
            },

            //Admin function

            addPartnerInProcess(index) {
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
                        "universityPartnerCycle": [],
                    }
                )
            },

            removeOfficialUniversityByAdmin(index) {
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
                //Remove university in firebase for In Process list
                apps.database().ref('/universitysEdited/' + this.editedForm[index].universitySourceId).set(null)
                this.editedForm.splice(index, 1);
                this.numberPageTmp = Math.round(this.editedForm.length/9)
            },

            addAllDataInOfficialBase(){
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

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/Dashboard')
                        this.$toast.success(`Your changes has been sent successfully.`);
                        this.$toast.info(`Thank you for your help in improving our database.`);
                        setTimeout(this.$toast.clear, 10000)
                    }
                )
            },

            moveDataToInProgressToOfficialSpecific(dex){
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
                this.removeUniversityInProcess(dex)
                //Updates the list of the official database
                this.addAllDataInOfficialBase()
                //Updated the list of the database under study
                this.addAllDataInInProcessBase()
            },

            //Under consideration
            updateOfficialSpecificData(index){
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
                    this.numberPageTmp = Math.round(this.editedForm.length/9)
                } else {
                    this.form[index].universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.form[index].universitySourceCreator = name
                    this.form[index].universitySourceDisplay = "False"
                    up['/universitysEdited/' + this.form[index].universitySourceId] = this.form[index]
                    this.editedForm.push(this.form[index])
                    this.numberPageTmp = Math.round(this.editedForm.length/9)
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
        transition: all .8s ease-in-out;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        width: 0;
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