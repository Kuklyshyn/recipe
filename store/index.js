import Vue from 'vue'
import Vuex from 'vuex'
import {urlCategoryApi} from "../utils";

Vue.use(Vuex)


export const state = () => ({
  category: []
})

export const mutations = {
    SET_CATEGORY(state, payload) {
        state.category = payload
  }
}

export const actions = {

    async getCategoryLocation ({ commit }) {
        let fetchLoc = []
        const { data } = await this.$axios.get(urlCategoryApi)
        let temp = JSON.parse(data)
        // if (temp) {
        //     for(var key in temp) {
        //     if(temp[key].country.length) {
        //         fetchLoc.push(temp[key].country)
        //     }
        //     }    
        // }
        commit('SET_CATEGORY', temp)
    },
    setCategory ({ commit }, params) {
      // console.log({params})
        commit('SET_CATEGORY', params)
    }
  
}



export default {
  state,
  actions,
  mutations
}
