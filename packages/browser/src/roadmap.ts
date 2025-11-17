import axios from "axios";
import type { Milestone } from "./types";

export class Roadmap {
  constructor(private page: string) {}

  async fetch(project?: string, slug?: string): Promise<Milestone[]> {
    const { data: roadmap } = await axios.get<Milestone[]>(
      `https://${this.page}/roadmap.json`
    );

    if (!project) {
      return roadmap;
    }

    return roadmap.filter((feature) => {
      if (!feature.project) {
        return false;
      }

      if (feature.project.slug !== project) {
        return false;
      }

      if (!slug) {
        return true;
      }

      return feature.slug === slug;
    });
  }
}
