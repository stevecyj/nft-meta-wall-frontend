<template>
  <div class="navigation-bar-container">
    <ul class="navigationBar fixed-bottom">
      <li>
        <router-link
          to="/like-posts/index"
          class="icon-btn white bold"
        >
          <i class="material-icons-outlined icon-btn__icon">
            thumb_up
          </i>
        </router-link>
      </li>
      <li style="margin-left: 24px;">
        <router-link
          to="/home"
          class="icon-btn white bold"
        >
          <i class="material-icons-outlined icon-btn__icon">
            home
          </i>
        </router-link>
      </li>
      <li style="margin-left: 24px;">
        <router-link
          to="/follower/index"
          class="icon-btn white bold"
        >
          <i class="material-icons-outlined icon-btn__icon">
            notifications
          </i>
        </router-link>
      </li>
      <li style="margin-left: 24px;">
        <router-link
          to="/publish-post/index"
          class="icon-btn primary bold"
        >
          <i class="material-icons-outlined icon-btn__icon">
            add
          </i>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavigationBar',
  components: {
  },
});
</script>


<style lang="scss" scoped>
</style>