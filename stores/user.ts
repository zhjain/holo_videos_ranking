import type { User } from '~/types/user'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userinfo: ''
    }),
    actions: {
        async fetchLogin(params: any) {
            try {
                const { data } = await $fetch<ResponseBody<User>>('/api/user-logs', {
                    method: 'POST',
                    body: params
                }) as unknown as any
                this.userinfo = data
                return data
            } catch (err) {
                // if (err instanceof Error && err.response) {
                //     // 这里可以访问响应体，err.response 是 HTTP 响应对象
                //     const responseBody = await err.response.json();  // 假设响应内容是 JSON 格式
                //     console.error('Error response:', responseBody);

                //     // 你可以根据响应体做进一步处理，例如显示错误信息等
                //     throw new Error(responseBody.message || 'Unknown error occurred');
                // } else {
                //     // 如果错误不是 HTTP 响应错误
                //     console.error('An unexpected error occurred:', err);
                //     throw new Error('An unexpected error occurred');
                // }
            }
        }
    }
})