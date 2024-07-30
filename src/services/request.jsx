import axios from 'axios';

const DEFAULT_CONFIG = {
  baseURL: 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const client = axios.create({
  DEFAULT_CONFIG,
});

export const request = async (options) => {
  const token = localStorage.getItem('token');
  token !== '' && (client.defaults.headers.common.Authorization = `Bearer ${token}`);

  const onSuccess = (response) => {
    return response?.data?.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
