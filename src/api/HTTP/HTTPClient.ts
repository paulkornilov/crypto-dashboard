import ky, { Options, HTTPError, TimeoutError, ResponsePromise } from 'ky';

interface HttpClientOptions extends Options {}

class HttpClient {
  private client;

  constructor(baseURL: string, defaultOptions?: HttpClientOptions) {
    this.client = ky.create({
      prefixUrl: baseURL,
      ...defaultOptions,
    });
  }

  private handleError(error: unknown): void {
    if (error instanceof HTTPError) {
      console.error('HTTP Error:', error.response.status, error.message);
    } else if (error instanceof TimeoutError) {
      console.error('Request timed out:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }

  private async handleResponse<T>(responsePromise: ResponsePromise): Promise<T | null> {
    try {
      const response = await responsePromise;

      return await response.json<T>();
    } catch (error) {
      this.handleError(error);

      return null;
    }
  }

  public get<T>(url: string, options?: HttpClientOptions): Promise<T | null> {
    return this.handleResponse<T>(this.client.get(url, options));
  }

  public post<T>(url: string, body?: unknown, options?: HttpClientOptions): Promise<T | null> {
    return this.handleResponse<T>(this.client.post(url, { json: body, ...options }));
  }

  public put<T>(url: string, body?: unknown, options?: HttpClientOptions): Promise<T | null> {
    return this.handleResponse<T>(this.client.put(url, { json: body, ...options }));
  }

  public delete<T>(url: string, options?: HttpClientOptions): Promise<T | null> {
    return this.handleResponse<T>(this.client.delete(url, options));
  }
}

export const apiClient = new HttpClient('https://api.example.com');
