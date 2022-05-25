import axios from 'axios';
import { Label, Organization, Project, Release } from './interfaces';

export async function fetchData(page: string) {
  const { data: releases } = await axios.get<Release[]>(
    `https://${page}/releases.json`
  );
  const { data: organization } = await axios.get<Organization>(
    `https://${page}/data.json`
  );

  const seen = new Set();
  const projects: Project[] = [];
  const labels: Label[] = [];

  releases.forEach((release) => {
    if (!seen.has(release.project.id)) {
      projects.push(release.project);
    }

    seen.add(release.project.id);

    release.labels.forEach((label) => {
      if (!seen.has(label.id)) {
        labels.push(label);
      }

      seen.add(label.id);
    });
  });

  return {
    labels,
    releases,
    projects,
    organization,
  };
}

type ReactBody = {
  id: string;
  reaction: string;
};

export function releaseReact(page: string, data: ReactBody) {
  return axios.post(`https://${page}/api/react`, data);
}

type SubscribeBody = {
  email: string;
  organization_id: string;
};

export function newSubscriber(page: string, data: SubscribeBody) {
  return axios.post(`https://${page}/api/subscribe`, data);
}
