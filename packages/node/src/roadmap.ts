import type { AxiosInstance } from 'axios';
import type { Roadmap as IRoadmap } from 'interfaces';
import { RoadmapUpdates } from './roadmap_updates';

type Payload = Pick<
  IRoadmap,
  | 'title'
  | 'slug'
  | 'status'
  | 'description'
  | 'progress'
  | 'is_public'
  | 'label_ids'
  | 'project_id'
  | 'released_at'
>;

type Query = Partial<
  Pick<IRoadmap, 'slug' | 'status' | 'is_public' | 'project_id'> & {
    offset: number;
    limit: number;
  }
>;

export class Roadmap {
  private client: AxiosInstance;
  private path = '/roadmap';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: Query = {}): Promise<IRoadmap[]> {
    const { data } = await this.client.get<IRoadmap[]>(this.path, { params });
    return data;
  }

  async create(body: Payload): Promise<IRoadmap> {
    const { data } = await this.client.post<IRoadmap>(this.path, body);
    return data;
  }

  async retrieve(id: string): Promise<IRoadmap> {
    const { data } = await this.client.get<IRoadmap>(`${this.path}/${id}`);
    return data;
  }

  async update(id: string, body: Payload): Promise<IRoadmap> {
    const { data } = await this.client.patch<IRoadmap>(
      `${this.path}/${id}`,
      body
    );
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }

  async vote(id: string): Promise<IRoadmap> {
    const { data } = await this.client.post<IRoadmap>(
      `${this.path}/${id}/vote`
    );
    return data;
  }

  async archive(id: string): Promise<IRoadmap> {
    const { data } = await this.client.post<IRoadmap>(
      `${this.path}/${id}/archive`
    );
    return data;
  }

  async unarchive(id: string): Promise<IRoadmap> {
    const { data } = await this.client.post<IRoadmap>(
      `${this.path}/${id}/unarchive`
    );
    return data;
  }

  updates(id: string) {
    return new RoadmapUpdates(this.client, id);
  }
}
