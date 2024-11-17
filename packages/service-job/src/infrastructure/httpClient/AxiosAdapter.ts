import axios, { AxiosResponse } from "axios";
import { HttpClient } from "../../ports/httpClient/HttpClient";

export class AxiosAdapter implements HttpClient {
  async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async post<T, U>(url: string, body: U): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(url, body);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async put<T, U>(url: string, body: U): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(url, body);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async patch<T, U>(url: string, body: U): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.patch(url, body);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(url);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `HTTP Error: ${error.response?.status} - ${error.response?.statusText}`
      );
    }
    throw new Error(`Unexpected Error: ${error.message}`);
  }
}
