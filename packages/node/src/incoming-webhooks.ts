import type { IncomingWebhook } from "./types";
import { Base } from "./base";

type CreatePayload = {
  name: string;
  type: "RELEASE" | "MILESTONE" | "SUBSCRIBER";
};

// `type` can't be changed after creation - update only accepts name/isEnabled.
type UpdatePayload = {
  name: string;
  isEnabled?: boolean;
};

type Query = Partial<{
  offset: number;
  limit: number;
  type: "RELEASE" | "MILESTONE" | "SUBSCRIBER";
}>;

export class IncomingWebhooks extends Base<
  IncomingWebhook,
  Query,
  CreatePayload,
  UpdatePayload
> {
  protected path = "/incoming-webhooks";
}
