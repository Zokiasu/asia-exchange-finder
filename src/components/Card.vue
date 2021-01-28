<template>
    <div class="w-full">
        <div class="bg-white rounded-lg overflow-hidden shadow relative h-full">
            <button @click="openCard(university.universitySourceName)" class="Button bg-blue-500 rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">More Info</button>
            <img class="h-56 w-full object-cover object-center" v-bind:src="university.universitySourceImageLink" alt="">
            <div class="p-4 h-auto">
                <p class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg">
                    {{ university.universitySourceName }}
                </p>
            </div>
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