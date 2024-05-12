
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: ''
    }),
    actions: {
        getToken() {
            return this.token
        },
        setToken(token: string) {
            this.token = token
        },
        removeToken() {
            this.token = ''
        }
    }
})