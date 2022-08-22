import type { AxiosInstance } from 'axios';
import type { Feature } from 'interfaces';
import type { Query, FeatureBody } from './types';

export class Roadmap {
  private client: AxiosInstance;
  private path = '/roadmap';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: Query = {}): Promise<Feature[]> {
    const { data } = await this.client.get<Feature[]>(this.path, { params });
    return data;
  }

  async create(body: FeatureBody): Promise<Feature> {
    const { data } = await this.client.post<Feature>(this.path, body);
    return data;
  }

  async retrieve(id: string): Promise<Feature> {
    const { data } = await this.client.get<Feature>(`${this.path}/${id}`);
    return data;
  }

  async update(id: string, body: FeatureBody): Promise<Feature> {
    const { data } = await this.client.patch<Feature>(
      `${this.path}/${id}`,
      body
    );
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }

  async vote(id: string): Promise<Feature> {
    const { data } = await this.client.post<Feature>(`${this.path}/${id}/vote`);
    return data;
  }

  async archive(id: string): Promise<Feature> {
    const { data } = await this.client.post<Feature>(
      `${this.path}/${id}/archive`
    );
    return data;
  }

  async unarchive(id: string): Promise<Feature> {
    const { data } = await this.client.post<Feature>(
      `${this.path}/${id}/unarchive`
    );
    return data;
  }
}
