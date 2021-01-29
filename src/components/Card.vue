<template>
    <div @click="openCard(university.universitySourceName)" class="w-full">
        <div class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-full">
            <button class="Button bg-blue-500 rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">More Info</button>
            <p class="absolute w-full bg-white bg-opacity-80 p-5 bottom-0 block text-black hover:text-blue-600 font-semibold text-lg">
                {{ university.universitySourceName }}
            </p>
            <img class="h-full w-full object-cover object-center" v-bind:src="university.universitySourceImageLink" alt="">
        </div>
    </div>
</template>

<script>
    import {analytics} from '../main.js'

export default {
    name: 'university',
    props: ['university'],

    components:{
        
    },
    created() {
        this.$emit('created');
    },
    
    methods: {
        openCard(nameUniversity) {
            console.log(nameUniversity)
            analytics.logEvent("showUniversity", {value: nameUniversity})
            this.$emit('onClick', nameUniversity)
        }
    }
}
</script>