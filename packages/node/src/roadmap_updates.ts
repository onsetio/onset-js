import type { AxiosInstance } from 'axios';
import type { RoadmapUpdate } from 'interfaces';

type Payload = Pick<
  RoadmapUpdate,
  'status' | 'description' | 'progress' | 'released_at'
>;

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class RoadmapUpdates {
  private client: AxiosInstance;
  private path;

  constructor(client: AxiosInstance, id: string) {
    this.client = client;
    this.path = `/roadmap/${id}/updates`;
  }

  async list(params: Query = {}): Promise<RoadmapUpdate[]> {
    const { data } = await this.client.get<RoadmapUpdate[]>(this.path, {
      params,
    });
    return data;
  }

  async create(body: Payload): Promise<RoadmapUpdate> {
    const { data } = await this.client.post<RoadmapUpdate>(this.path, body);
    return data;
  }

  async retrieve(id: string): Promise<RoadmapUpdate> {
    const { data } = await this.client.get<RoadmapUpdate>(`${this.path}/${id}`);
    return data;
  }

  async update(id: string, body: Payload): Promise<RoadmapUpdate> {
    const { data } = await this.client.patch<RoadmapUpdate>(
      `${this.path}/${id}`,
      body
    );
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }
}
