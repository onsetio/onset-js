export interface Organization {
  id: string;
  name: string;
  slug: string;
  url: string;
  page_domain: string | null;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  organization_id: string;
  is_public: boolean;
}

export interface Integration {
  id: string;
  type: string;
}

export interface Subscriber {
  id: string;
  email: string;
  is_public: boolean;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface ReleaseChange {
  type: 'added' | 'changed' | 'deprecated' | 'fixed' | 'removed' | 'security';
  description: string;
}

export interface Release {
  id: string;
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
  author_id: string;
  project_id: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
  released_at: string | null;
}
