<template>
  <div>
    <div class="block-title">
      修改個人資料
    </div>
    
    <ul class="tabs" style="margin-top: 32px; margin-left: 16px;">
      <li class="tab" :class="{'active': tagKey === 'userInfo'}" @click="clickTag('userInfo')">
        暱稱修改
      </li>
      <li class="tab" :class="{'active': tagKey === 'password'}" @click="clickTag('password')">
        重設密碼
      </li>
    </ul>

    <transition name="fall">
      <EditUserInfo v-show="tagKey === 'userInfo'" />
    </transition>
    <transition name="fall">
      <ResetPassword v-show="tagKey === 'password'" />
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EditUserInfo from '@/components/EditUserInfo.vue';
import ResetPassword from '@/components/ResetPassword.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    EditUserInfo,
    ResetPassword,
  },
  setup() {
    const tagKey = ref('userInfo');

    const clickTag = (key) => {
      tagKey.value = key;
    }
    return {
      tagKey,
      clickTag
    };
  }
});
</script>

<style lang="scss" scoped>
.fall-enter-active,
.fall-leave-active {
  transition: opacity .3s ease;
}

.fall-enter-from,.fall-leave-to {
  opacity: 0;
}

.fall-enter-to,
.fall-leave-from {
  opacity: 1;
}
</style>