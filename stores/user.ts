import type { User } from '~/types/user'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userinfo: ''
    }),
    actions: {
        async fetchLogin(params: any) {
            const { data } = await $fetch<ResponseBody<User>>('/api/user-logs', {
                method: 'POST',
                body: params
            }) as unknown as any
            this.userinfo = data
        }
    }
})