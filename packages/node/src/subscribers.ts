import type { AxiosInstance } from 'axios';
import type { Subscriber } from 'interfaces';

type Payload = Pick<Subscriber, 'email' | 'is_public'>;

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Subscribers {
  private client: AxiosInstance;
  private path = '/subscribers';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: Query): Promise<Subscriber[]> {
    const { data } = await this.client.get(this.path, { params });
    return data;
  }

  async create(body: Payload): Promise<Subscriber> {
    const { data } = await this.client.post(this.path, body);
    return data;
  }

  async retrieve(id: string): Promise<Subscriber> {
    const { data } = await this.client.get(`${this.path}/${id}`);
    return data;
  }

  async update(id: string, body: Payload): Promise<Subscriber> {
    const { data } = await this.client.put(`${this.path}/${id}`, body);
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }
}
