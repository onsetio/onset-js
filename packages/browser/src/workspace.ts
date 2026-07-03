import axios from "axios";
import type { Workspace as WorkspaceType } from "./types";

export class Workspace {
  constructor(private page: string) {}

  async fetch(): Promise<WorkspaceType[]> {
    const { data: workspace, status } = await axios.get<WorkspaceType[]>(
      `https://${this.page}/data.json`
    );

    if (status !== 200) {
      throw new Error(
        `[ONSET] - Failed to fetch workspace data for page: ${this.page}`
      );
    }

    return workspace;
  }
}
