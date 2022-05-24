import type { AxiosInstance } from 'axios';
import type { Release } from 'interfaces';
import type {
  ReleaseQuery,
  ReleaseBody,
  ReleasePublishBody,
} from './types/release';

export class Releases {
  private client: AxiosInstance;
  private path = '/releases';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: ReleaseQuery = {}): Promise<Release[]> {
    let path = this.path;

    if (params.project_id) {
      path = `/projects/${params.project_id}/release`;
    }

    const { data } = await this.client.get<Release[]>(path, { params });
    return data;
  }

  async retrieve(id: string): Promise<Release> {
    const { data } = await this.client.get<Release>(`${this.path}/${id}`);
    return data;
  }

  async create(body: ReleaseBody): Promise<Release> {
    const path = `${this.path}/projects/${body.project_id}/releases`;
    const { data } = await this.client.post<Release>(path, body);
    return data;
  }

  async update(id: string, body: ReleaseBody): Promise<Release> {
    const { data } = await this.client.put<Release>(`${this.path}/${id}`, body);
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }

  async publish(id: string, body: ReleasePublishBody): Promise<Release> {
    const { data } = await this.client.post<Release>(
      `${this.path}/${id}/publish`,
      body
    );
    return data;
  }

  async revert(id: string): Promise<Release> {
    const { data } = await this.client.post<Release>(
      `${this.path}/${id}/revert`
    );
    return data;
  }
}
