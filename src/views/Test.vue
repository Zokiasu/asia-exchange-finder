<template>
    <div>
        <p>Hello {{ id }}</p>
    </div>
</template>

<script>
export default {
    setup() {
        
    },

    data(){
      return {
          id: this.$route.query.id
      }
    },

    mounted(){
        console.log(this.$route.query.id)
    },

    methods:{

    },
}
</script>