<template>
    <div class="mt-10 mx-auto flex justify-center items-cente w-full h-full">
        <div class="p-5 bg-gray-900 bg-opacity-70 mx-10 w-full space-y-5">
            <span class="text-2xl font-bold">University Name</span>
            <div class="grid grid-cols-1 lg:grid-cols-4">
                <div>
                    <ul>
                        <li @click="routerLink('information')" class="w-full h-full py-2 border-b-2 border-white border-opacity-70 font-semibold cursor-pointer">
                            <span>Information</span>
                        </li>
                        <li @click="routerLink('partner')" class="py-2 border-b-2 border-white border-opacity-70 font-semibold cursor-pointer">
                            <span>Partner</span>
                        </li>
                        <li @click="routerLink('image')" class="py-2 border-b-2 border-white border-opacity-70 font-semibold cursor-pointer">
                            <span>Image</span>
                        </li>
                    </ul>
                </div>
                <transition-group name="slide-fade">
                    <router-view @sendUniversity="sendUniversity" @cancelUniversity="cancelUniversity" v-if="visible" :university="university"/>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import db from '../main.js'
    import {apps, name, grade} from '../main.js'

    export default {

        data(){
            return {
                visible: false,

                id: this.$route.query.id,
                statut: this.$route.query.statut,

                hello:"",
                university: {},
            }
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        if(snapshot.val().grade != "Admin") {
                            this.$toast.error(`You are not authorized to access this page.`, {position:"top", duration: 10000, max:3});
                            this.$router.replace('/')
                        }
                    })
                } else {
                    this.$toast.error(`You are not authorized to access this page.`, {position:"top", duration: 10000, max:3});
                    this.$router.replace('/')
                }
            })
        },

        async mounted(){
            var univObject = {
                universitySourceId: '',
                universitySourceName: '',
                universitySourceAddress: '',
                universitySourceCountry: '',
                universitySourceCity: '',
                universitySourceImageLink: '',
                universitySourceWebsiteLink: '',
                universitySourceDisplay: '',
                universitySourceCreator: '',
                universitySourceMoreInfo: '',
                universitySourceContributors: [],
                universitySourceLastUpdate: '',
                universitySourcerPartner: []
            }
            var ids = this.$route.query.id

            if(this.$route.query.id != undefined){
                if(this.$route.query.statut) {
                    await db.ref("universitys").once("value", function(snapshot){
                        snapshot.forEach(function(element){
                            if(ids === element.val().universitySourceId){
                                univObject = element.val()
                            }
                        })
                    }).then(() => {
                        this.university = univObject
                        this.visible = !this.visible;
                    })
                } else {
                    await db.ref("universitysEdited").once("value", function(snapshot){
                        snapshot.forEach(function(element){
                            if(ids === element.val().universitySourceId){
                                univObject = element.val()
                            }
                        })
                    }).then(() => {
                        this.university = univObject
                        this.visible = !this.visible;
                    })
                }
            } else {
                this.university = univObject
                this.visible = !this.visible;
            }
        },

        methods:{
            sendUniversity(){
                console.log("sendUniversity")
                console.log(this.university)
            },
            cancelUniversity(){
                console.log("cancelUniversity")
            },
            routerLink(page){
                if(page == "information") {
                    this.$router.push({path: '/test/informations', query:{id: this.$route.query.id, statut: this.$route.query.statut}})
                }
                else if(page == "partner") {
                    this.$router.push({path: '/test/partners', query:{id: this.$route.query.id, statut: this.$route.query.statut}})
                }
                else if(page == "image") {
                    this.$router.push({path: '/test/image', query:{id: this.$route.query.id, statut: this.$route.query.statut}})
                }
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