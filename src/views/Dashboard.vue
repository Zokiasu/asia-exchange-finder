<template>
    <div></div>
    <UniversityEditor/>
</template>

<script>
    import db from '../main.js'
    import {apps} from '../main.js'

    import UniversityEditor from '../components/UniversityEditor.vue'

    export default {
        components: {
            UniversityEditor
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        if(snapshot.val().grade != "Admin") {
                            this.$toast.error(`You are not authorized to access the dashboard page.`, {position:"top", max:3});
                            setTimeout(this.$toast.clear, 10000)
                            this.$router.replace('/')
                        }
                    })
                } else {
                    this.$toast.error(`You are not authorized to access the dashboard page.`, {position:"top", max:3});
                    setTimeout(this.$toast.clear, 10000)
                    this.$router.replace('/')
                }
            })
        },
    }
</script>

<style>

</style>