<template>
  <div class="card round-radius">
    <div class="center-container">
      <div class="user-password">
        <p class="user-password__label">輸入新密碼</p>
        <div class="form-input" style="margin-top: 4px;">
          <input
            type="password"
            name="password"
            placeholder="請輸入新密碼"
          >
        </div>
      </div>
      <div class="user-password">
        <p class="user-password__label">再次輸入</p>
        <div class="form-input"  style="margin-top: 4px;">
          <input
            type="password"
            name="password-confirmation"
            placeholder="再次輸入新密碼"
          >
        </div>
      </div>
      <button class="btn disabled" style="margin-top: 32px;">重設密碼</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResetPassword',
  components: {
  },
  setup() {
    return {
    };
  }
});
</script>

<style lang="scss" scoped>
</style>