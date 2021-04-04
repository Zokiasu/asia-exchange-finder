<template>
    <!-- Normal -->
    <div v-if="!removeView" class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-60    ">
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
            <p v-if="universitySource.universitySourceDisplay == 'False'" class="text-red-500 font-semibold text-lg">
                {{ universitySource.universitySourceCreator }}
            </p>
        </div>
        <img class="h-full w-full object-cover object-center" v-lazy="universitySource.universitySourceImageLink" alt="">
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

            removeUniversityCall() {
                this.$emit('removeUniversitySource')
                this.openRemove()
            },

            openEditor(){
                this.$router.push({path: '/edit/informations', query:{id: this.universitySource.universitySourceId, statut: this.universitySource.universitySourceDisplay}})
            },

            openRemove(){
                this.removeView = !this.removeView
            }
        }
    }
</script>