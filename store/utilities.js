
export const state = () => ({
  toastContent: null,
  toastColor: 'error'
})

export const mutations = {
  SET_TOAST_PROPTERTIES (state, payload) {
    state.toastContent = payload.toastContent
    if (payload.toastColor != null) { state.toastColor = payload.toastColor }
  }
}

export const actions = {

  showMessage ({ commit }, payload) {
    commit('SET_TOAST_PROPTERTIES', payload)
  }

}

export const getters = {
  toast: (state) => { return { toastContent: state.toastContent, toastColor: state.toastColor } }
}
