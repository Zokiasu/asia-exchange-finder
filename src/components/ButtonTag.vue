<template>
    <div class="space-x-2 space-y-2">
        <button v-for="tag in universityTag" :vid-id="tag" :key="tag" class="inline-block px-4 py-1 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 
        rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-blue-900">
            {{tag}}
        </button>
    </div>
</template>

<script>
  export default {
    name: 'universityTag',
    props: ['universityTag'],
  };
</script>
