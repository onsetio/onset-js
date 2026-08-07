import type { Release } from "./types";
import { Base } from "./base";

type Payload = {
  title: string;
  body?: string;
  is_public?: boolean;
  slug: string;
  project_id?: string | null;
  label_ids?: string[];
  contributor_ids?: string[];
  attachments?: Release["attachments"];
  hero?: NonNullable<Release["hero"]>;
  changes?: {
    title: string;
    content?: string | null;
  }[];
  is_pinned?: boolean;
  is_pre_release?: boolean;
  version?: string;
};

type PublishPayload =
  | {
      status: "RELEASED";
      scheduled_at?: never;
    }
  | {
      status: "SCHEDULED";
      scheduled_at: string;
    };

type Query = {
  offset?: number;
  limit?: number;
  slug?: string;
  is_public?: boolean;
  status?: Release["status"];
  project_id?: string;
  /** Comma-separated label ids. Matches releases with ANY of them. */
  label_ids?: string;
};

export class Releases extends Base<Release, Query, Payload> {
  protected path = "/releases";

  /**
   * Publish a draft release to the changelog, or schedule it for a future date.
   *
   * Also works on an already-scheduled release, so you can publish it early or
   * move it to a different date. Publishing a release that is already RELEASED
   * fails - use `update` to change a live release's content.
   *
   * Scheduling requires a plan that includes scheduled releases.
   *
   * ```js
   * await onset.releases.publish(id);
   *
   * await onset.releases.publish(id, {
   *   status: "SCHEDULED",
   *   scheduled_at: "2026-08-01T09:00:00.000Z",
   * });
   * ```
   */
  async publish(
    id: string,
    body: PublishPayload = { status: "RELEASED" },
  ): Promise<Release> {
    const { data } = await this.client.post<Release>(
      `${this.path}/${id}/publish`,
      body,
    );

    return data;
  }
}
