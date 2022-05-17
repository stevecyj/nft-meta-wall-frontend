<template>
  <div>
    <transition name="fade">
      <div v-if="!isSelf">
        <Track />
      </div>
    </transition>
    <Searchbar />
    <Posts :posts="posts" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
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
    const selfId = store.getters['user/userInfo']?.id;
    let id = useRoute().params?.id;
    const isSelf = ref(selfId == id);
    const posts = reactive([
      {
        userName: '邊緣小杰',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '1234',
        tags: ['帥氣', '美麗'],
        type: 'group',
        image: 'https://images.unsplash.com/photo-1652357230727-34fbae356cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        createAt: '2022-05-10T17:22:10.221Z',
        content: '外面看起來就超冷.... 我決定回被窩繼續睡....',
        likes: ['1', '2', '3'],
        comments: [
          {
            userName: '希琳',
            userPhoto: '',
            userId: '9123',
            createAt: '2022-05-10T17:22:10.221Z',
            message : '真的～我已經準備冬眠了',
          }
        ]
      },
      {
        userName: '邊緣小杰',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '5678',
        tags: ['帥氣', '美麗'],
        type: 'person',
        image: '',
        createAt: '2022-05-10T17:22:10.221Z',
        content: '外面看起來就超冷.... 我決定回被窩繼續睡....',
        likes: [],
        comments: [
          {
            userName: '希琳',
            userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
            userId: '9123',
            createAt: '2022-05-10T17:22:10.221Z',
            message : '真的～我已經準備冬眠了'
          }
        ]
      },
      {
        userName: '邊緣小杰',
        userPhoto: 'https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1652373309671.jpg',
        userId: '6884',
        tags: ['帥氣', '美麗'],
        type: 'person',
        image: '',
        createAt: '2022-05-10T17:22:10.221Z',
        content: '外面看起來就超冷.... 我決定回被窩繼續睡....',
        likes: [],
        comments: []
      }
    ]);

    onBeforeRouteUpdate((to, from) => {
      if (to.params.id !== from.params.id) {
        const newId = to.params.id;
        isSelf.value = selfId == newId;
      }
    });

    return {
      isSelf,
      posts
    };
  }
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