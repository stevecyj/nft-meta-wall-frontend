<template>
  <div v-if="isLoading" class="loading-container">
    <div class="bouncing__loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
  name: 'Loading',
  components: {
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters['ui/isLoading']);

    return {
      isLoading
    };
  }
});
</script>

<style lang="scss" scoped>
</style>