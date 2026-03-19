type Project = {
  id: string;
  name: string;
  slug: string;
};

type Label = {
  id: string;
  name: string;
  color: string;
};

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
  slug: string;
  hero: {
    url: string;
    type: "image" | "video";
  } | null;
  title: string;
  is_pinned: boolean;
  is_pre_release: boolean;
  version: string | null;
  released_at: string;
  url: string;
  summary: string;
  body: string;
  body_text: string;
  changes: {
    type: string;
    color: string;
    content: string;
    title: string;
  }[];
  labels: Label[];
  project: Project | null;
  attachments: (LinkAttachment | FileAttachment)[];
}

export interface Milestone {
  id: string;
  slug: string;
  title: string;
  votes: number;
  status: string;
  stage: string;
  url: string;
  body: string;
  body_text: string;
  project: Project | null;
  labels: Label[];
  created_at: string;
  updated_at: string;
  attachments: (LinkAttachment | FileAttachment)[];
}
