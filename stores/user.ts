import type { User } from '~/types/user'


export const useUserStore = defineStore('userStore', {
    state: () => ({
        userinfo: {} as any
    }),
    actions: {
        async fetchLogin(params: any) {
            const authStore = useAuthStore()
            try {
                const { data } = await $fetch<ResponseBody<User>>('/api/user-logs', {
                    method: 'POST',
                    body: params,
                    
                }) as unknown as any
                this.userinfo = data
                authStore.setToken(data.token)
                return data
            } catch (err) {
                const error = err as any; // 或者更具体的类型，如果你知道的话
                if (error.response) {
                    const responseBody = await error.response._data;
                    // console.error('Error11 response:', responseBody);
                    throw new Error(responseBody.message);
                } else {
                    // console.error('An unexpected error occurred:', err);
                    throw new Error('An unexpected error occurred');
                }
            }
        }
    }
})