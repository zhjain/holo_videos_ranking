

export const useAuthFetch = <Data = any>(url: string, fetchOptions: any = {}) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    if (!token)
        return $fetch<Data>(url, fetchOptions);

    // Extend the headers with the Authorization token
    const options = {
        ...fetchOptions,
        headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${token}`,
        },
    };

    return $fetch<Data>(url, options);
};