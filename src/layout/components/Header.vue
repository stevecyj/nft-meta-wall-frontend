<template>
  <div class="header pos-sticky">
    <div class="header__container container">
      <router-link to="/home">
        <div class="logo">MetaWall</div>
      </router-link>
      <div class="header__avatar__dropdown">
        <div class="header__avatar__dropdown__content">
          <div class="header__avatar">
            <img
              :src="userInfo.avatar"
              class="header__avatar__img"
              alt="avatar"
            >
          </div>
          <p
            class="header__avatar__dropdown__text"
            style="margin__left: 8px"
          >Member {{userInfo.userName}}</p>
        </div>
        <ul class="header__avatar__dropdown__items">
          <li class="header__avatar__dropdown__item">
            <router-link :to="`/personal/${userInfo.id}`">我的貼文牆</router-link>
          </li>
          <li class="header__avatar__dropdown__item">
            <router-link
              to="/profile/index"
              @click="handleRefresh"
            >修改個人資料</router-link>
          </li>
          <li class="header__avatar__dropdown__item">
            <a @click="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { io } from 'socket.io-client';
import { getLocalStorageToken } from '@/utils/auth';

export default defineComponent({
  name: 'Header',
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();

    // const show = ref(false);

    const onRefresh = inject('reload');

    const show = ref(false);

    // socket
    const host = import.meta.env.VITE_BASE_API;
    const token = getLocalStorageToken();
    const socket = io(host, {
      path: '/socket.io/connect',
      transports: ['websocket'],
      autoConnect: true, //启动自从自动连接
      secure: true,
      transports: ['websocket'], // ['websocket', 'polling']
      reconnection: true, //启动重新连接
      reconnectionAttempts: 5, //最大重试连接次数
      reconnectionDelay: 2000, //最初尝试新的重新连接等待时间
      reconnectionDelayMax: 10000,
      query: {
        Authorization: `Bearer ${token}`,
      },
    });
    // 更新追蹤名單
    const followerIDList = computed(() => {
      return store.getters['user/followerIDList'];
    });
    const updateUserFollowers = (ids) => {
      console.log(ids.value);
      socket.emit('updateUserFollowers', ids.value);
    };
    updateUserFollowers(followerIDList);

    const logout = async () => {
      await store.dispatch('user/logout');
      router.push({ path: '/login' });
    };

    const handleRefresh = () => {
      onRefresh();
    };

    const userInfo = computed(() => {
      return store.getters['user/userInfo'];
    });

    onMounted(async () => {
      await store.dispatch('user/getFollower');
      await store.dispatch('user/getProfile', { id: userInfo._value.id });
    });

    return {
      userInfo,
      followerIDList,
      logout,
      handleRefresh,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>