<template>
    <div>
        <p>Hello {{ $route.query.id }}</p>
    </div>
</template>

<script>
export default {
    setup() {
        
    },

    data(){
      return {
          
      }
    },

    mounted(){
        console.log(this.$route.query.id)
    },

    methods:{

    },
}
</script>