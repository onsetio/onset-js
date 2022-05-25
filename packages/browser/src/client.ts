import { fetchData, releaseReact, newSubscriber } from './utils';

export async function loadPage(page: string) {
  if (!page) {
    throw new Error('[ONSET] - Page slug is not defined.');
  }

  const data = await fetchData(page);

  return {
    organization: data.organization,
    labels(slug?: string) {
      if (!slug) {
        return data.labels;
      }

      return data.labels.filter((label) => label.slug === slug);
    },
    projects(slug: string) {
      if (!slug) {
        return data.projects;
      }

      return data.projects.filter((project) => project.slug === slug);
    },
    releases(project: string, slug?: string) {
      if (!project) {
        return data.releases;
      }

      return data.releases.filter((release) => {
        if (release.project.slug !== project) {
          return false;
        }

        if (!slug) {
          return true;
        }

        return release.slug === slug;
      });
    },
    react(id: string, reaction: 'disappointed' | 'neutral' | 'smiley') {
      return releaseReact(page, { id, reaction });
    },
    subscribe(email: string) {
      const organization_id = data.organization.id;
      return newSubscriber(page, { email, organization_id });
    },
  };
}
