<script setup lang="ts">
import { string, objectAsync, minLength, type Input } from 'valibot'
import type { FormSubmitEvent } from '#ui/types'

const router = useRouter()

const schema = objectAsync({
    username: string([minLength(1, '请输入用户名')]),
    password: string([minLength(6, '请输入密码')])
})

type Schema = Input<typeof schema>

const state = reactive({
    username: '',
    password: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
    try {
        const { data, code, msg } = await $fetch('/api/user-logs', {
            method: 'POST',
            body: {
                username: event.data.username,
                password: event.data.password
            }
        }) as unknown as any
        if (code === 200) {
            router.push('/')
        }
    } catch (error:any) {
        console.log(error.response.data.msg)
    }

}
</script>

<template>
    <div class="w-content m-auto">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Username" name="username">
                <UInput v-model="state.username" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" />
            </UFormGroup>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
    </div>
</template>
