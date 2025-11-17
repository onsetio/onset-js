import type { Release } from "./types";
import { Base } from "./base";

type Payload = {
  title: string;
  body?: string;
  is_public?: boolean;
  status: Release["status"];
  slug: string;
  project_id?: string;
  label_ids?: string[];
  contributor_ids?: string[];
  attachments?: Release["attachments"];
  hero?: Release["hero"];
  changes?: Release["changes"];
  is_pinned?: boolean;
  is_pre_release?: boolean;
  version?: string;
};

type Query = {
  offset?: number;
  limit?: number;
  slug?: string;
  is_public?: boolean;
  status?: Release["status"];
  project_id?: string;
};

export class Releases extends Base<Release, Query, Payload> {
  protected path = "/releases";
}
