import type { AxiosInstance } from 'axios';
import type { Integration, Project } from 'interfaces';
import type { ProjectQuery } from './types/project';

export class Projects {
  private client: AxiosInstance;
  private path = '/projects';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params?: ProjectQuery): Promise<Project[]> {
    const { data } = await this.client.get<Project[]>(this.path, { params });
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
}
