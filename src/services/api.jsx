import axios from 'axios';

const DEFAULT_CONFIG = {
  baseURL: 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

class Api {
  constructor(config = {}) {
    this.instance = axios.create({
      ...DEFAULT_CONFIG,
      ...config,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  get(url, config = {}) {
    return this.instance.get(url, config);
  }

  post(url, data, config = {}) {
    return this.instance.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.instance.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config);
  }

  async login(username, password) {
    try {
      const response = await this.get('/auth/token');
      //const response = await this.post('/auth/token', { username, password });
      console.log(response);
      if (response.token) {
        localStorage.setItem('token', response.token);
        return response;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

const api = new Api();
export default api;
