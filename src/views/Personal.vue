<template>
  <div ref="scrollComponent">
    <transition name="fade">
      <div v-if="!isSelf">
        <Track />
      </div>
    </transition>
    <Searchbar :sort="storePost.sortby" @sort="sort" @search="search" />
    <Posts :posts="postsList" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import Track from '@/components/Track.vue';
import Searchbar from '@/components/Searchbar.vue';
import Posts from '@/components/Posts.vue';

export default defineComponent({
  name: 'Personal',
  components: {
    Track,
    Searchbar,
    Posts,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const postsList = ref([]);
    const scrollComponent = ref(null);
    const selfId = store.getters['user/userInfo']?.id;
    const id = route.params?.id;
    const isSelf = ref(selfId == id);

    const loadMorePost = async ()=>{
      const { page, hasNextPage } = storePost.value;
      if(hasNextPage){
        await store.dispatch('post/fetchPrivatePosts', { page: page +1 });
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
      const { postId } = route.query;
      if(postId){
        await store.dispatch('post/fetchPrivatePosts', { postId });
      } else {
        await store.dispatch('post/fetchPrivatePosts', { authorId: id });
      }
      postsList.value.push(...storePost.value.posts);
      window.addEventListener('scroll', scrollHandle);
    });

    onUnmounted(()=>{
      window.removeEventListener('scroll', scrollHandle);
    })

    const storePost = computed(() => {
      const data = store.getters['post/privatePosts'];
      return data;
    });
    const sort = async (sortType) => {
      postsList.value.length = 0;
      await store.dispatch('post/fetchPrivatePosts', { sortby: sortType, page: 1});
      postsList.value.push(...storePost.value.posts);
    };

    const search = async (text) => {
      postsList.value.length = 0;
      await store.dispatch('post/initPrivateData');
      if(id === selfId){
        text !== '' ?
          await store.dispatch('post/fetchPrivatePosts', { authorId: selfId, keyword: text }):
          await store.dispatch('post/fetchPrivatePosts', { authorId: selfId });
      } else {
        await store.dispatch('post/fetchPrivatePosts', { keyword: text });
      }
      postsList.value.push(...storePost.value.posts);
    };

    onBeforeRouteLeave((to, from) => {
      store.dispatch('post/initPrivateData');
    });

    onBeforeRouteUpdate(async(to, from) => {
      postsList.value.length = 0;
      await store.dispatch('post/initPrivateData');
      const newId = to.params.id;
      isSelf.value = selfId == newId;
      await store.dispatch('post/fetchPrivatePosts', { authorId: newId });
      postsList.value.push(...storePost.value.posts);
    });

    return {
      isSelf,
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.333s;
}

.fade-enter-from,.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
