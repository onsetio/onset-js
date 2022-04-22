import axios from 'axios';
import { Organization, Project, Release } from './interfaces';

export async function fetchData(page: string) {
  const { data: releases } = await axios.get<Release[]>(
    `https://${page}/releases.json`
  );
  const { data: organization } = await axios.get<Organization>(
    `https://${page}/data.json`
  );

  const seen = new Set();
  const projects: Project[] = [];

  releases.forEach(({ project }) => {
    if (!seen.has(project.id)) {
      projects.push(project);
    }

    seen.add(project.id);
  });

  return {
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
