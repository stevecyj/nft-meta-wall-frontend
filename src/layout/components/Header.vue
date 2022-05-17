<template>
  <div class="header pos-sticky">
    <div class="header__container container">
      <router-link to="/home">
        <div class="logo">MetaWall</div>
      </router-link>
      <div class="header__avatar__dropdown">
        <div class="header__avatar__dropdown__content">
          <div class="header__avatar">
            <img src="@/assets/user.png" class="header__avatar__img" alt="avatar">
          </div>
          <p class="header__avatar__dropdown__text" style="margin__left: 8px">Member</p>
        </div>
        <ul class="header__avatar__dropdown__items">
          <li class="header__avatar__dropdown__item">
            <router-link to="/personal/1234">我的貼文牆</router-link>
          </li>
          <li class="header__avatar__dropdown__item">
            <router-link to="/profile/index">修改個人資料</router-link>
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Header',
  components: {
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = async () => {
      await store.dispatch('user/logout');
      router.push({ path: '/login' });
    };

    return {
      logout,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>