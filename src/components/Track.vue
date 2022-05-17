<template>
  <!-- 追蹤 -->
  <div class="track-container radius track" style="margin-bottom: 14px;">
    <div class="track-content">
      <img
        class="track-content__img"
        src="@/assets/user5-4.png"
        alt="追蹤這照片"
      />
      <div style="margin-left: 16px;">
        <p class="track-content__name">邊緣小杰</p>
        <p class="track-content__text">{{ thousandSeparator(987987) + ' 人追蹤'}}</p>
      </div>
      <button class="btn secondary small">追蹤</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { thousandSeparator } from '@/utils/unit';

export default defineComponent({
  name: 'Track',
  components: {
  },
  setup() {
    return {
      thousandSeparator
    };
  }
});
</script>

<style lang="scss" scoped>
</style>