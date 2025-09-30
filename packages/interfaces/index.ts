export interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export interface Subscriber {
  id: string;
  email: string;
  is_public: boolean;
  lists: {
    id: string;
    name: string;
  }[];
  created_at: string;
  updated_at: string;
}

type Project = {
  id: string;
  name: string;
}

type Label = {
  id: string;
  name: string;
  color: string;
}

type LinkAttachment = {
  type: "link";
  content: {
    url: string;
    title: string;
  };
}

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
  status: "DRAFT" | "RELEASED" | "SCHEDULED";
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
  released_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  title: string;
  body: string;
  slug: string;
  status: string;
  stage: "BACKLOG" | "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
  is_public: boolean;
  labels: Label[];
  project: Project | null;
  created_at: string;
  updated_at: string;
  attachments: (LinkAttachment | FileAttachment)[];
}
