export const state = () => ({
  initialPayrolls: []
})

export const mutations = {
  SET_PAYROLLS (state, payload) {
    state.initialPayrolls = payload
  }
}

export const actions = {
  async getUserSplitters ({ commit }, payload) {
    const contractInstance = await this.$PSHandler()
    let p = await contractInstance.connect(await this.$MeSigner())._payment_splitters_registry(payload)
    p = p.toString()
    for (const s in p) {
      console.log('wtf: ', s)
    }
    commit('SET_PAYROLLS', [])
  }
}

export const getters = {
  initialPayrolls: (state) => { return state.initialPayrolls }
}
