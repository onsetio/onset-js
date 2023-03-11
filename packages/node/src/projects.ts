import type { AxiosInstance } from 'axios';
import type { Roadmap, Integration, Project, Release } from 'interfaces';

type Payload = Omit<Project, 'id'>;

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Projects {
  private client: AxiosInstance;
  private path = '/projects';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params?: Query): Promise<Project[]> {
    const { data } = await this.client.get<Project[]>(this.path, { params });
    return data;
  }

  async create(body: Payload): Promise<Project> {
    const { data } = await this.client.post<Project>(this.path, body);
    return data;
  }

  async update(id: string, body: Payload): Promise<Project> {
    const { data } = await this.client.patch<Project>(
      `${this.path}/${id}`,
      body
    );
    return data;
  }

  async retrieve(id: string): Promise<Project> {
    const { data } = await this.client.get<Project>(`${this.path}/${id}`);
    return data;
  }

  async integrations(id: string): Promise<Integration[]> {
    const { data } = await this.client.get<Integration[]>(
      `${this.path}/${id}/integrations`
    );
    return data;
  }

  async releases(id: string): Promise<Release[]> {
    const { data } = await this.client.get<Release[]>(
      `${this.path}/${id}/releases`
    );
    return data;
  }

  async roadmap(id: string): Promise<Roadmap[]> {
    const { data } = await this.client.get<Roadmap[]>(
      `${this.path}/${id}/roadmap`
    );
    return data;
  }
}
