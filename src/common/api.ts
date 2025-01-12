import axios from 'axios';

export type HttpMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'upload'
  | 'download'
  | 'downpost';

export interface UniResponse<T = any, D = any> {
  statusCode: number;
  message: string;
  data: T[];
}

const api = async <T>(
  method: HttpMethod,
  url: string,
  params?: Record<string, any>,
  body?: Record<string, any> | FormData
): Promise<UniResponse<T>> => {
  if (!url.startsWith('/opensoop')) {
    url = `/opensoop${!url.startsWith('/') ? '/' + url : url}`;
  }

  try {
    const config: Record<string, any> = {};

    if (method === 'get' || method === 'download') {
      config.params = params;
    }

    if (method !== 'get') {
      if (params) {
        config.params = params;
      }
      if (body) {
        config.data = body;
      }
    }

    if (method === 'upload' || body instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }

    if (method === 'download' || method === 'downpost') {
      config.responseType = 'blob';
    }

    const response = await axios({ method, url, ...config });
    const data = response.data;

    return {
      statusCode: data.statusCode ?? response.status,
      message: data.message ?? response.statusText,
      data: data.data ?? [],
    };
  } catch (error: any) {
    throw {
      statusCode: error.response?.status ?? 500,
      message: error.response?.data?.message ?? error.message,
      data: [],
    };
  }
};

export default api;