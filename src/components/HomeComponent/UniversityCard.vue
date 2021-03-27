<template>
    <div class="Card h-60 mx-5 ms:mx-auto text-xs md:text-md 4xl:text-lg text-black hover:text-blue-600" @click="openCard(university.universitySourceName, university.universitySourceId)">
        <div class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-full">
            <button class="Button bg-blue-500 rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">More Info</button>
            <p class="absolute w-full bg-white bg-opacity-80 p-5 bottom-0 block">
                {{ university.universitySourceName }}
            </p>
            <img class="h-full w-full object-cover object-center" v-lazy="university.universitySourceImageLink" alt="">
        </div>
    </div>
</template>

<script>
    import {analytics} from '../../main.js'

export default {
    name: 'university',
    props: ['university', 'index'],
    

        data () {
            return {
                random:'',
            }
        },

    created(){
        this.random = Math.round(Math.random()*1000)
    },
    
    methods: {
        openCard(nameUniversity, idUniversity) {
            analytics.logEvent({nameUniversity}, {nameUniversity})
            this.$emit('onClick', idUniversity)
        }
    }
}
</script>