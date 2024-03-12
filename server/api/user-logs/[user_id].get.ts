export default defineEventHandler(async (event) => {
    const user_id = getRouterParams(event).user_id
    console.log(user_id);
    return { message: 'Hello world!' }
})