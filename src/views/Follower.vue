<template>
  <div>
    <div class="block-title">
      追蹤名單
    </div>
    <Concerned :followers="followers" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import Concerned from '@/components/Concerned.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Follower',
  components: {
    Concerned,
  },
  setup() {
    const store = useStore();
    const userInfo = computed(  () => {
      return store.getters['user/userInfo']
    })

    const userId = userInfo.value.id

    const followers = reactive([
      {
        userName: '希琳',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '9123',
        createAt: '2022-05-10T17:22:10.221Z',
      },
      {
        userName: '希琳',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '65423',
        createAt: '2022-05-10T17:22:10.221Z',
      }
    ]);

    onMounted(async () => {
      followers.value = await store.dispatch('user/getFollowers', { userId });
    });

    return {
      followers,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>