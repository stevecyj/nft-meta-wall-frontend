import { login, logout, register, getProfile, updatePassword } from "@/api/user";
import {
  getLocalStorageToken,
  setLocalStorageToken,
  removeLocalStorageToken,
  getLocalStoragePID,
  setLocalStoragePID,
  removeLocalStoragePID,
} from "@/utils/auth";

export const state = {
  token: getLocalStorageToken(),
  userName: "",
  // id: "627fa403e11fff95efe0cde6", // test
  id: getLocalStoragePID(),
  avatar: "",
  roles: [],
  verifyResponse: { status: "" },
};

export const actions = {
  // user login
  async login({ commit }, userInfo) {
    try {
      const { email, password } = userInfo;
      const data = await login({ email: email.trim(), password: password });
      // const  data = { token: '123' } // 假資料
      console.log(data.user);

      commit("SET_TOKEN", data.user.token);
      commit("SET_NAME", data.user.name);
      commit("SET_AVATAR", data.user.avatar);
      commit("SET_ID", data.user.id);
      commit("SET_VERIFY_RESPONSE", data);
      setLocalStorageToken(data.user.token);
      setLocalStoragePID(data.user.id);
    } catch (error) {
      console.log(error);
      commit("SET_VERIFY_RESPONSE", error.response.data);
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeLocalStorageToken();
      return error;
    }
  },
  async logout({ commit, state, dispatch }) {
    try {
      // await logout(state.token);

      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeLocalStorageToken();
    } catch (error) {
      console.log(error);

      return error;
    }
  },
  async updatePassword({ commit, state, dispatch }, data) {
    try {
      const { password1 , password2} = data
      const res = await updatePassword({
        password :password1 , 
        confirmPassword:password2
      })
      if(res.status === 'success'){
        // 需再確認導向
        alert('更新成功')
      }
      
    } catch (error) {
      // 密碼相同需確認錯誤回報
      console.log(error)
      return error;
    }
  },

  // user register
  async register({ commit }, userInfo) {
    try {
      const { nickname, email, password } = userInfo;
      const data = await register({
        userName: nickname,
        email: email.trim(),
        password: password,
        confirmPassword: password,
      });

      commit("SET_VERIFY_RESPONSE", data);
    } catch (error) {
      commit("SET_VERIFY_RESPONSE", error.response.data);
      console.log(error);
      return error;
    }
  },

  // get user profile
  async getProfile({ commit, state }) {
    try {
      const { status, data } = await getProfile(state.id);
      // console.log(status, data[0].avatar);
      // status === 'success' && (commit('SET_PROFILE', data));
      status === true && commit("SET_AVATAR", data[0].avatar);
      status === true && commit("SET_NAME", data[0].userName);

      // commit("SET_AVATAR", data[0].avatar);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  resetLocalStorageToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeLocalStorageToken();
      resolve();
    });
  },

  // set default response
  setDefaultResponse({ commit }) {
    commit("SET_DEFAULT_RESPONSE", { status: "" });
  },
};

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, userName) => {
    state.userName = userName;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_VERIFY_RESPONSE: (state, verifyResponse) => {
    state.verifyResponse.status = verifyResponse.status;
  },
  SET_DEFAULT_RESPONSE: (state) => {
    state.verifyResponse.status = "";
  },
};

export const getters = {
  isLogin: (state) => state.token !== "" || state.token !== null,
  userInfo: (state) => {
    const { userName, id, avatar, roles } = state;

    return {
      userName,
      id,
      avatar,
      roles,
    };
  },
  verifyResponse: (state) => {
    const { verifyResponse } = state;

    return verifyResponse;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
