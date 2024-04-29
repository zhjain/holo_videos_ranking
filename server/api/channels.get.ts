export default defineEventHandler(async (event) => {
    console.log(234234);
    const body = await readBody(event)
    console.log(body);
    return { message: 'Hello world!' }
})