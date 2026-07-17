import type { AxiosInstance } from "axios";
import type { Project } from "./types";

type Query = Partial<{
  offset: number;
  limit: number;
  slug: string;
}>;

/**
 * Read-only access to a workspace's projects.
 * There is no create/update/delete API for projects; manage them from the
 * Onset dashboard.
 */
export class Projects {
  private client: AxiosInstance;
  private path = "/projects";

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params?: Query): Promise<Project[]> {
    const { data } = await this.client.get<Project[]>(this.path, { params });
    return data;
  }
}
