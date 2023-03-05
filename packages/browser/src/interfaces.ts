export interface ExternalLink {
  title: string;
  url: string;
}

export interface SocialLink {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
}

export interface Organization {
  slug: string;
  name: string;
  url: string;
  domain?: string;
  website?: string;
  color?: string;
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

export interface Attachment<T = any> {
  content: T;
  type: 'relation' | 'link' | 'file';
}

export interface ReleaseChange {
  type: string;
  color?: string;
  title?: string;
  description: string;
}

export interface ReleaseAuthor {
  name: string;
  avatar_text: string;
  avatar_image: string;
  avatar_color: string;
}

export interface Release {
  id: string;
  url: string;
  slug: string;
  title: string;
  is_pinned: boolean;
  version: string;
  description: string;
  description_text: string;
  hero_image: string;
  released_at: string;
  change_list: ReleaseChange[];
  labels: Label[];
  project?: Project;
  author?: ReleaseAuthor;
  attachments: Attachment<Omit<Roadmap, 'attachments'> | any>[];
}

export type RoadmapStatus =
  | 'in-progress'
  | 'planned'
  | 'paused'
  | 'testing'
  | 'alpha'
  | 'beta'
  | 'released'
  | 'pending'
  | 'backlog'
  | 'canceled';

export interface RoadmapUpdate {
  description?: string;
  status: RoadmapStatus;
  created_at: string;
  released_at?: string;
  progress: number;
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  rank: number;
  votes: number;
  status: string;
  progress: number;
  description: string;
  created_at: string;
  released_at: string;
  url: string;
  labels: Label[];
  project?: Project;
  attachments: Attachment<Omit<Release, 'attachments'> | any>[];
}

/**
 * @deprecated Feature type is deprecated use Roadmap instead.
 */
export interface Feature extends Roadmap {}
