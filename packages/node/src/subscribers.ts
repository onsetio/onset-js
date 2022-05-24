import type { AxiosInstance } from 'axios';
import type { Subscriber } from 'interfaces';
import type {
  SubscriberQuery,
  SubscriberUpdateBody,
  SubscriberCreateBody,
} from './types/subscriber';

export class Subscribers {
  private client: AxiosInstance;
  private path = '/subscribers';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: SubscriberQuery): Promise<Subscriber[]> {
    const { data } = await this.client.get(this.path, { params });
    return data;
  }

  async retrieve(id: string): Promise<Subscriber> {
    const { data } = await this.client.get(`${this.path}/${id}`);
    return data;
  }

  async create(body: SubscriberCreateBody): Promise<Subscriber> {
    const { data } = await this.client.post(`${this.path}/subscribers`, body);
    return data;
  }

  async update(id: string, body: SubscriberUpdateBody): Promise<Subscriber> {
    const { data } = await this.client.put(
      `${this.path}/subscribers/${id}`,
      body
    );
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }
}
