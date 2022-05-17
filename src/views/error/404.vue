<template>
  <div class="error-container">
    <div class="wscn-http404-container">
      <div class="wscn-http404">
        <img src="@/assets/img.svg" alt="meta wall image pic-404">
        <div class="bullshit">
          <div class="bullshit__oops">超級 META！</div>
          <div class="bullshit__headline">{{ message }}</div>
          <div class="bullshit__info">
            <p>請檢查您輸入的網址是否正確</p>
            <p>或點擊下方按鈕返回首頁</p>
          </div>
          <router-link to="/home" class="bullshit__return-home">返回首頁</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '進不去這個頁面...'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>