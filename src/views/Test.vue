<template>
    <div class="space-x-2 mr-3 ms:mr-10 mt-6">
      <button @click="setVisibleSignUp" class="bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Test</button>
      {{modelCity}}
    </div>
</template>

<script>
    import db from '../main.js'
    import Firebase from '../Mixins/firebase.js'

    export default {
        name: "Basic",
        mixins:[Firebase],

        data () {
            return {
                modelCity:'gg',
            }
        },

        methods: {

            linkify(text) {
                var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                return text.replace(urlRegex, function(url) {
                    return '<a href="' + url + '">' + url + '</a>';
                });
            },

            setVisibleSignUp: function() {
                this.modelCity = this.linkify("Hello dear how are you https://www.nautiljon.com/ go into https://www.google.fr/")
                console.log(this.modelCity)
                Firebase.methods.logCreateUniversity("Hello","Dear")
            },
        },
    }
</script>
