export type ReleaseChangeType =
  | 'added'
  | 'changed'
  | 'deprecated'
  | 'fixed'
  | 'removed'
  | 'security';

export type ReleaseStatus = 'draft' | 'released';

export type PreReleaseStatus = 'rc' | 'beta' | 'alpha';

export interface ReleaseChange {
  type: ReleaseChangeType;
  description: string;
}

export type ReleaseQuery = {
  project_id?: string;
  offset?: number;
  limit?: number;
};

export interface ReleasePublishBody {
  email?: boolean;
  integrations?: string[];
}

export interface ReleaseBody {
  title: string;
  slug: string;
  is_pinned: boolean;
  is_public: boolean;
  version: string | null;
  is_pre_release: boolean;
  pre_release_status: PreReleaseStatus;
  pre_release_version: number;
  description: string;
  change_list: ReleaseChange[];
  author_id: string;
  project_id: string;
  released_at: string | null;
}

export interface Release {
  id: string;
  title: string;
  full_title: string;
  slug: string;
  is_pinned: boolean;
  is_public: boolean;
  status: ReleaseStatus;
  version: string | null;
  full_version: string | null;
  is_pre_release: boolean;
  pre_release_status: PreReleaseStatus;
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
