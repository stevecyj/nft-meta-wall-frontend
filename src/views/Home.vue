<template>
  <div ref="scrollComponent">
    <Searchbar
      :sort="storePost.sortby"
      @sort="sort"
      @search="search"
    />
    <Posts :posts="postsList"/>
  </div>
</template>


<script>
import { defineComponent, reactive, computed, onMounted, onUnmounted } from 'vue';
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
    const postsList = ref([]);
    const scrollComponent = ref(null);

    const storePost = computed(() => {
      const data = store.getters['post/publicPosts'];
      return data;
    });

    const sort = async (sortType) => {
      await store.dispatch('post/fetchPublicPosts', { timeSort: sortType });
    };

    const search = async (text) => {
      postsList.value.length = 0
      await store.dispatch('post/initPublicData');
      await store.dispatch('post/fetchPublicPosts', { keyword: text });
      postsList.value.push(...storePost.value.posts);
    };

    const loadMorePost = async ()=>{
      const { page, hasNextPage } = storePost.value;
      if(hasNextPage){
        await store.dispatch('post/fetchPublicPosts', { page: page +1 });
        postsList.value.push(...storePost.value.posts);
      }
    }

    const scrollHandle = (e)=>{
      let el = scrollComponent.value;
      if (el.getBoundingClientRect().bottom < window.innerHeight) {
        loadMorePost();
      }
    }

    onMounted(async () => {
      await store.dispatch('post/fetchPublicPosts');
      postsList.value.push(...storePost.value.posts);
      window.addEventListener('scroll', scrollHandle);
    });

    onUnmounted(async ()=>{
      window.removeEventListener('scroll', scrollHandle);
    })


    onBeforeRouteUpdate((to, from) => {
      store.dispatch('post/fetchPublicPosts');
    });

    onBeforeRouteLeave((to, from) => {
      postsList.value.length = 0
      store.dispatch('post/initPublicData');
    });

    return {
      storePost,
      sort,
      search,
      postsList,
      scrollComponent
    };
  },
});
</script>


<style lang="scss" scoped>
</style>
