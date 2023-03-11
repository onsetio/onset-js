export interface ChangeType {
  slug: string;
  color: string;
  title: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  url: string;
  chnage_types: ChangeType[];
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  version_enabled: boolean;
  version_pre_release_enabled: boolean;
}

export interface Label {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Integration {
  id: string;
  type: string;
}

export interface Subscriber {
  id: string;
  email: string;
  is_public: boolean;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
}

export interface AttachmentRelation {
  type: 'relation';
  content: {
    type: 'roadmap' | 'release';
    id: string;
  };
}

export interface AttachmentLink {
  type: 'link';
  content: {
    title: string;
    url: string;
  };
}

export interface AttachmentFile {
  type: 'file';
  content: {
    name: string;
    size: number;
    mimetype: string;
    url: string;
  };
}

export type Attachment = AttachmentRelation | AttachmentLink | AttachmentFile;

export interface ReleaseChange {
  type: string;
  description: string;
  description_html: string;
}

export interface ReleaseReactions {
  neutral: number;
  smiley: number;
  disappointed: number;
}

export type ReleaseStatus = 'draft' | 'released' | 'scheduled';

export interface Release {
  id: string;
  created_at: string;
  updated_at: string;
  released_at: string | null;
  is_pinned: boolean;
  is_public: boolean;
  is_released: boolean;
  is_scheduled: boolean;
  is_draft: boolean;
  hero_image_url: string;
  title: string | null;
  full_title: string;
  slug: string;
  status: ReleaseStatus;
  version: string | null;
  full_version: string | null;
  is_pre_release?: boolean;
  pre_release_status?: 'rc' | 'beta' | 'alpha';
  pre_release_version?: number;
  description: string;
  description_html: string;
  description_text: string;
  change_list: ReleaseChange[];
  change_list_html: Omit<ReleaseChange, 'description_html'>[];
  change_list_count: number;
  attachments: Attachment[];
  reactions: ReleaseReactions;
  label_ids: string[];
  author_id: string;
  share_id: string;
  project_id: string | null;
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

export interface Roadmap {
  id: string;
  created_at: string;
  updated_at: string;
  released_at: string | null;
  archived_at: string | null;
  is_public: boolean;
  is_released: boolean;
  is_archived: boolean;
  title: string;
  slug: string;
  status: RoadmapStatus;
  description: string;
  description_html: string;
  description_text: string;
  votes: number;
  update_count: number;
  progress: number;
  attachments: Attachment[];
  label_ids: string[];
  update_ids: string[];
  project_id: string | null;
}

export interface RoadmapUpdate {
  id: string;
  created_at: string;
  updated_at: string;
  released_at: string | null;
  description: string;
  description_html: string;
  status: RoadmapStatus;
  progress: number;
  roadmap_id: string;
}

/**
 * @deprecated Feature type is deprecated use Roadmap instead.
 */
export interface Feature extends Roadmap {}
