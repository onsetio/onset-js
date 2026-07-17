import type { AxiosInstance } from "axios";
import type { Label } from "./types";

type Query = Partial<{
  offset: number;
  limit: number;
  slug: string;
}>;

/**
 * Read-only access to a workspace's labels.
 * There is no create/update/delete API for labels; manage them from the
 * Onset dashboard.
 */
export class Labels {
  private client: AxiosInstance;
  private path = "/labels";

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async list(params?: Query): Promise<Label[]> {
    const { data } = await this.client.get<Label[]>(this.path, { params });
    return data;
  }
}
