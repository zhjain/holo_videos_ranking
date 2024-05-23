
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: ''
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.token !== '';
        }
    },
    actions: {
        getToken() {
            return this.token
        },
        setToken(token: string) {
            this.token = token
        },
        removeToken() {
            this.token = ''
        },

    }
})