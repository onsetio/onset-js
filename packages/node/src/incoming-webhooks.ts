import type { IncomingWebhook } from "./types";
import { Base } from "./base";

type Payload = {
  name: string;
  type: "RELEASE" | "MILESTONE" | "SUBSCRIBER";
  is_enabled?: boolean;
};

type Query = Partial<{
  offset: number;
  limit: number;
  type: "RELEASE" | "MILESTONE" | "SUBSCRIBER";
}>;

export class IncomingWebhooks extends Base<IncomingWebhook, Query, Payload> {
  protected path = "/incoming-webhooks";
}
