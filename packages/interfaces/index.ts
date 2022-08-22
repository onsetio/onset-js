interface Base {
  id: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface Organization extends Omit<Base, 'organization_id'> {
  name: string;
  slug: string;
  url: string;
  page_domain: string | null;
}

export interface Project extends Base {
  name: string;
  slug: string;
  version_enabled: boolean;
  version_pre_release_enabled: boolean;
}

export interface Integration {
  id: string;
  type: string;
}

export interface Subscriber extends Base {
  email: string;
  is_public: boolean;
}

export interface Label extends Base {
  name: string;
  slug: string;
  color: string;
}

export interface ReleaseChange {
  type: 'added' | 'changed' | 'deprecated' | 'fixed' | 'removed' | 'security';
  description: string;
}

export interface Release extends Base {
  title: string;
  full_title: string;
  slug: string;
  is_pinned: boolean;
  is_public: boolean;
  status: 'draft' | 'released';
  version: string | null;
  full_version: string | null;
  is_pre_release: boolean;
  pre_release_status: 'rc' | 'beta' | 'alpha';
  pre_release_version: number;
  description: string;
  description_html: string;
  change_list: ReleaseChange[];
  change_list_html: ReleaseChange[];
  label_ids: string[];
  author_id: string;
  share_id: string;
  hero_image_url: string;
  project_id: string | null;
  released_at: string | null;
}

type FeatureStatus =
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

export interface Feature extends Base {
  title: string;
  slug: string;
  status: FeatureStatus;
  description: string;
  description_html: string;
  votes: number;
  project_id: string | null;
  released_at: string;
  archived_at: string;
  is_public: number;
  progress: number;
}
