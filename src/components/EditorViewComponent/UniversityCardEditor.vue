<template>
    <!-- Normal -->
    <div v-if="!editorView && !removeView" class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-60    ">
        <div class="absolute space-x-1.5 right-2 flex  text-xs xl:text-sm 4xl:text-base">
            <button v-if="(grade === 'Admin') || (username === universitySource.universitySourceCreator && universitySource.universitySourceDisplay === 'False')"  @click="openRemove" class="Button bg-red-500 rounded-3xl my-2 px-2 right-28 block">Delete</button>
            <button @click="openEditor()" class="Button bg-green-700 rounded-3xl my-2 px-2 right-52 block">Edit</button>
            <button @click="openCard()" class="Button bg-blue-500 rounded-3xl my-2 px-2 right-0 block shadow-2xl">More Info</button>
        </div>
        <p v-if="universitySource.universitySourceDisplay == 'True'" class="bg-green-500 p-2 px-3 font-semibold text-lg text-white absolute left-0 rounded-br-md">Online</p>
        <p v-if="universitySource.universitySourceDisplay == 'False'" class="bg-red-500 p-2 px-3 font-semibold text-lg text-white absolute left-0 rounded-br-md">In progress</p>
        <div class="absolute p-5 bottom-0 w-full bg-white bg-opacity-80 flex justify-between">
            <p class="text-black hover:text-blue-600 font-semibold text-lg">
                {{ universitySource.universitySourceName }}
            </p>
            <p v-if="username === universitySource.universitySourceCreator" class="text-red-500 font-semibold text-lg">
                {{ universitySource.universitySourceCreator }}
            </p>
        </div>
        <img class="h-full w-full object-cover object-center" v-lazy="universitySource.universitySourceImageLink" alt="">
    </div>
    <!-- Edition -->
    <div v-else-if="editorView" class="bg-white rounded-lg overflow-hidden shadow-2xl relative flex flex-wrap content-center justify-center">
        <div class="z-40 w-full px-5 py-1 text-base xl:text-xl justify-start">
            <p class="text-black font-semibold">{{universitySource.universitySourceName}}</p>
        </div>
        <div class="font-bold grid grid-cols-1 gap-1 text-xs 4xl:text-base text-black w-full px-5">
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceName" v-model="university.universitySourceName" type="text" :placeholder="universitySource.universitySourceName">
                    <label for="universitySourceName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Name</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceAddress" v-model="university.universitySourceAddress" type="text" :placeholder="universitySource.universitySourceAddress">
                    <label for="universitySourceAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Address</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7 md:col-span-3">
                <div class="relative w-full appearance-none label-floating">
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceCountry" v-model="university.universitySourceCountry" type="text" :placeholder="universitySource.universitySourceCountry">
                    <label for="universitySourceCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Country</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7 md:col-span-3">
                <div class="relative w-full appearance-none label-floating">
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceCity" v-model="university.universitySourceCity" type="text" :placeholder="universitySource.universitySourceCity">
                    <label for="universitySourceCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">City</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceImageLink" v-model="university.universitySourceImageLink" type="url" :placeholder="universitySource.universitySourceImageLink">
                    <label for="universitySourceImageLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Link University Picture</label>
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="relative w-full appearance-none label-floating">
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="universitySourceWebsiteLink" v-model="university.universitySourceWebsiteLink" type="url" :placeholder="universitySource.universitySourceWebsiteLink">
                    <label for="universitySourceWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Website Link</label>
                </div>
            </div>
        </div>
        <div class="z-50 space-x-1.5 right-5 flex text-xs xl:text-sm 4xl:text-base">
            <button @click="resetUniversityInfo()" class="Button bg-blue-500 rounded-3xl my-3 px-2 block">Reset</button>
            <button @click="openEditor()" class="Button bg-red-500 rounded-3xl my-3 px-2 block">Cancel</button>
            <button @click="updateUniversity()" class="Button bg-green-500 rounded-3xl my-3 px-2 block">Send</button>
        </div>
    </div>
    <!-- Delete -->
    <div v-else-if="removeView" class="bg-white border-red-500 border-4 rounded-lg overflow-hidden shadow-2xl relative flex flex-wrap content-center justify-center">
        <div class="z-50 absolute space-x-1.5 right-5 flex text-xs xl:text-sm 4xl:text-base">
            <button @click="openRemove()" class="Button bg-red-500 rounded-3xl my-3 px-2 block">Cancel</button>
            <button @click="removeUniversityCall()" class="Button bg-green-500 rounded-3xl my-3 px-2 block">Confirm</button>
        </div>
        <p class="text-red-500 text-center font-bold text-lg 2xl:text-xl 4xl:text-2xl">Are you sure you want to delete {{universitySource.universitySourceName}}?</p>
    </div>
