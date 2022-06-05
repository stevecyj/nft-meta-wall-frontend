<template>
  <div>
    <div class="block-title">
      我按讚的貼文
    </div>
    <LovePost :likePosts="likedPosts"/>
  </div>
</template>

<script>
import { defineComponent, reactive , computed, onMounted} from 'vue';
import LovePost from '@/components/LovePost.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LikePosts',
  components: {
    LovePost,
  },
  setup() {
    const store = useStore();

    onMounted(async ()=>{
      await store.dispatch('post/getLikedPosts');
    })
    const likedPosts = computed( () =>{
      const data = store.getters['post/likedPosts'];
      return data
    })

    return {
      likedPosts
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
