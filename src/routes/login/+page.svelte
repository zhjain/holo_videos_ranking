<script lang="ts">
    import { goto } from "$app/navigation"
    import { customFetch } from "$lib/api"
    import { userStore } from "$lib/stores/userStore"

    // 表单状态
    let username = ""
    let password = ""
    let errors: { username?: string; password?: string } = {}
    let loading = false
    let globalError = ""

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
                console.log(data)
                userStore.login(data.user)
                // await goto("/")
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

    async function refresh() {
        const response = await fetch("/api/auth/refresh", {
            method: "GET"
        })
        const { code, data, message } = await response.json()
        console.log('refresh====>', data, message, code)
        if (code === 200) {
            userStore.updateUser(data.user)
        }
    }

    async function logout() {
        const response = await customFetch("/api/auth/logout", {
            method: "GET"
        })
        const { code, message } = await response.json()
        console.log('logout====>', code, message)
        if (code === 200) {
            userStore.logout()
        }
    }
</script>

<div class="flex w-full flex-col items-center justify-center px-8 py-10">
    <div class="mb-8 text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">欢迎回来</h2>
        <p class="mt-2 text-sm text-gray-600">请输入您的账户信息</p>
    </div>

    <form class="space-y-6" on:submit|preventDefault={handleLogin}>
        <div>
            <label for="username" class="mb-2 block text-sm font-medium text-gray-700">
                用户名
            </label>
            <input
                id="username"
                name="username"
                type="text"
                required
                bind:value={username}
                class="w-full border px-4 py-3 {errors.username
                    ? 'border-red-500'
                    : 'border-gray-300'} 
                               rounded-lg transition duration-300 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入用户名" />
            {#if errors.username}
                <p class="mt-1 text-sm text-red-500">{errors.username}</p>
            {/if}
        </div>

        <div>
            <label for="password" class="mb-2 block text-sm font-medium text-gray-700">
                密码
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                bind:value={password}
                class="w-full border px-4 py-3 {errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'} 
                               rounded-lg transition duration-300 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入密码" />
            {#if errors.password}
                <p class="mt-1 text-sm text-red-500">{errors.password}</p>
            {/if}
        </div>

        {#if globalError}
            <div class="rounded-lg bg-red-50 py-2 text-center text-sm text-red-500">
                {globalError}
            </div>
        {/if}

        <div>
            <button
                type="submit"
                disabled={loading}
                class="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4
                               py-3 font-semibold text-white transition
                               duration-300 ease-in-out hover:opacity-90
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                               {loading ? 'cursor-not-allowed opacity-50' : ''}">
                {loading ? "登录中..." : "登录"}
            </button>
        </div>
    </form>

    <div>
        <p>当前用户：{$userStore.username}</p>
        <button on:click={() => refresh()}>更新用户</button>
        <button on:click={() => logout()}>退出登录</button>
    </div>

    <div class="mt-6 text-center">
        <a
            href="/register"
            class="text-sm text-blue-600 transition duration-300 hover:text-blue-800">
            还没有账户？立即注册
        </a>
    </div>
</div>
