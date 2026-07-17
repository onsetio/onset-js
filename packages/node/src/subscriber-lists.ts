import type { SubscriberList } from "./types";
import { Base } from "./base";

type Payload = {
  name: string;
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

// Update requires the same field (`name`) as create per the API reference.
export class SubscriberLists extends Base<SubscriberList, Query, Payload> {
  protected path = "/subscriber-lists";
}
