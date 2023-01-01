export const state = () => ({
  isAuth: false
})

export const mutations = {
  SET_AUTH (state) {
    state.isAuth = !state.isAuth
  }
}

export const actions = {
  logInlogOut ({ commit }) {
    commit('SET_AUTH')
  }
}

export const getters = {
  isAuth: (state) => { return state.isAuth }
}
