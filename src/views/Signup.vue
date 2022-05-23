<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img
          src="@/assets/img.svg"
          alt=""
        >
      </div>
      <div class="col">
        <div class="login-block">
          <div class="login-title">
            <img
              src="@/assets/MetaWall.png"
              alt=""
            >
            <p class="text">註冊</p>
          </div>
          <div class="login-input">
            <p>
              <input
                v-model="registerForm.nickname"
                type="text"
                class="nickname"
                placeholder="暱稱"
              >
              <span
                v-show="!isVerifiedNickname"
                class="nickname-msg"
              >暱稱至少 2 個字元以上</span>
            </p>

            <p>
              <input
                v-model="registerForm.email"
                type="email"
                class="email"
                placeholder="Email"
              >
              <span
                v-show="!isVerifiedEmail"
                class="email-msg"
              >Email 格式錯誤</span>
              <span
                v-show="isEmailRegistered"
                class="email-msg"
              >帳號已被註冊，請替換新的 Email！</span>
            </p>

            <p>
              <input
                v-model="registerForm.password"
                type="password"
                class="password"
                placeholder="Password"
              >
              <span
                v-show="!isVerifiedPassword"
                class="password-msg"
              >密碼需至少 8 碼以上，並英文、數字混合</span>
            </p>
          </div>
          <div class="btn-block">
            <button
              type="button"
              class="btn-signup"
              @click="register"
            >註冊</button>
            <router-link
              to="/login"
              class="btn-login"
            >登入</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { nicknameRule, emailRule, passwordRule } from '@/utils/validation';

export default defineComponent({
  name: 'PublishPost',
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const isVerifiedNickname = ref(true);
    const isVerifiedEmail = ref(true);
    const isVerifiedPassword = ref(true);
    const isEmailRegistered = ref(false);
    const accountStatus = computed(() => {
      return store.getters['user/accountStatus'];
    });

    const registerForm = reactive({
      nickname: '',
      email: '',
      password: '',
    });
    watch(accountStatus, (newStatus) => {
      console.log('newStatus', newStatus);
    });

    const register = async () => {
      !registerForm.nickname || !nicknameRule(registerForm.nickname)
        ? (isVerifiedNickname.value = false)
        : (isVerifiedNickname.value = true);

      !registerForm.email || !emailRule(registerForm.email)
        ? (isVerifiedEmail.value = false)
        : (isVerifiedEmail.value = true);

      !registerForm.password || !passwordRule(registerForm.password)
        ? (isVerifiedPassword.value = false)
        : (isVerifiedPassword.value = true);

      if (isVerifiedNickname.value && isVerifiedEmail.value && isVerifiedPassword.value) {
        router.push({ path: '/login' });
      }

      const registerResult = await store.dispatch('user/register', { ...registerForm });
      console.log('registerResult', registerResult);

      // router.push({ path: '/login' });
    };

    return {
      registerForm,
      isVerifiedNickname,
      isVerifiedEmail,
      isEmailRegistered,
      isVerifiedPassword,
      register,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  max-width: 1440px;
  max-height: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.row {
  border: 2px solid #000400;
  width: 870px;
  padding: 70px 22px;
  background: #efece7;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: -8px 8px 0px #00040029;
  justify-content: center;

  @media screen and (max-width: 867px) {
    width: 100%;
  }
}

.col {
  margin: 0 24px;
}

.login-block {
  width: 374px;
}

/* LOGO圖片跟字 */
.login-title {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 36px;
}

.text {
  font: 24px 'Helvetica Neue', sans-serif;
  font-weight: 700;
}

/* 帳號密碼輸入框 */
.login-input p {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.login-input p input {
  padding: 16px 24px 16px;
  border: 2px solid #000400;
  outline: none;
  font: Azeret Mono;
}

.login-input p span {
  display: block;
}

.login-input p input::placeholder {
  color: #9b9893;
}

/* 錯誤訊息 */
.login-input p .nickname-msg,
.login-input p .email-msg,
.login-input p .password-msg {
  font: 14px 'Noto Sans TC';
  color: #f57375;
  display: none;
}

/* 登入與註冊按鈕 */
.btn-block {
  display: flex;
  flex-direction: column;
}

.btn-signup {
  color: #fff;
  background: #a8b0b9;
  border: 2px solid #808080;
  border-radius: 8px;
  padding: 16px 0;
  margin: 16px 0;
  cursor: pointer;
  font-size: bold Azeret Mono;
}

.btn-login {
  background: none;
  border: none;
  cursor: pointer;
  font-size: Azeret Mono;
  text-align: center;
  font-size: 13px;
}

/* 錯誤訊息 */
.login-input p .nickname-msg,
.login-input p .email-msg,
.login-input p .password-msg {
  display: block;
  font: 14px 'Noto Sans TC';
  color: #f57375;
}
</style>