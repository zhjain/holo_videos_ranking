<script lang="ts">
    import { goto } from "$app/navigation"
    import { customFetch } from "$lib/api"
    import { authStore } from "$lib/stores/authStore"
    import { userStore } from "$lib/stores/userStore"

    // 表单状态
    let username = $state("")
    let password = $state("")
    let rememberMe = $state(false) // 新增记住用户复选框状态
    let errors: { username?: string; password?: string } = $state({})
    let loading = $state(false)
    let globalError = $state("")

    function validateForm() {
        errors = {}

        if (username.trim().length < 2) {
            errors.username = "用户名至少2个字符"
        }

        if (password.trim().length < 6) {
            errors.password = "密码至少6个字符"
        }

        return Object.keys(errors).length === 0
    }

    async function handleLogin() {
        // 重置错误
        errors = {}
        globalError = ""

        // 表单验证
        if (!validateForm()) {
            return
        }

        try {
            loading = true

            // 模拟登录请求
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })

            const { code, data, message } = await response.json()

            if (code === 200) {
                // 登录成功，跳转到首页
                userStore.login(data.user)
                authStore.login({ token: data.token, expires: 15 * 60 })
                // 如果选择记住用户，将用户名保存到本地存储
                if (rememberMe) {
                    localStorage.setItem("rememberedUsername", username)
                } else {
                    localStorage.removeItem("rememberedUsername")
                }

                await goto("/")
            } else {
                // 登录失败，显示错误信息
                globalError = message || "登录失败"
            }
        } catch (error) {
            globalError = "发生未知错误"
        } finally {
            loading = false
        }
    }

    // 在组件初始化时，检查是否有记住的用户名
    $effect(() => {
        const rememberedUsername = localStorage.getItem("rememberedUsername")
        if (rememberedUsername) {
            username = rememberedUsername
            rememberMe = true
        }
    })

    async function refresh() {
        const response = await fetch("/api/auth/refresh", {
            method: "GET"
        })
        const { code, data, message } = await response.json()
        console.log("refresh====>", data, message, code)
        if (code === 200) {
            userStore.updateUser(data.user)
            authStore.refresh({ token: data.token, expires: 15 * 60 })
        }
    }

    async function logout() {
        const { code, message } = await customFetch(
            "/api/auth/logout",
            {
                method: "GET"
            },
            true
        )
        if (code === 200) {
            userStore.logout()
            authStore.logout()
        }
    }
</script>

<div
    class="flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-800">
    <div
        class="z-10 w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg dark:bg-gray-700 dark:shadow-2xl">
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">欢迎回来</h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">请输入您的账户信息</p>
        </div>

        <form
            class="mt-8 space-y-6"
            onsubmit={event => {
                event.preventDefault()
                handleLogin()
            }}>
            <div>
                <label
                    for="username"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    用户名
                </label>
                <div class="mt-1">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        bind:value={username}
                        class="relative block w-full appearance-none border px-3 py-2
                                {errors.username ? 'border-red-500' : 'border-gray-300'}
                                rounded-md text-gray-900 placeholder-gray-500
                                focus:z-10 focus:border-indigo-500 focus:outline-none
                                focus:ring-indigo-500 sm:text-sm
                                dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="请输入用户名" />
                </div>
                {#if errors.username}
                    <p class="mt-2 text-sm text-red-600">{errors.username}</p>
                {/if}
            </div>

            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    密码
                </label>
                <div class="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        bind:value={password}
                        class="relative block w-full appearance-none border px-3 py-2
                                {errors.password ? 'border-red-500' : 'border-gray-300'}
                                rounded-md text-gray-900 placeholder-gray-500
                                focus:z-10 focus:border-indigo-500 focus:outline-none
                                focus:ring-indigo-500 sm:text-sm
                                dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="请输入密码" />
                </div>
                {#if errors.password}
                    <p class="mt-2 text-sm text-red-600">{errors.password}</p>
                {/if}
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        bind:checked={rememberMe}
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label
                        for="remember-me"
                        class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        记住用户名
                    </label>
                </div>

                <div class="text-sm">
                    <a
                        href="/forgot-password"
                        class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        忘记密码？
                    </a>
                </div>
            </div>

            {#if globalError}
                <div
                    class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700
                    dark:border-red-700 dark:bg-red-900 dark:text-red-300"
                    role="alert">
                    <span class="block sm:inline">{globalError}</span>
                </div>
            {/if}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600
                            px-4 py-2 text-sm font-medium text-white
                            hover:bg-indigo-700 focus:outline-none focus:ring-2
                            focus:ring-indigo-500 focus:ring-offset-2
                            {loading ? 'cursor-not-allowed opacity-50' : ''}">
                    {#if loading}
                        <svg
                            class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        登录中...
                    {:else}
                        登录
                    {/if}
                </button>
            </div>
        </form>

        <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">
                还没有账户？
                <a
                    href="/register"
                    class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    立即注册
                </a>
            </p>
        </div>
    </div>
</div>
