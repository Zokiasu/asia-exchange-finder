<template>
    <div class="mt-10 mx-auto flex justify-center items-cente w-full h-full">
        <div class="p-5 text-white bg-gray-900 bg-opacity-70 mx-10 w-full space-y-5">
            <span v-if="univMainName" class="text-2xl font-bold">{{univMainName}}</span>
            <span v-else class="text-2xl font-bold">New University</span>
            <div class="grid grid-cols-1 lg:grid-cols-4">
                <div>
                    <ul>
                        <li @click="routerLink('information')" :class="$route.name !=='Informations' ? 'text-white' : 'text-red-700'" class="w-full h-full py-2 border-b-2 border-white border-opacity-70 font-semibold cursor-pointer">
                            <span>Information</span>
                        </li>
                        <li @click="routerLink('partner')" :class="$route.name !=='Partners' ? 'text-white' : 'text-red-700'" class="py-2 border-b-2 border-white border-opacity-70 font-semibold cursor-pointer">
                            <span>Partner</span>
                        </li>
                        <li @click="routerLink('image')" :class="$route.name !=='Image' ? 'text-white' : 'text-red-700'" class="py-2 border-b-2 border-white border-opacity-70 font-semibold cursor-pointer">
                            <span>Image</span>
                        </li>
                    </ul>
                    <button  @click="validUniversity" v-if="this.$route.query.statut == 'False'" class="Button bg-gray-700 hover:bg-green-500 w-full rounded my-5 block">Validated University</button>
                </div>
                <transition-group name="slide-fade">
                    <router-view @sendUniversity="sendUniversity" @cancelUniversity="cancelUniversity" v-if="visible" :university="university"/>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import db from '../../main.js'
    import {apps, name, grade} from '../../main.js'
    import MethodsGeneral from '../../Mixins/firebase'

    export default {
        mixins:[MethodsGeneral],

        data(){
            return {
                visible: false,
                newUniversity: false,

                id: this.$route.query.id,
                statut: this.$route.query.statut,

                hello:"",
                university: {},
                univMainName:"",
            }
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    //
                } else {
                    this.$toast.error(`You are not authorized to access this page. Please login to access it.`, {position:"top", duration: 10000, max:3});
                    this.$router.replace('/')
                }
            })
        },

        async created(){
            var univObject = {
                universitySourceId: '',
                universitySourceName: '',
                universitySourceAddress: '',
                universitySourceCountry: '',
                universitySourceCity: '',
                universitySourceImageLink: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                universitySourceWebsiteLink: '',
                universitySourceDisplay: 'False',
                universitySourceCreator: name,
                universitySourceMoreInfo: '',
                universitySourceContributors: [],
                universitySourceLastUpdate: new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),
                universitySourcerPartner: []
            }
            var ids = this.$route.query.id

            if(this.$route.query.id != undefined){
                if(this.$route.query.statut == "True") {
                    await db.ref("universitys").once("value", function(snapshot){
                        snapshot.forEach(function(element){
                            if(ids === element.val().universitySourceId){
                                univObject = element.val()
                            }
                        })
                    }).then(() => {
                        this.university = univObject
                        this.visible = !this.visible;
                        this.univMainName = this.university.universitySourceName
                    })
                } else if(this.$route.query.statut == "False") {
                    await db.ref("universitysEdited").once("value", function(snapshot){
                        snapshot.forEach(function(el){
                            el.forEach(function(element){
                                if(ids === element.val().universitySourceId){
                                    univObject = element.val()
                                }
                            })
                        })
                    }).then(() => {
                        this.university = univObject
                        this.visible = !this.visible;
                        this.univMainName = this.university.universitySourceName
                    })
                }
            } else {
                this.university = univObject
                this.visible = !this.visible;
                this.newUniversity = !this.newUniversity
                this.univMainName = this.university.universitySourceName
            }
        },

        methods:{
            sendUniversity(){
                this.university.universitySourceDisplay = "False"
                MethodsGeneral.methods.addUniversityToFrebase(this.university)
                this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 5000, max:3});
                this.$toast.success(`Your university has been successfully added in "In Progress" list for a validation.`, {position:"top", duration: 3000, max:3});
                this.$router.push({path: '/editorview'})
            },

            cancelUniversity(){
                this.$router.push({path: '/editorview'})
            },

            validUniversity(){
                MethodsGeneral.methods.validUniversity(this.university)
                this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 5000, max:3});
                this.$router.push({path: '/editorview'})
            },
            
            routerLink(page){
                if(page == "information") {
                    this.$router.push({path: '/edit/informations', query:{id: this.$route.query.id, statut: this.$route.query.statut}})
                }
                else if(page == "partner") {
                    this.$router.push({path: '/edit/partners', query:{id: this.$route.query.id, statut: this.$route.query.statut}})
                }
                else if(page == "image") {
                    this.$router.push({path: '/edit/image', query:{id: this.$route.query.id, statut: this.$route.query.statut}})
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