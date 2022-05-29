<template>
  <div class="card round-radius">
    <div class="center-container">
      <div class="avatar-upload">
        <div class="avatar">
          <img
            class="avatar__img"
            :src="avatar"
          />
        </div>
        <button class="text-btn black" style="margin-top: 20px;">上傳大頭照</button>
      </div>
      <div class="user-info">
        <p class="user-info__label">暱稱</p>
        <div class="form-input" style="margin-top: 4px;">
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
        <div class="form-radio" style="margin-top: 8px;">
          <label class="radio">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              class="radio__input"
              value="male"
            >
            <i
              class="material-icons un-checked radio__input-icon">radio_button_unchecked</i>
            <i
              class="material-icons checked radio__input-icon">radio_button_checked</i>
            <p class="radio__input-text">男性</p>
          </label>
          <label class="radio" style="margin-left: 32px;">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              value="female"
              class="radio__input"
            >
            <i
              class="material-icons un-checked radio__input-icon">radio_button_unchecked</i>
            <i
              class="material-icons checked radio__input-icon">radio_button_checked</i>
            <p class="radio__input-text">女性</p>
          </label>
          <label class="radio" style="margin-left: 32px;">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              value="notAccess"
              class="radio__input"
            >
            <i
              class="material-icons un-checked radio__input-icon">radio_button_unchecked</i>
            <i
              class="material-icons checked radio__input-icon">radio_button_checked</i>
            <p class="radio__input-text">不透漏</p>
          </label>
        </div>
      </div>
      <p class="user-info__error-message text-align-center" style="margin-top: 32px;">
        1.圖片寬高比必需為 1:1，請重新輸入
      </p>
      <p class="user-info__error-message text-align-center">
        2. 解析度寬度至少 300像素以上，請重新輸入
      </p>
      <button @click = "updateProfile" class="btn secondary" style="margin-top: 32px;">
        送出更新
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { alertSuccess, alertError } from '@/utils/swal';

export default defineComponent({
  name: 'EditUserInfo',
  components: {
  },
  setup() {
    const store = useStore();

    const userName = ref('')
    const avatar = ref('')
    const gender = ref('')
    
    const userInfo = computed( () => {
      return store.getters['user/userInfo'];
    });

    watch(
      () => userInfo.value,
      ( newValue, oldValue ) => {
        userName.value = newValue.userName 
        avatar.value =  newValue.avatar
        gender.value =  newValue.gender
      },
      { deep: true }
    );
    


    const updateProfile = async () =>{
      if( !userName.value || !avatar.value ){
        const msg = !userName.value ? '使用者名稱不得為空' : '使用者圖片不得為空'
        alertError(msg)
        return false
      }
      
      try {
        const res = await store.dispatch('user/updateProfile', {
          userName: userName.value, 
          avatar : avatar.value,
          gender : gender.value
        });
        alertSuccess(res)
      } catch (error) {
        alertError(msg.message)
      }

    }

    return {
      userName,
      avatar,
      gender,
      updateProfile
    };
  }
});
</script>

<style lang="scss" scoped>
</style>