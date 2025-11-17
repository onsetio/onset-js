import type { AxiosInstance } from "axios";
import type { Workspace as WorkspaceResult } from "./types";

export class Workspace {
  private client: AxiosInstance;
  private path = "/workspace";

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async retrieve(): Promise<WorkspaceResult> {
    const { data } = await this.client.get<WorkspaceResult>(this.path);
    return data;
  }
}
