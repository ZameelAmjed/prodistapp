import request from '@/utils/request'

const state = {
    list: [],
    cart: []
  }

const mutations = {
  SET_LIST: (state, data) => {
    if(data)
      state.list = data
    else
      state.list = []
  },
  SET_CART: (state, data) => {
    // if it's already there increase qty
    let itemInCart = false;
    state.cart.forEach(element => {
      if(data.id === element.id){
        element.qty = element.qty + 1
        element.total = parseFloat(element.retail_price * element.qty)
        itemInCart = true
      }
    });
    
    if(!itemInCart){
      data.qty = 1
      data.total = parseFloat(data.retail_price)
      state.cart.push(data)
    }else{
      const newData = state.cart
      state.cart = []
      newData.forEach(element => {
        state.cart.push(element)
      });
    }

    
  },
  CHANGE_CART_QTY: (state, data) => {
    state.cart[data.index].qty = data.value
    state.cart[data.index].total = parseFloat(data.value * state.cart[data.index].retail_price)
    const newData = state.cart
    state.cart = []
    newData.forEach(element => {
      state.cart.push(element)
    });
  },
  REMOVE_CART_ITEM: (state, removeIndex) => {
    const newData = state.cart
    state.cart = []
     newData.forEach((element, index) => {
       if(removeIndex !== index){
         state.cart.push(element)
       }
     });
  }
}

const actions = {
  // :todo change this next
  // get user info
  setSuggestions({ commit }, keyword) {
    return new Promise((resolve, reject) => {
        request({
            url: '/products?',
            method: 'get',
            params: { keyword }
          }).then(response => {
            console.log("HII")
        const { data } = response
        const parsedData = JSON.parse(data)
        commit('SET_LIST', parsedData)
        resolve(parsedData)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addCart({commit},data){
    commit('SET_CART', data)
    // clear suggestion
    commit('SET_LIST',null)
  },
  changeCartQty({commit}, data ){
    commit('CHANGE_CART_QTY', data)
  },
  removeCartItem({commit}, index){
    commit('REMOVE_CART_ITEM', index)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

