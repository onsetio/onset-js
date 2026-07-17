import type { AxiosInstance } from "axios";
import type { Contributor } from "./types";

type Query = Partial<{
  offset: number;
  limit: number;
}>;

/**
 * Read-only access to a workspace's contributors (members that can be
 * assigned to releases). There is no create/update/delete API for
 * contributors; manage them from the Onset dashboard.
 */
export class Contributors {
  private client: AxiosInstance;
  private path = "/contributors";

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params?: Query): Promise<Contributor[]> {
    const { data } = await this.client.get<Contributor[]>(this.path, {
      params,
    });
    return data;
  }
}
