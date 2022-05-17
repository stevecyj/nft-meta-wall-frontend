<template>
  <div>
    <div class="block-title">
      我按讚的貼文
    </div>
    <LovePost :likePosts="likePosts"/>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import LovePost from '@/components/LovePost.vue';

export default defineComponent({
  name: 'LikePosts',
  components: {
    LovePost,
  },
  setup() {
    const likePosts = reactive([
      {
        userName: '希琳',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '9123',
        postId: '123',
        createAt: '2022-05-10T17:22:10.221Z',
      },
      {
        userName: '希琳',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '65423',
        postId: '456',
        createAt: '2022-05-10T17:22:10.221Z',
      }
    ]);

    return {
      likePosts
    };
  }
});
</script>

<style lang="scss" scoped>
</style>