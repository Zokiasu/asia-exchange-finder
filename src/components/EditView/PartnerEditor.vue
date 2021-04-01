<template>
    <div class="bg-gray-700 rounded font-bold grid grid-cols-1 gap-1 text-xs 4xl:text-base w-full p-3 mt-5 lg:mt-0 lg:mx-2">
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full pb-3 text-lg">
                <label>Partner Editor</label>
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner Name*</label>
                <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                id="universitySourceName" v-model="partner.universityPartnerName" type="text" placeholder="Name">
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner Address</label>
                <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                id="universitySourceName" v-model="partner.universityPartnerAddress" type="text" placeholder="Address">
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner Country*</label>
                <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                id="universitySourceName" v-model="partner.universityPartnerCountry" type="text" placeholder="Country">
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner City*</label>
                <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                id="universitySourceName" v-model="partner.universityPartnerCity" type="text" placeholder="City">
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner Website*</label>
                <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                id="universitySourceName" v-model="partner.universityPartnerWebsiteLink" type="text" placeholder="Website Link">
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner Academic Cycle</label>
                <ul class="bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4 flex py-2 px-4">
                    <li class="mr-5 space-x-1 font-semibold" v-for="(universityCycle, index) in universityCycle" v-bind:key="index">
                        <input :id="universityCycle" :value="universityCycle" name="universityCycle" type="checkbox" v-model="partner.universityPartnerCycle"/>
                        <label :for="universityCycle">{{universityCycle}}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-wrap col-start-1 col-end-7">
            <div class="w-full">
                <label for="universitySourceName">Partner Condition</label>
                <textarea class="autoexpand h-40 tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                    v-model="partner.universityPartnerCondition" placeholder="Partner Requirement"></textarea>
            </div>
        </div>
        <div class="w-full col-start-1 col-end-7">
            <label for="universitySourceName">Partner Majors</label>
            <smart-tagz
                class="bg-gray-500 text-black"
                editable
                autosuggest
                input-placeholder="Majors ..."
                :defaultTags="partner.universityPartnerSpeciality"
                :sources="listOfSpeciality"
                :on-changed="logResult"
                :allowPaste="{delimiter: ','}"
                :allowDuplicates="false"
                :max-tags="100"
            />
        </div>
        <button @click="validEditNewPartner" class="Button bg-green-500 hover:bg-blue-500 col-start-1 col-end-7 rounded p-2 my-2 block">Validated this partner</button>
        <button @click="closeEditNewPartner" class="Button bg-red-500 hover:bg-red-700 col-start-1 col-end-7 rounded p-2 block">Cancel partner edition</button>
    </div>
</template>

<script>
    import db from '../../main.js'
    import {apps, name, grade} from '../../main.js'

    import { SmartTagz } from "smart-tagz";
    import "smart-tagz/dist/smart-tagz.css";
    import { defineComponent } from "vue";
    
    import MethodsGeneral from '../../Mixins/firebase'

    export default defineComponent ({
        name: "Basic",
        mixins:[MethodsGeneral],
        props: ['university', 'universityPartner', 'listOfSpeciality'],

        components:{
            SmartTagz,
        },

        data(){
            return {
                id: this.$route.query.id,
                hello:'',
                universityCycle: ["Bachelor", "Master", "Doctorate/PhD"],
                partner:{}
            }
        },

        setup(props) {
            const logResult = (result) =>{
                props.universityPartner.universityPartnerSpeciality = result
            };
            return {
                logResult,
            };
        },

        async created(){
            MethodsGeneral.methods.copyPartnerObject(this.partner, this.universityPartner)
        },

        methods:{
            validEditNewPartner(){
                var count = 0
                this.partner.universityPartnerSpeciality = this.universityPartner.universityPartnerSpeciality
                var tmpPartner = this.partner
                if(!this.university.universitySourcerPartner) {
                    this.university.universitySourcerPartner = [this.partner]
                    MethodsGeneral.methods.copyPartnerObject(this.universityPartner, this.partner)
                } else if(this.partner.universityPartnerName != undefined || this.partner.universityPartnerName != ""){
                    this.university.universitySourcerPartner.forEach(function(element){
                        if(element.universityPartnerCreator == tmpPartner.universityPartnerCreator
                        && element.universityPartnerLastUpdate == tmpPartner.universityPartnerLastUpdate) {
                            MethodsGeneral.methods.copyPartnerObject(element, tmpPartner)
                        } else {
                            count++
                        }
                    })
                    if(count == this.university.universitySourcerPartner.length){
                        this.university.universitySourcerPartner.push(this.partner)
                    }

                    MethodsGeneral.methods.copyPartnerObject(this.universityPartner, this.partner)
                }
                this.$emit('closeEditNewPartner')
            },

            closeEditNewPartner(){
                this.partner = MethodsGeneral.methods.newPartnerObject()
                this.$emit('closeEditNewPartner')
            },
        },
    })
</script>
