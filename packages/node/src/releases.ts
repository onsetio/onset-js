import type { AxiosInstance } from "axios";
import type { Release } from "interfaces";

type Payload = {
  title: string;
  body: string;
  is_public: boolean;
  status: Release["status"];
  slug: string;
  project_id?: string;
  label_ids?: string[];
  contributor_ids?: string[];
  attachments?: Release["attachments"];
  hero?: Release["hero"];
  changes?: Release["changes"];
  is_pinned?: boolean;
  is_pre_release?: boolean;
  version?: string;
};

type Query = {
  offset?: number;
  limit?: number;
  slug?: string;
  is_public?: boolean;
  status?: Release["status"];
  project_id?: string;
};

export class Releases {
  private client: AxiosInstance;
  private path = "/releases";

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
}
