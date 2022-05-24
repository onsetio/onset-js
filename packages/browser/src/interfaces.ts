export interface ExternalLink {
  title: string;
  url: string;
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

export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  color: string | null;
  website: string;
  url: string;
  icon: string;
  logo: string;
  color_yiq: string;
  allow_subscribers: boolean;
  external_links: ExternalLink[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  url: string;
  version_enabled: boolean;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  project: Project;
  is_pinned: boolean;
  version: string;
  released_at: string;
  release_date: string;
  description: string;
  change_count: number;
  change_list: ReleaseChange[];
  url: string;
}
