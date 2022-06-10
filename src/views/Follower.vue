<template>
  <div>
    <div class="block-title">
      追蹤名單
    </div>
    <Concerned :followers="storeFollowerList" />
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import Concerned from '@/components/Concerned.vue';

export default defineComponent({
  name: 'Follower',
  components: {
    Concerned,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch('user/getFollower');
    });

    const storeFollowerList = computed(() => {
      const data = store.getters['user/followerList'];
      return data;
    });

    return {
      storeFollowerList,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>