import axios from "axios";

type ApiOptions = {
  params?: any;
  headers?: any;
  data?: any;
  cancelToken?: any;
  signal?: AbortSignal;
};

class ApiService {
  static get(url: string, options: ApiOptions = {}) {
    return axios.get(url, {
      params: options.params,
      headers: options.headers,
    });
  }

  static post(url: string, options: ApiOptions = {}) {
    return axios.post(url, options.data, {
      headers: options.headers,
      params: options.params,
      cancelToken: options.cancelToken,
      signal: options.signal,
    });
  }

  static put(url: string, options: ApiOptions = {}) {
    return axios.put(url, options.data, {
      headers: options.headers,
      params: options.params,
    });
  }

  static patch(url: string, options: ApiOptions = {}) {
    return axios.patch(url, options.data, {
      headers: options.headers,
      params: options.params,
    });
  }

  static delete(url: string, options: ApiOptions = {}) {
    return axios.delete(url, {
      data: options.data,
      headers: options.headers,
      params: options.params,
    });
  }
}

export default ApiService;
