export const state = {
  loading: false,
};

export const actions = {
  toggleLoading({ commit }, isShow) {
    if (isShow) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
    commit('SET_LOADING', isShow);
  },
};

export const mutations = {
  SET_LOADING: (state, isShow) => {
    state.loading = isShow;
  },
};

export const getters = {
  isLoading: state => state.loading,
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}