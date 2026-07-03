type Project = {
  id: string;
  name: string;
  slug: string;
  url: string;
};

type Label = {
  id: string;
  name: string;
  color: string;
  slug: string;
  url: string;
};

export interface Release {
  id: string;
  slug: string;
  hero_image: string | null;
  hero_video: string | null;
  title: string;
  is_pinned: boolean;
  is_pre_release: boolean;
  version: string | null;
  released_at: string;
  url: string;
  summary: string;
  description: string;
  description_text: string;
  change_list: {
    type: string;
    color: string;
    description: string;
    title: string;
  }[];
  labels: Label[];
  project: Project | null;
}

export interface Milestone {
  id: string;
  slug: string;
  title: string;
  votes: number;
  rank: number;
  status: string;
  stage: {
    color: string;
    title: string;
  };
  url: string;
  description: string;
  description_text: string;
  project: Project | null;
  labels: Label[];
  created_at: string;
  updated_at: string;
  released_at: string | null;
}

export interface Workspace {
  slug: string;
  name: string;
  color: string;
  color_yiq: string;
  url: string;
  logo: string | null;
  logo_dark: string | null;
  projects: Omit<Project, "url">[];
  labels: Omit<Label, "url">[];
}
