<template>
  <router-view v-if="isRouterAlive" />
</template>

<script>
import { defineComponent, ref, nextTick, provide } from 'vue';
export default defineComponent({
  name: 'App',
  components: {},
  setup(props) {
    // 局部组件刷新
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };

    provide('reload', reload);

    return {
      isRouterAlive,
    };
  },
});
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Baloo+Da+2&family=Noto+Sans+TC:wght@400;700&family=Paytone+One&display=swap');

* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

#app {
  position: relative;
  width: 100%;
}
</style>