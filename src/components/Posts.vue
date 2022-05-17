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
          <img
            class="avatar__img"
            :src="post.userPhoto"
          />
          <div style="margin-left: 16px;">
            <router-link
              :to="`/personal/${post.userId}`"
              class="link"
            >{{ post.userName }}</router-link>
            <p class="avatar__text">
              {{ timeToLocalTime(post.createAt) }}
            </p>
          </div>
        </div>
        <!-- 貼文內容 -->
        <div class="post__content">
          {{ post.content }}
        </div>
        <!-- 貼文圖片 -->
        <img
          v-if="post.image"
          class="post__img"
          :src="post.image"
        />
        <!-- 沒有按讚 -->
        <div v-if="post.likes.length <= 0" class="like-btn-empty" style="margin-top: 16px;">
          <button class="like-btn">
            <i class="material-icons-outlined like-btn__icon">
              thumb_up
            </i>
          </button>
          <p class="like-btn__text">成為第一個按讚的朋友</p>
        </div>
        <!-- 有人按讚 -->
        <button v-else class="like-btn primary-text" style="margin-top: 16px;">
          <i class="material-icons-outlined like-btn__icon">
            thumb_up
          </i>
          <p class="like-btn__text">{{ post.likes.length }}</p>
        </button>
        <!-- 留言(本人) -->
        <div class="message-bar" style="margin-top: 16px;">
          <div class="avatar">
            <!-- 本人圖片 -->
            <img
              class="avatar__img"
              src="@/assets/user.png"
            />
          </div>
          <div class="message-bar__content" style="margin-left: 8px">
            <div class="message-bar__content__input">
              <input
                type="text"
                name="message"
                placeholder="留言..."
              >
            </div>
            <button class="message-bar__content__btn">
              留言
            </button>
          </div>
        </div>
        <!-- 留言 -->
        <div  v-for="(comment, commentIndex) in post.comments" :key="commentIndex">
          <div class="message" style="margin-top: 16px;">
            <div class="avatar">
              <img
                class="avatar__img"
                :src="comment.userPhoto"
              />
              <div style="margin-left: 16px">
                <router-link
                  :to="`/personal/${comment.userId}`"
                  class="link"
                >{{ comment.userName }}</router-link>
                <p class="avatar__text">{{ timeToLocalTime(comment.createAt) }}</p>
              </div>
            </div>
            <div class="message__content">{{ comment.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
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
    const posts = props.posts;

    return {
      posts,
      timeToLocalTime
    };
  }
});
</script>

<style lang="scss" scoped>
</style>