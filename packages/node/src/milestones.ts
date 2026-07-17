import type { Milestone } from "./types";
import { Base } from "./base";

type Payload = {
  title: string;
  body?: string;
  is_public?: boolean;
  status: string;
  slug: string;
  label_ids?: string[];
  project_id?: string | null;
  attachments?: Milestone["attachments"];
};

type Query = {
  status?: string;
  project_id?: string;
  is_public?: boolean;
  slug?: string;
  offset?: number;
  limit?: number;
};

export class Milestones extends Base<Milestone, Query, Payload> {
  protected path = "/milestones";
}
