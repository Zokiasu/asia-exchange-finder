<template>    
    <div class="flex flex-wrap content-center justify-center lg:col-start-2 lg:col-end-7">
        <div class="w-full pt-10 lg:pt-0 lg:px-5 py-1 mb-2 text-xl justify-start">
            <h5 class="font-semibold">Image</h5>
        </div>
        <div class="font-bold grid grid-cols-1 gap-1 text-xs 4xl:text-base w-full lg:px-5">
            <div v-if="university.universitySourceImageLink" class="flex flex-wrap col-start-1 col-end-7">
                <div class="w-7/12 bg-gray-500 rounded p-0.5 shadow">
                    <img class="h-full w-full object-cover object-center" v-lazy="university.universitySourceImageLink" alt="">
                </div>
            </div>
            <div class="flex flex-wrap col-start-1 col-end-7">
                <div class="w-full space-y-3 pt-5">
                    <label for="universitySourceName">Image Link</label>
                    <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-500 border border-gray-500 rounded focus:outline-none focus:border-red-700 focus:border-4" 
                    id="University Picture Link" v-model="university.universitySourceImageLink" type="text" placeholder="University Picture Link">
                </div>
            </div>
        </div>
        <div class="w-full pt-5 justify-end space-x-1.5 flex text-sm 4xl:text-base">
            <button @click="sendUniversity" class="Button bg-green-500 rounded my-3 px-2 block">Send</button>
            <button @click="cancelUniversity" class="bg-transparent my-3 px-2 hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded">Cancel</button>
        </div>
    </div>
</template>

<script>
    import MethodsGeneral from '../../Mixins/firebase'

    export default {
        mixins:[MethodsGeneral],
        props: ['university'],

        data(){
            return {
                id: this.$route.query.id,
                hello:"",
                univ:{}
            }
        },

        created(){
            MethodsGeneral.methods.copyUniversityObject(this.univ, this.university)
        },

        methods:{
            sendUniversity(){
                this.$emit('sendUniversity')
            },
            cancelUniversity(){
                this.$emit('cancelUniversity')
            },
        },
    }
</script>