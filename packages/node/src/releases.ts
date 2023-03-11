import type { AxiosInstance } from 'axios';
import type { Release } from 'interfaces';

type Payload = Pick<
  Release,
  | 'title'
  | 'slug'
  | 'description'
  | 'released_at'
  | 'is_pinned'
  | 'change_list'
  | 'version'
  | 'is_pre_release'
  | 'pre_release_version'
  | 'pre_release_status'
  | 'project_id'
  | 'label_ids'
>;

type AppendPayload = Pick<Payload, 'description' | 'change_list'>;

type PublishPayload = {
  email?: boolean;
  integrations?: string[];
};

type Query = Partial<
  Pick<Release, 'slug' | 'status' | 'is_public' | 'project_id'> & {
    offset: number;
    limit: number;
  }
>;

export class Releases {
  private client: AxiosInstance;
  private path = '/releases';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: Query = {}): Promise<Release[]> {
    const { data } = await this.client.get<Release[]>(this.path, { params });
    return data;
  }

  async retrieve(id: string): Promise<Release> {
    const { data } = await this.client.get<Release>(`${this.path}/${id}`);
    return data;
  }

  async create(body: Payload): Promise<Release> {
    const { data } = await this.client.post<Release>(this.path, body);
    return data;
  }

  async update(id: string, body: Payload): Promise<Release> {
    const { data } = await this.client.put<Release>(`${this.path}/${id}`, body);
    return data;
  }

  async del(id: string): Promise<void> {
    const { data } = await this.client.delete(`${this.path}/${id}`);
    return data;
  }

  async publish(id: string, body: PublishPayload): Promise<Release> {
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

  async append(id: string, body: AppendPayload): Promise<Release> {
    const { data } = await this.client.post<Release>(
      `${this.path}/${id}/append`,
      body
    );
    return data;
  }
}
