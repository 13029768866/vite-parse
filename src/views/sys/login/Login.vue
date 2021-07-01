<template>
  <div class="ranger-login relative w-full min-w-1280 h-full px-4 bg-green-100">
    <div class="contianer relative h-full py-2 border-4 md:border-black sm:border-white">
      <div class="flex h-full">
        <div class="flex justify-center pl-4 mr-4 my-auto border border-red-900 xl:w-6/12">
          <img
            class="w-1/2 rounded-full cursor-pointer -enter-x"
            src="@/assets/svg/goodness.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
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
  .ranger {
    &-login {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-left: -48%;
        background-image: url('@/assets/svg/login-bg.svg');
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: auto 100%;
      }
    }
  }
</style>
