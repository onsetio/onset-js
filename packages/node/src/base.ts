import type { AxiosInstance } from "axios";

/**
 * `C` is the create (POST) payload. `U` is the update (PATCH) payload and
 * defaults to `Partial<C>` for resources where update just relaxes every
 * create field to optional. Pass `U` explicitly when a resource's update
 * body isn't a subset of its create body (e.g. a field is required on
 * create but not accepted at all on update).
 */
export abstract class Base<T, Q, C, U = Partial<C>> {
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

  async create(body: C): Promise<T> {
    const { data } = await this.client.post<T>(this.path, body);
    return data;
  }

  async update(id: string, body: U): Promise<T> {
    const { data } = await this.client.patch<T>(`${this.path}/${id}`, body);
    return data;
  }

  async del(id: string): Promise<{ success: boolean }> {
    const { data } = await this.client.delete<{ success: boolean }>(
      `${this.path}/${id}`
    );
    return data;
  }
}
