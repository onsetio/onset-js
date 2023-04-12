import { fetchData, releaseReact, newSubscriber, roadmapVote } from './utils';

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
    projects(slug?: string) {
      if (!slug) {
        return data.projects;
      }

      return data.projects.filter((project) => project.slug === slug);
    },
    releases(project?: string, slug?: string) {
      if (!project) {
        return data.releases;
      }

      return data.releases.filter((release) => {
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
    },
    roadmap(project?: string, slug?: string) {
      if (!project) {
        return data.roadmap;
      }

      return data.roadmap.filter((feature) => {
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
    },
    vote(id: string) {
      return roadmapVote(page, { id });
    },
    react(id: string, reaction: 'disappointed' | 'neutral' | 'smiley') {
      return releaseReact(page, { id, reaction });
    },
    subscribe(email: string) {
      return newSubscriber(page, { email });
    },
  };
}
