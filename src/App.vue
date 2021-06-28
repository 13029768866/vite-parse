<template>
  <Login />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Login from '_views/sys/login/Login.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Login,
    },
    setup() {
      return {};
    },
  });
</script>

<style></style>
