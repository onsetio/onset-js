import axios, { AxiosInstance } from "axios";

import { Workspace } from "./workspace";
import { Releases } from "./releases";
import { Subscribers } from "./subscribers";
import { Milestones } from "./milestones";
import { Webhooks } from "./webhooks";
import { IncomingWebhooks } from "./incoming-webhooks";
import { Projects } from "./projects";
import { Labels } from "./labels";
import { Contributors } from "./contributors";
import { SubscriberLists } from "./subscriber-lists";

export default class OnsetAPI {
  protected version = "v1";
  private baseURL = "https://api.onset.io";
  private client: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("[ONSET] - API Key is required.");
    }

    this.client = axios.create({
      baseURL: `${this.baseURL}/${this.version}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  get workspace() {
    return new Workspace(this.client);
  }

  get releases() {
    return new Releases(this.client);
  }

  get milestones() {
    return new Milestones(this.client);
  }

  /**
   * @deprecated Use `milestones` instead. The `/roadmap` endpoint has been
   * renamed to `/milestones` to match the Onset API reference.
   */
  get roadmap() {
    return new Milestones(this.client);
  }

  get subscribers() {
    return new Subscribers(this.client);
  }

  get subscriberLists() {
    return new SubscriberLists(this.client);
  }

  get webhooks() {
    return new Webhooks(this.client);
  }

  get incomingWebhooks() {
    return new IncomingWebhooks(this.client);
  }

  get projects() {
    return new Projects(this.client);
  }

  get labels() {
    return new Labels(this.client);
  }

  get contributors() {
    return new Contributors(this.client);
  }
}
