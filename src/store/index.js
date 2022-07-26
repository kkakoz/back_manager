import {
  createStore
} from 'vuex'
// import category from './modules/category'
// import theme from './modules/theme'
// import app from './modules/app'
// import search from './modules/search'
import user from './modules/user'
import getters from './getters'

const store = createStore({
  getters,
  modules: {
    // category,
    // theme,
    // app,
    // search,
    user
  },
  plugins: [
  ]
})

export default store