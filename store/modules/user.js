export default {
    namespaced: true,
    state: {
        token: uni.getStorageSync('token'),
		isLogin:false,
        tokenExpired: uni.getStorageSync('uni_id_token_expired'),
        userInfo: {}
    },
    getters: {
        isLogin(state) {
            return !!state.token
        }
    },
    mutations: {
        SET_TOKEN: (state, {
            token
        }) => {
            state.token = token
            uni.setStorageSync('token', token)
        },
        REMOVE_TOKEN: (state) => {
            state.token = ''
            state.tokenExpired = 0
            state.userInfo = {}
            uni.removeStorageSync('uni_id_token')
            uni.removeStorageSync('uni_id_token_expired')
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    actions: {}
}
