export interface ExternalLink {
  title: string;
  url: string;
}

export interface SocialLink {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
}

export type ReleaseChangeType =
  | 'added'
  | 'changed'
  | 'deprecated'
  | 'fixed'
  | 'removed'
  | 'security';

export interface ReleaseChange {
  type: ReleaseChangeType;
  description: string;
}

export interface ReleaseAuthor {
  name: string;
  avatar: string;
}

export interface Organization {
  slug: string;
  name: string;

  url: string;
  domain: string | null;
  website: string | null;

  color: string | null;
  color_yiq: string;

  icon: string;
  logo: string;
  logo_dark: string;

  social_links: SocialLink;
  external_links: ExternalLink[];

  allow_subscribers: boolean;
  has_releases: boolean;
  has_roadmap: boolean;
}

export interface Project {
  slug: string;
  name: string;
  url: string;
}

export interface Label {
  name: string;
  slug: string;
  color: string;
  url: string;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  is_pinned: boolean;
  version: string;
  description: string;
  hero_image: string;

  released_at: string;
  released_date: string;
  released_month: string;

  change_count: number;
  change_list: ReleaseChange[];

  url: string;

  labels: Label[];
  project?: Project;
  author?: ReleaseAuthor;
}

export interface Feature {
  id: string;
  slug: string;
  title: string;
  votes: number;
  status: string;
  progress: number;
  description: string;

  created_at: string;
  created_date: string;

  released_at: string;
  released_date: string;

  url: string;

  labels: Label[];
  project?: Project;
}
