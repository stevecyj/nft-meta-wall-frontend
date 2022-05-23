import { login, logout, register } from "@/api/user";
import {
  getLocalStorageToken,
  setLocalStorageToken,
  removeLocalStorageToken,
} from "@/utils/auth";

export const state = {
  token: getLocalStorageToken(),
  name: "",
  id: "627fa403e11fff95efe0cde6", // test
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
      // console.log(data.user);

      commit("SET_TOKEN", data.user.token);
      commit("SET_VERIFY_RESPONSE", data);
      setLocalStorageToken(data.user.token);
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
  SET_NAME: (state, name) => {
    state.name = name;
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
    const { name, id, avatar, roles } = state;

    return {
      name,
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
