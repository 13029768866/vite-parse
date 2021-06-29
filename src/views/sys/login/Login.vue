<template>
  <div :class="prefixCls" class="relative w-full h-full px-4 bg-green-100"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Login',
    components: {},
    setup() {
      return {};
    },
  });
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-login';
</style>
