import type { AxiosInstance } from "axios";

export abstract class Base<T, Q, P> {
  protected abstract path: string;

  constructor(private client: AxiosInstance) {}

  async list(params: Q): Promise<T[]> {
    const { data } = await this.client.get<T[]>(this.path, { params });
    return data;
  }

  async retrieve(id: string): Promise<T> {
    const { data } = await this.client.get<T>(`${this.path}/${id}`);
    return data;
  }

  async create(body: P): Promise<T> {
    const { data } = await this.client.post<T>(this.path, body);
    return data;
  }

  async update(id: string, body: P): Promise<T> {
    const { data } = await this.client.put<T>(`${this.path}/${id}`, body);
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }
}