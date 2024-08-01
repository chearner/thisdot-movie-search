import { request } from '../utils/axiosRequest';

export const getToken = () =>
  request({
    url: `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token`,
    method: 'GET',
  });
