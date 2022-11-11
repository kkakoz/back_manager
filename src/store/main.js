import {
    createStore
} from "vuex";

const TOKEN_KEY = "TOKEN_KEY"

const main = createStore({
    state() {
        return {
            user: null,
            token: "",
            baseColor: "#fb7299",
        }
    },
    getters: {
        user(state) {
            if (state.user) {
                return state.user
            }
            let user = localStorage.getItem("user")
            if (user) {
                return JSON.parse(user)
            }
            return null
        },
        token(state) {
            if (state.token) {
                return state.token
            }
            let token = localStorage.getItem("user:token")
            if (token) {
                return token
            }
            return null
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            localStorage.setItem("user", JSON.stringify(data))
        },
        setToken(state, data) {
            state.token = data
            localStorage.setItem("user:token", data)
        },
        logout(state) {
            localStorage.removeItem("user")
            localStorage.removeItem("user:token")
            state.user = null
            state.token = null
        }
    },
    actions: {}
})

export default main