</template>

<script>
    import {apps, name} from '../../main.js'
    import db from '../../main.js'

    export default {
        props: ['universitySource'],

        data() {
            return {
                username:'',
                grade:'',
                editorView: false,
                removeView: false,
                "university": {
                    "universitySourceId": "",
                    "universitySourceName": "",
                    "universitySourceCountry": "",
                    "universitySourceCity": "",
                    "universitySourceAddress": "",
                    "universitySourceImageLink": "",
                    "universitySourceWebsiteLink": "",
                    "universitySourceDisplay": "",
                    "universitySourceCreator": "",
                    "universitySourceMoreInfo": "",
                    "universitySourceContributors": [],
                    "universitySourceLastUpdate": "",   
                    "universitySourcerPartner": [], 
                },
            }
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.username = snapshot.val().username
                        this.grade = snapshot.val().grade
                    })
                }
            })
        },
        
        methods: {
            openCard() {
                this.$emit('openUniversity')
            },

            resetUniversityInfo() {
                this.university.universitySourceId = ""
                this.university.universitySourceName = ""
                this.university.universitySourceCountry = ""
                this.university.universitySourceCity = ""
                this.university.universitySourceAddress = ""
                this.university.universitySourceImageLink = ""
                this.university.universitySourceWebsiteLink = ""
                this.university.universitySourceDisplay = "False"
                this.university.universitySourceCreator = name
                this.university.universitySourceMoreInfo = ""
                this.university.universitySourceContributors = ""
                this.university.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                this.university.universitySourcerPartner = ""
            },

            updateUniversity(){
                if (this.university.universitySourceId == "") {this.university.universitySourceId = this.universitySource.universitySourceId}
                if (this.university.universitySourceName == "") {this.university.universitySourceName = this.universitySource.universitySourceName}
                if (this.university.universitySourceCountry == "") {this.university.universitySourceCountry = this.universitySource.universitySourceCountry}
                if (this.university.universitySourceCity == "") {this.university.universitySourceCity = this.universitySource.universitySourceCity}
                if (this.university.universitySourceAddress == "") {this.university.universitySourceAddress = this.universitySource.universitySourceAddress}
                if (this.university.universitySourceImageLink == "") {this.university.universitySourceImageLink = this.universitySource.universitySourceImageLink}
                if (this.university.universitySourceWebsiteLink == "") {this.university.universitySourceWebsiteLink = this.universitySource.universitySourceWebsiteLink}
                if (this.university.universitySourceMoreInfo == "") {this.university.universitySourceMoreInfo = this.universitySource.universitySourceMoreInfo}
                this.university.universitySourceDisplay = "False"
                this.university.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                                
                if(this.universitySource.universitySourceContributors != undefined) {
                    this.university.universitySourceContributors = this.universitySource.universitySourceContributors
                } else {
                    this.university.universitySourceContributors = []
                }

                if(this.universitySource.universitySourcerPartner != undefined) {
                    this.university.universitySourcerPartner = this.universitySource.universitySourcerPartner
                } else {
                    this.university.universitySourcerPartner = []
                }
                this.$emit('updateUniv', this.university)
                this.openEditor()
            },

            removeUniversityCall() {
                this.$emit('removeUniversitySource')
                this.openRemove()
            },

            openEditor(){
                this.$router.push({path: '/edit/informations', query:{id: this.universitySource.universitySourceId, statut: this.universitySource.universitySourceDisplay}})

                /*this.university = JSON.parse(JSON.stringify(this.universitySource))
                this.editorView = !this.editorView*/
            },

            openRemove(){
                this.removeView = !this.removeView
            }
        }
    }
</script>