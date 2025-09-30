import type { AxiosInstance } from "axios";
import type { Milestone } from "interfaces";

type Payload = {
  title: string;
  body: string;
  is_public: boolean;
  status: string;
  stage: Milestone["stage"];
  slug: string;
  label_ids: string[];
  project_id?: string;
  attachments: Milestone["attachments"];
};

type Query = {
  status?: string;
  project_id?: string;
  is_public?: boolean;
  slug?: string;
  offset?: number;
  limit?: number;
};

export class Roadmap {
  private client: AxiosInstance;
  private path = "/roadmap";

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params: Query = {}): Promise<Milestone[]> {
    const { data } = await this.client.get<Milestone[]>(this.path, { params });
    return data;
  }

  async create(body: Payload): Promise<Milestone> {
    const { data } = await this.client.post<Milestone>(this.path, body);
    return data;
  }

  async retrieve(id: string): Promise<Milestone> {
    const { data } = await this.client.get<Milestone>(`${this.path}/${id}`);
    return data;
  }

  async update(id: string, body: Payload): Promise<Milestone> {
    const { data } = await this.client.patch<Milestone>(
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
