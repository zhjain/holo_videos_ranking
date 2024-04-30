export default defineEventHandler(async (event) => {
    console.log('New request from:', event.node.req.headers['x-forwarded-for']);
})