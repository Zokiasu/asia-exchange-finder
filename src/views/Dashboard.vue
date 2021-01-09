<template>
    <div class="bg-black bg-opacity-30 h-screen text-white absolute inset-x-0 top-0 flex flex-col">

        <h1 class="font-bold text-center mt-20 ms:mt-28 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Asia Exchange Finder</h1>

        <UniversityEditor class=" mt-40"/>

    </div>
</template>

<script>
    import UniversityEditor from '../components/UniversityEditor.vue'
    import db from '../main.js'

    export default {
        components: {
            UniversityEditor
        },

        data () {
            return {

            }
        },
        
        methods: {

        }
    }
</script>

<style>

</style>