export type MilestoneStage =
  | "BACKLOG"
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  /** Public changelog page URL for the workspace. */
  url: string;
  /** Change types configured for releases in this workspace. */
  release_change_types: {
    id: string;
    title: string;
    color: string;
  }[];
  /** Status types configured for roadmap milestones in this workspace. */
  roadmap_status_types: {
    id: string;
    title: string;
    color: string;
    stage: MilestoneStage;
  }[];
}

export interface Subscriber {
  id: string;
  email: string;
  lists: {
    id: string;
    name: string;
  }[];
  created_at: string;
  updated_at: string;
}

export type Project = {
  id: string;
  name: string;
  slug: string;
};

export type Label = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

export interface Contributor {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export interface SubscriberList {
  id: string;
  name: string;
  subscriber_count: number;
  created_at: string;
  updated_at: string;
}

type LinkAttachment = {
  type: "link";
  content: {
    url: string;
    title: string;
  };
};

type FileAttachment = {
  type: "file";
  content: {
    url: string;
    title: string;
    size: number;
    type: string;
  };
};

export interface Release {
  id: string;
  title: string;
  hero: {
    url: string;
    type: "image" | "video";
  } | null;
  body: string;
  changes: {
    id: string;
    change_id: string;
    content: string;
  }[];
  slug: string;
  status: "DRAFT" | "SCHEDULED" | "RELEASED";
  summary: string | null;
  version: string | null;
  is_pre_release: boolean;
  is_pinned: boolean;
  is_public: boolean;
  labels: Label[];
  contributors: {
    id: string;
    name: string;
    avatar_url: string | null;
  }[];
  attachments: (LinkAttachment | FileAttachment)[];
  project: Project | null;
  /** Only set while `status` is `SCHEDULED`. */
  scheduled_at: string | null;
  released_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  number: number;
  title: string;
  body: string;
  slug: string;
  status: string;
  stage: MilestoneStage;
  is_public: boolean;
  upvote_count: number;
  labels: Label[];
  project: Project | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
  attachments: (LinkAttachment | FileAttachment)[];
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  signature: string;
  events: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export interface IncomingWebhook {
  id: string;
  name: string;
  url: string;
  type: "RELEASE" | "MILESTONE" | "SUBSCRIBER";
  isEnabled: boolean;
  lastTriggeredAt: string | null;
  createdAt: string;
  updatedAt: string;
}
