<template>
  <div class="card round-radius">
    <div class="center-container">
      <div class="avatar-upload">
        <!-- <div class="avatar">
        </div> -->
        <div class="avatar">
          <img
            v-if="preViewImage"
            class="avatar__img"
            :src="preViewImage"
            alt="avatar"
          />
          <img
            v-else
            class="avatar__img"
            :src="userInfo.avatar"
            alt="avatar"
          />
        </div>
        <label
          for="uploadAvatar"
          class="text-btn black"
          style="margin-top: 20px;"
        >上傳大頭照</label>
        <input
          id="uploadAvatar"
          style="visibility:hidden;"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change="showFile"
        >
      </div>
      <div class="user-info">
        <p class="user-info__label">暱稱</p>
        <div
          class="form-input"
          style="margin-top: 4px;"
        >
          <input
            v-model.trim="userName"
            type="text"
            name="nickname"
            placeholder="暱稱"
          >
        </div>
      </div>
      <div class="user-info">
        <p class="user-info__label">性別</p>
        <div
          class="form-radio"
          style="margin-top: 8px;"
        >
          <label class="radio">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              class="radio__input"
              value="male"
            >
            <i class="material-icons un-checked radio__input-icon">radio_button_unchecked</i>
            <i class="material-icons checked radio__input-icon">radio_button_checked</i>
            <p class="radio__input-text">男性</p>
          </label>
          <label
            class="radio"
            style="margin-left: 32px;"
          >
            <input
              v-model="gender"
              type="radio"
              name="gender"
              value="female"
              class="radio__input"
            >
            <i class="material-icons un-checked radio__input-icon">radio_button_unchecked</i>
            <i class="material-icons checked radio__input-icon">radio_button_checked</i>
            <p class="radio__input-text">女性</p>
          </label>
          <label
            class="radio"
            style="margin-left: 32px;"
          >
            <input
              v-model="gender"
              type="radio"
              name="gender"
              value="notAccess"
              class="radio__input"
            >
            <i class="material-icons un-checked radio__input-icon">radio_button_unchecked</i>
            <i class="material-icons checked radio__input-icon">radio_button_checked</i>
            <p class="radio__input-text">不透漏</p>
          </label>
        </div>
      </div>

      <!-- 錯誤訊息 -->
      <p
        class="user-info__error-message text-align-center"
        style="margin-top: 32px;"
      >
        1.沒有貼文內容，請填寫
      </p>
      <p class="user-info__error-message text-align-center">
        2. 解析度寬度至少 300像素以上，請重新輸入
      </p>
      <button
        @click="updateProfile"
        class="btn secondary"
        style="margin-top: 32px;"
      >
        送出更新
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { alertSuccess, alertError } from '@/utils/swal';
import { imageTypeRule } from '@/utils/validation';

export default defineComponent({
  name: 'EditUserInfo',
  components: {},
  setup() {
    const store = useStore();

    const userName = ref('');
    const avatar = ref('');
    const gender = ref('');
    const errorMessageEnum = {
      noContent: '沒有圖片，請選擇圖片上傳',
      imageSizeError: '解析度寬度至少 300像素以上，請重新輸入',
    };
    let file = reactive({}); // 準備拿 input type="file" 的值
    let fs = reactive({
      name: '', // input 的圖檔名稱
      thumbnail: null, // input 的圖片縮圖
      size: null, // input 的圖片大小
      unit: 'KB',
    });
    let title = ref(''); // 圖片標題
    // let content = ref(''); // 貼文描述
    let preViewImage = ref(null); // 圖片預覽
    let errorImageMessageVised = ref(false);
    let errorImageMessage = ref('');
    // let errorContentMessageVised = ref(false);
    // let errorContentMessage = ref('');

    const showFile = (e) => {
      console.log(e);
      file = e.target.files[0]; // input type="file" 的值
      fs.name = file.name; // input 的圖檔名稱
      fs.thumbnail = window.URL.createObjectURL(file); // input 的圖片縮圖
      fs.size = ~~(file.size * 0.001); // input 的圖片大小
      title.value = fs.name; // 預設 input 的圖檔名稱為圖片上傳時的圖片標題
      preViewImage.value = URL.createObjectURL(file);

      if (fs.size > 1000) {
        errorImageMessageVised.value = true;
        errorImageMessage.value = errorMessageEnum.imageSizeError;
      } else if (!imageTypeRule(fs.name)) {
        errorImageMessageVised.value = true;
        errorImageMessage.value = errorMessageEnum.imageTypeError;
      } else {
        errorImageMessageVised.value = false;
      }
    };

    const userInfo = computed(() => {
      return store.getters['user/userInfo'];
    });

    watch(
      () => userInfo.value,
      (newValue, oldValue) => {
        userName.value = newValue.userName;
        avatar.value = newValue.avatar;
        gender.value = newValue.gender;
      },
      { deep: true, immediate: true }
    );

    const updateProfile = async () => {
      if (!userName.value || !avatar.value) {
        const msg = !userName.value ? '使用者名稱不得為空' : '使用者圖片不得為空';
        alertError(msg);
        return false;
      }

      try {
        const res = await store.dispatch('user/updateProfile', {
          userName: userName.value,
          avatar: avatar.value,
          gender: gender.value,
        });
        alertSuccess(res);
        await store.dispatch('user/getProfile');
      } catch (error) {
        alertError(msg.message);
      }
    };

    return {
      errorImageMessageVised,
      errorImageMessage,
      preViewImage,
      fs,
      userName,
      avatar,
      gender,
      userInfo,
      updateProfile,
      showFile,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>