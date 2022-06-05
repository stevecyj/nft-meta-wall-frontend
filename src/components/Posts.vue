<template>
  <div>
    <!-- 沒貼文 -->
    <div v-if="posts.length <= 0" class="post-empty" style="margin-top: 16px">
      <div class="post-empty__title">
        <div class="post-empty__circle red"></div>
        <div class="post-empty__circle yellow"></div>
        <div class="post-empty__circle green"></div>
      </div>
      <div class="post-empty__content">目前尚無動態，新增一則貼文吧！</div>
    </div>

    <!-- 貼文有圖片 -->
    <div v-else v-for="(post, index) in posts" :key="index">
      <div class="post" style="margin-top: 16px">
        <!-- 貼文擁有者資料 -->
        <div class="avatar">
          <img v-if="post.user?.avatar" class="avatar__img" :src="post.user.avatar" />
          <img v-else class="avatar__img" src="@/assets/user5-1.png" />
          <div style="margin-left: 16px;">
            <router-link
              :to="`/personal/${post.user?._id}`"
              class="link"
            >{{ post.user?.userName }}</router-link>
            <p class="avatar__text">
              {{ timeToLocalTime(post.datetime_pub) }}
            </p>
          </div>
        </div>
        <!-- 貼文內容 -->
        <div class="post__content">
          {{ post.content }}
        </div>
        <!-- 貼文圖片 -->
        <img
          v-if="post.image !== ''"
          class="post__img"
          :src="post.image"
        />
        <div v-if="post.likes.length <= 0" class="like-btn-empty" style="margin-top: 16px;">
          <button class="like-btn" @click="updateLike(post.postId, index)">
            <i class="material-icons-outlined like-btn__icon">
              thumb_up
            </i>
          </button>
          <p class="like-btn__text">成為第一個按讚的朋友</p>
        </div>
        <button v-else class="like-btn primary-text" style="margin-top: 16px;" @click="updateLike(post.postId, index)">
          <i class="material-icons-outlined like-btn__icon" :class="{ 'text-pink': post.likes.indexOf(loginUserId) !== -1}">
            thumb_up
          </i>
          <p class="like-btn__text">{{ post.likes.length }}</p>
        </button>
        <!-- 留言(本人) -->
        <div class="message-bar" style="margin-top: 16px;">
          <div class="avatar">
            <!-- 本人圖片 -->
            <img v-if="post.user?.avatar" class="avatar__img" :src="post.user.avatar" />
            <img v-else class="avatar__img" src="@/assets/user5-1.png" />
          </div>
          <div class="message-bar__content" style="margin-left: 8px">
            <div class="message-bar__content__input">
              <input
                v-model="comment[index]"
                type="text"
                name="message"
                placeholder="留言..."
              >
            </div>
            <button class="message-bar__content__btn" @click="addComment(post.postId, index)">
              留言
            </button>
          </div>
        </div>
        <!-- 留言 | 等 respones data 有再打開-->
        <div  v-for="(comment, commentIndex) in post.comments" :key="commentIndex">
          <div class="message" style="margin-top: 16px;">
            <div class="avatar">
              <img
                v-if="comment.user?.avatar"
                class="avatar__img"
                :src="comment.user.avatar"
              />
              <img
                v-else
                class="avatar__img"
                src="@/assets/user5-3.png"
              />
              <div style="margin-left: 16px; margin-right: auto;">
                <router-link
                  :to="`/personal/${comment.user._id}`"
                  class="link"
                >{{ comment.user.userName }}</router-link>
                <p v-if="comment?.createdAt" class="avatar__text">{{ timeToLocalTime(comment.createdAt) }}</p>
              </div>
              <a class="message__btn" v-if="loginUserId === comment.user._id" @click="deleteComment(comment._id, commentIndex, index)">
                <i class="material-icons-outlined">close</i>
              </a>
            </div>
            <div class="message__content">{{ comment.comment }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { timeToLocalTime } from '@/utils/time';

export default defineComponent({
  name: 'Posts',
  components: {
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const store = useStore();
    const comment = ref([])
    const posts = computed(() => {
      return props.posts;
    });
    const loginUserId = computed(()=>{
      const data = store.getters['user/userInfo'];
      return data.id
    });

    const addComment = async (postId, index) => {
      const commentData = comment.value[index];
      const result = await store.dispatch('post/addComment', { postId,  commentData});
      console.log('post.vue:',result)
      if(result.status === 'success'){
        comment.value[index] = '';
        posts.value[index].comments.push(result.data.comments);
      } else {
        console.log( result);
      }
    }
    const updateLike = async (postId, index) => {
      const likeIndex = posts.value[index].likes.indexOf(loginUserId.value)
      if(likeIndex == -1){
        posts.value[index].likes.push(loginUserId.value);
      } else {
        posts.value[index].likes.splice(likeIndex, 1);
      }
      const result = store.dispatch('post/updateLikes', { postId, userId: loginUserId.value});
      // console.log(result);
    }
    const deleteComment = async (commentId, commentIndex, postIndex)=>{
      const result = await store.dispatch('post/delComment', { commentId });
      if(result === 'success'){
        posts.value[postIndex].comments.splice(commentIndex,1)
      } else {
        console.log('留言刪除失敗')
      }
    }
    return {
      posts,
      timeToLocalTime,
      comment,
      addComment,
      updateLike,
      deleteComment,
      loginUserId
    };
  }
});
</script>

<style lang="scss" scoped>
.text-pink {
  color: pink;
}
.message__btn{
  :hover{
    cursor: pointer;
  }
}

</style>
