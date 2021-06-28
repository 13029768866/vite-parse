<template>
  <div class="relative w-full h-full px-4 bg-green-100">
    <pre>{{ tmp }}</pre>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  export default defineComponent({
    name: 'Login',
    components: {},
    setup() {
      let tmp = ref({});
      onMounted(() => {
        const { pkg } = __APP_INFO__;
        tmp.value = pkg;
      });
      return {
        tmp,
      };
    },
  });
</script>

<style scoped lang="less"></style>
