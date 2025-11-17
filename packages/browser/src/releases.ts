import axios from "axios";
import type { Release } from "./types";

export class Releases {
  constructor(private page: string) {}

  async fetch(project?: string, slug?: string): Promise<Release[]> {
    const { data: releases } = await axios.get<Release[]>(
      `https://${this.page}/releases.json`
    );

    if (!project) {
      return releases;
    }

    return releases.filter((release) => {
      if (!release.project) {
        return false;
      }

      if (release.project.slug !== project) {
        return false;
      }

      if (!slug) {
        return true;
      }

      return release.slug === slug;
    });
  }
}
