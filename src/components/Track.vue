<template>
  <!-- 追蹤 -->
  <div class="track-container radius track" style="margin-bottom: 14px;">
    <div class="track-content">
      <img
        class="track-content__img"
        :src="uProfile.avatar"
        alt="追蹤這照片"
      />
      <div style="margin-left: 16px;">
        <p class="track-content__name">{{ uProfile.userName }}</p>
        <p class="track-content__text" v-if="uProfile.follow">{{ thousandSeparator(uProfile.beFollowed.length) + ' 人追蹤'}}</p>
      </div>
      <button class="btn secondary small" :class="{ tracked: isTrack }" @click="updateFollow(userInfo.id, uProfile._id)">
        {{ trackText }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent , onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { thousandSeparator } from '@/utils/unit';

export default defineComponent({
  name: 'Track',
  components: {
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const trackText = ref('');
    const isTrack = ref(false);
    const uProfile = computed( () =>{
      return store.getters['user/otherUserInfo']
    })
    const userInfo = computed(() => {
      return store.getters['user/userInfo'];
    });

    const userId = computed(() => {
      return route.params.id
    });

    const checkTrackStatus = () => {
      isTrack.value = uProfile.value.beFollowed.some((item)=>{
        return item.id === userInfo.value.id
      })
      trackText.value = isTrack.value ? '取消追蹤' : '追蹤';
    }

    onMounted(async () => {
      await store.dispatch('user/getOtherUser',{ id: userId.value });
      checkTrackStatus();
    });

    const updateFollow = async ( userId, followId )=>{
      await store.dispatch('user/updateFollower',{ userId, followId })
      checkTrackStatus();
    }

    return {
      userInfo,
      uProfile,
      thousandSeparator,
      updateFollow,
      trackText,
      isTrack
    };
  }
});
</script>

<style lang="scss" scoped>
.tracked{
  background-color: #EFECE7;
}
</style>
