declare type ResponseBody<T> = {
  code: number;
  data: T;
  message: string;
};
