const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  suggestion: state => state.suggestion.list,
  cart: state => state.suggestion.cart,
}
export default getters
