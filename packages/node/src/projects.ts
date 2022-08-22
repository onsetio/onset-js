import type { AxiosInstance } from 'axios';
import type { Feature, Integration, Project, Release } from 'interfaces';
import type { Query, ProjectBody } from './types';

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

  async create(body: ProjectBody): Promise<Project> {
    const { data } = await this.client.post<Project>(this.path, body);
    return data;
  }

  async update(id: string, body: ProjectBody): Promise<Project> {
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

  async roadmap(id: string): Promise<Feature[]> {
    const { data } = await this.client.get<Feature[]>(
      `${this.path}/${id}/roadmap`
    );
    return data;
  }
}
