import type { AxiosInstance } from 'axios';
import type { Label } from 'interfaces';
import type { Query, LabelBody } from './types';

export class Labels {
  private client: AxiosInstance;
  private path = '/labels';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: Query): Promise<Label[]> {
    const { data } = await this.client.get(this.path, { params });
    return data;
  }

  async create(body: LabelBody): Promise<Label> {
    const { data } = await this.client.post(this.path, body);
    return data;
  }

  async retrieve(id: string): Promise<Label> {
    const { data } = await this.client.get(`${this.path}/${id}`);
    return data;
  }

  async update(id: string, body: LabelBody): Promise<Label> {
    const { data } = await this.client.patch(`${this.path}/${id}`, body);
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }
}
