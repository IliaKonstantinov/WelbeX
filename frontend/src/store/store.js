import { createStore } from 'vuex'
import axios from '../http/axios'



const store = createStore({
  state: {
    data: []
  },
  actions: {
    async getItems({commit}) {
      const { data } = await axios.get('/api/all');
      commit('fetchItems', data);
    },
    async createItem({commit, dispatch}, params) {
      await axios.post('/api/create', params)
      const data = dispatch('getItems')
      commit('fetchItems', data);
    },
    async deleteItem(ctx, params) {
      await axios.post('/api/delete', params)
    }
  },
  mutations: {
    fetchItems(state, items) {
      state.data = items;
    }
  },
  getters: {
    items(state) {
      return state.data;
    }
  }
})

export default store;