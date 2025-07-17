<script lang="ts">
    import { goto } from "$app/navigation"
    import { customFetch } from "$lib/api"
    import { authStore } from "$lib/stores/authStore"
    import { userStore } from "$lib/stores/userStore"

    // 表单状态
    let username = $state("")
    let password = $state("")
    let confirmPassword = $state("") // 新增确认密码状态
    let errors: { username?: string; password?: string; confirmPassword?: string } = $state({})
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

        if (confirmPassword.trim().length < 6) {
            errors.confirmPassword = "确认密码至少6个字符"
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "两次输入的密码不一致"
        }

        return Object.keys(errors).length === 0
    }

    async function handleRegister() {
        // 重置错误
        errors = {}
        globalError = ""

        // 表单验证
        if (!validateForm()) {
            return
        }

        try {
            loading = true

            // 模拟注册请求
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })

            const { code, data, message } = await response.json()

            if (code === 200) {
                // 注册成功，跳转到首页或登录页
                userStore.login(data.user)
                authStore.login({ token: data.token, expires: 15 * 60 })
                await goto("/") // 或者 goto("/login")
            } else {
                // 注册失败，显示错误信息
                globalError = message || "注册失败"
            }
        } catch (error) {
            globalError = "发生未知错误"
        } finally {
            loading = false
        }
    }
</script>

<div
    class="flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-800">
    <div
        class="z-10 w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg dark:bg-gray-700 dark:shadow-2xl">
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">创建新账户</h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">填写您的注册信息</p>
        </div>

        <form
            class="mt-8 space-y-6"
            onsubmit={event => {
                event.preventDefault()
                handleRegister()
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

            <div>
                <label
                    for="confirm-password"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    确认密码
                </label>
                <div class="mt-1">
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        bind:value={confirmPassword}
                        class="relative block w-full appearance-none border px-3 py-2
                                {errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
                                rounded-md text-gray-900 placeholder-gray-500
                                focus:z-10 focus:border-indigo-500 focus:outline-none
                                focus:ring-indigo-500 sm:text-sm
                                dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="请再次输入密码" />
                </div>
                {#if errors.confirmPassword}
                    <p class="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                {/if}
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
                        注册中...
                    {:else}
                        注册
                    {/if}
                </button>
            </div>
        </form>

        <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">
                已有账户？
                <a
                    href="/login"
                    class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    立即登录
                </a>
            </p>
        </div>
    </div>
</div>