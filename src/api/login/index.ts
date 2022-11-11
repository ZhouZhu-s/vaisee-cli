import http from '@/utils/http';
import { PostLoginParams } from './types';

enum API {
  Login = '/test',
}

export const postLoginApi = async (data: PostLoginParams) => {
  const { data: results } = await http.post<string>(API.Login, data);
  return results.errorCode === 10200 ? results.data : null;
};
