<template>    
    <div class="flex flex-wrap lg:col-start-2 lg:col-end-7 mx-2">
        <div class="w-full pt-10 lg:pt-0 lg:px-3 py-1 text-xl justify-start">
            <h5 class="font-semibold">Partner</h5>
        </div>
        <component 
            :university="university"
            :universityPartner="universityPartner"
            @editPartner="function(a){editPartner(a)}"
            @closeEditNewPartner="closeEditNewPartner()"
            :is="currentComponent">
        </component>

        <button @click="newPartner()" v-if="currentComponent == 'ListPartnerEditor'" class="Button bg-gray-700 hover:bg-white hover:text-blue-500 w-full rounded mx-2 block">New partner</button>

        <div class="w-full pt-5 justify-end space-x-1.5 flex text-sm 4xl:text-base">
            <button @click="sendUniversity" class="Button bg-green-500 rounded my-3 px-2 block">Send</button>
            <button @click="cancelUniversity" class="bg-transparent my-3 px-2 hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded">Cancel</button>
        </div>
    </div>
</template>

<script>
    import VPagination from "vue3-pagination"
    import "vue3-pagination/dist/vue3-pagination.css"
    
    import ListPartnerEditor from './ListPartnerEditor.vue'
    import PartnerEditor from './PartnerEditor.vue'

    import MethodsGeneral from '../../Mixins/firebase'
    
    import db from '../../main.js'
    import {apps, name, grade} from '../../main.js'

    export default {
        mixins:[MethodsGeneral],

        components: {
            ListPartnerEditor,
            PartnerEditor,
            VPagination,
        },

        props: ['university'],

        data(){
            return {
                page: 1,
                numberPage: 1,
                numberPageTmp: 1,
                currentComponent:'ListPartnerEditor',

                id: this.$route.query.id,
                universityCycle: ["Bachelor", "Master", "Doctorate/PhD"],
                universityPartner:{},
                listOfSpeciality: [],
            }
        },

        async created(){
            var specialityPartener = []
            await db.ref("universitys").once("value", function(snapshot){
                snapshot.forEach(function(el){
                    el.forEach(function(element){                    
                        if(element.val().universitySourcerPartner){
                            element.val().universitySourcerPartner.forEach(function(element2){
                                if(element2.universityPartnerSpeciality){
                                    for (let index = 0; index < element2.universityPartnerSpeciality.length; index++) {
                                        specialityPartener.push(element2.universityPartnerSpeciality[index])
                                    }
                                }
                            })
                        }
                    })
                })
            }).then(async () => {
                await db.ref("universitysEdited").once("value", function(snapshot){
                    snapshot.forEach(function(el){
                        el.forEach(function(element){                    
                            if(element.val().universitySourcerPartner){
                                element.val().universitySourcerPartner.forEach(function(element2){
                                    if(element2.universityPartnerSpeciality){
                                        for (let index = 0; index < element2.universityPartnerSpeciality.length; index++) {
                                            specialityPartener.push(element2.universityPartnerSpeciality[index])
                                        }
                                    }
                                })
                            }
                        })
                    })
                }).then(() => {
                    this.listOfSpeciality = [...new Set(specialityPartener)]
                })
            })
        },

        methods:{
            sendUniversity(){
                this.$emit('sendUniversity')
            },
            cancelUniversity(){
                this.$emit('cancelUniversity')
            },

            newPartner(){
                this.universityPartner = MethodsGeneral.methods.newPartnerObject()
                this.currentComponent="PartnerEditor"
            },

            editPartner(partner){
                this.universityPartner = partner
                this.currentComponent="PartnerEditor"
            },

            closeEditNewPartner(){
                this.currentComponent="ListPartnerEditor"
            },
        },
    }
</script>