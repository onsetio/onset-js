import axios from 'axios';
import { Label, Organization, Project, Release, Feature } from './interfaces';

export async function fetchData(page: string) {
  const { data: releases } = await axios.get<Release[]>(
    `https://${page}/releases.json`
  );

  const { data: roadmap } = await axios.get<Feature[]>(
    `https://${page}/roadmap.json`
  );

  const { data: organization } = await axios.get<Organization>(
    `https://${page}/data.json`
  );

  const projects = new Map<string, Project>();
  const labels = new Map<string, Label>();

  releases.forEach((release) => {
    if (release.project) {
      projects.set(release.project.slug, release.project);
    }

    release.labels.forEach((label) => labels.set(label.slug, label));
  });

  roadmap.forEach((feature) => {
    if (feature.project) {
      projects.set(feature.project.slug, feature.project);
    }

    feature.labels.forEach((label) => labels.set(label.slug, label));
  });

  return {
    roadmap,
    releases,
    organization,
    labels: Array.from(labels.values()),
    projects: Array.from(projects.values()),
  };
}

type ReactBody = {
  id: string;
  reaction: string;
};

export function releaseReact(page: string, data: ReactBody) {
  return axios.post(`https://${page}/api/react`, data);
}

type VoteBody = {
  id: string;
};

export function roadmapVote(page: string, data: VoteBody) {
  return axios.post(`https://${page}/api/vote`, data);
}

type SubscribeBody = {
  email: string;
};

export function newSubscriber(page: string, data: SubscribeBody) {
  return axios.post(`https://${page}/api/subscribe`, data);
}
