import axios from "axios";
import type { Milestone } from "./types";

export class Roadmap {
  constructor(private page: string) {}

  async fetch(project?: string, slug?: string): Promise<Milestone[]> {
    const { data: roadmap, status } = await axios.get<Milestone[]>(
      `https://${this.page}/roadmap.json`
    );

    if (status !== 200) {
      throw new Error(
        `[ONSET] - Failed to fetch roadmap data for page: ${this.page}`
      );
    }

    let filteredRoadmap = roadmap;

    // Filter by project slug if provided
    if (project) {
      filteredRoadmap = filteredRoadmap.filter(
        (milestone) => milestone.project?.slug === project
      );
    }

    // Filter by milestone slug if provided
    if (slug) {
      filteredRoadmap = filteredRoadmap.filter(
        (milestone) => milestone.slug === slug
      );
    }

    return filteredRoadmap;
  }
}
