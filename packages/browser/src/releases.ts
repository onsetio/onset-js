import axios from "axios";
import type { Release } from "./types";

export class Releases {
  constructor(private page: string) {}

  async fetch(project?: string, slug?: string): Promise<Release[]> {
    const { data: releases, status } = await axios.get<Release[]>(
      `https://${this.page}/releases.json`
    );

    if (status !== 200) {
      throw new Error(
        `[ONSET] - Failed to fetch releases data for page: ${this.page}`
      );
    }

    let filteredReleases = releases;

    // Filter by project slug if provided
    if (project) {
      filteredReleases = filteredReleases.filter(
        (release) => release.project?.slug === project
      );
    }

    // Filter by release slug if provided
    if (slug) {
      filteredReleases = filteredReleases.filter(
        (release) => release.slug === slug
      );
    }

    return filteredReleases;
  }
}
