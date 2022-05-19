<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {},
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