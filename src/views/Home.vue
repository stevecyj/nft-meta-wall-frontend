<template>
  <div>
    <Searchbar
      :sort="storePost.sortby"
      @sort="sort"
      @search="search"
    />
    <Posts :posts="storePost.posts" />
  </div>
</template>


<script>
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';
import Searchbar from '@/components/Searchbar.vue';
import Posts from '@/components/Posts.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Searchbar,
    Posts,
  },
  setup(props) {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch('post/fetchPublicPosts');
      // await store.dispatch('user/getProfile', userInfo);
    });

    // const storePost = computed(() => {
    //   const data = store.getters['post/publicPosts'];
    //   return data;
    // });
    const storePost = computed(() => store.getters['post/publicPosts']);
    console.log('Home:', storePost);
    const sort = async (sortType) => {
      await store.dispatch('post/fetchPublicPosts', { timeSort: sortType });
    };

    const search = async (text) => {
      await store.dispatch('post/fetchPublicPosts', { keyword: text });
    };

    onBeforeRouteUpdate((to, from) => {
      store.dispatch('post/fetchPublicPosts');
    });

    onBeforeRouteLeave((to, from) => {
      store.dispatch('post/initPublicData');
    });

    return {
      storePost,
      sort,
      search,
    };
  },
});
</script>


<style lang="scss" scoped>
</style>
