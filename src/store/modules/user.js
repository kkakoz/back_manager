import { login, profile, register } from '@/api/user'
import { message } from '@/libs'
// import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: '',
    // 获取用户信息
    userInfo: {}
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    /**
     * 注册
     */
    async register(context, name, payload) {
      const { password } = payload
      // 注册
      return await register({
        name: name,
        password: password,
      })
    },
    /**
     * 登录
     */
    async login(context, name, password) {
      const { password } = payload
      const data = await login({
        name: name,
        password: password
      })
      // QQ 扫码登录，用户未注册
      if (data.code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
        return data.code
      }
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      const data = await profile()
      context.commit('setUserInfo', data)
      // 欢迎
      message(
        'success',
        `欢迎您 ${data.name} `,
        6000
      )
    },
    /**
     * 退出登录
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }
  }
}
