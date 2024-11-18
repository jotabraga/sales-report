export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T, U>(url: string, body: U): Promise<T>;
  put<T, U>(url: string, body: U): Promise<T>;
  patch<T, U>(url: string, body: U): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
