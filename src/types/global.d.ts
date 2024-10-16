declare global {
    interface ResponseBody<T> {
        code: number;
        data: T;
        message: string;
    }
}
export { };