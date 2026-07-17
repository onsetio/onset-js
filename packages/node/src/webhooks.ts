import type { Webhook } from "./types";
import { Base } from "./base";

type Payload = {
  name: string;
  url: string;
  events: Record<string, boolean>;
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

// Update accepts a partial of the create payload - every field is optional.
export class Webhooks extends Base<Webhook, Query, Payload> {
  protected path = "/webhooks";
}
