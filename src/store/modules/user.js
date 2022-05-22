import { login, logout } from "@/api/user";
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
      setLocalStorageToken(data.user.token);
    } catch (error) {
      console.log(error);

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

  resetLocalStorageToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeLocalStorageToken();
      resolve();
    });
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
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
