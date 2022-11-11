export interface ResponseType<T = any> {
  errorCode: number;
  errorMsg: string;
  data: T;
  page: {
    page: number;
    pageSize: number;
    count: number;
    totalPage: number;
  };
}
