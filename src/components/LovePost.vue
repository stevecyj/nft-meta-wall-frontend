<template>
  <div>
    <div v-if="likePosts.length <= 0" class="love-post-empty" style="margin-top: 16px;">
      <div class="love-post-empty__title">
        <div class="love-post-empty__circle red"></div>
        <div class="love-post-empty__circle yellow"></div>
        <div class="love-post-empty__circle green"></div>
      </div>
      <div class="love-post-empty__content">目前尚無按讚的貼文，快去按讚別人貼文吧！</div>
    </div>

    <div v-else v-for="(likePost, index) in likePosts" :key="index">
      <div class="love-post" style="margin-top: 16px">
        <div class="avatar">
          <img
            class="avatar__img"
            :src="likePost.user.avatar"
          />
          <div style="margin-left: 16px;">
            <a
              @click.prevent="gotoPersonalPage(likePost.user._id, likePost.postId)"
              class="love-post__link"
            ><span>{{ likePost.user.userName }}</span></a>
            <p class="avatar__text">發文時間：{{ timeToLocalTime(likePost.datetime_pub) }}</p>
          </div>
        </div>
        <ul class="love-post__btn-list">
          <li>
            <button class="love-post__btn" @click="cancelLikePost(likePost.postId, index)">
              <div v-if="isLoading[index]" class="loader"></div>
              <i v-else class="material-icons-outlined love-post__btn__icon blue">
                thumb_up
              </i>
              <p class="love-post__btn__text fw-bold">取消</p>
            </button>
          </li>
          <li class="look">
            <button class="love-post__btn" @click="gotoPersonalPage(likePost.user._id, likePost.postId)">
              <i class="material-icons-outlined love-post__btn__icon">
                arrow_circle_right
              </i>
              <p class="love-post__btn__text fw-bold">查看</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { timeToLocalTime } from '@/utils/time';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'LovePost',
  components: {
  },
  props: {
    likePosts: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const isLoading = ref([])
    const loginUserId = computed(()=>{
      const data = store.getters['user/userInfo'];
      return data.id
    });
    const likePosts = computed(()=>{
      return props.likePosts
    });

    const gotoPersonalPage = (userId, postId) => {
      router.push({
        path: `/personal/${userId}`,
        query: { postId }
      });
    };

    const cancelLikePost = async (postId, index) => {
      isLoading.value[index] = true;
      const result = await store.dispatch('post/updateLikes', { postId, userId: loginUserId.value});
      if(result.status === 'success'){
        likePosts.value.splice(index, 1);
      }
      console.log(result);
      isLoading.value[index] = false;
    }

    return {
      likePosts,
      timeToLocalTime,
      cancelLikePost,
      gotoPersonalPage,
      isLoading
    };
  }
});
</script>

<style lang="scss" scoped>
.loader{
  width: 24px;
  height: 24px;
}
</style>
