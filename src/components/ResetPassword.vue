<template>
  <div class="card round-radius">
    <div class="center-container">
      <div class="user-password">
        <p class="user-password__label">輸入新密碼</p>
        <div class="form-input" style="margin-top: 4px;">
          <input
            v-model.trim = "password"
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
            v-model.trim = "confirmPassword"
            type="password"
            name="password-confirmation"
            placeholder="再次輸入新密碼"
          >
        </div>
      </div>
      <button class="btn" :class="{ disabled : !checkPassWordSame }" @click="updatePassWord" style="margin-top: 32px;">重設密碼</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { passwordRule } from '@/utils/validation';

export default defineComponent({
  name: 'ResetPassword',
  components: {
  },
  setup() {
    const store = useStore();
    const password = ref('Qwer1234')
    const confirmPassword = ref('Qwer1234')

    const checkPassWordSame = computed( () => {
      if(password.value === confirmPassword.value){
        // 確認是否符合規則
        return passwordRule(password.value)
      }
      return false
    })

    if(!checkPassWordSame) return alert('密碼兩個不同')

    const updatePassWord = async () => {
      await store.dispatch('user/updatePassword', {
        password1 : password.value, 
        password2 : confirmPassword.value
      })
    }

    return {
      password,
      confirmPassword,
      checkPassWordSame,
      updatePassWord
    };
  }
});
</script>

<style lang="scss" scoped>
</style>