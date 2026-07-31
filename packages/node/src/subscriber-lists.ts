import type { SubscriberList } from "./types";
import { Base } from "./base";

type Payload = {
  name: string;
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

// Update requires the same field (`name`) as create, so `U` is passed
// explicitly - the default `Partial<C>` would let `update(id, {})` compile and
// then fail with a 400.
export class SubscriberLists extends Base<
  SubscriberList,
  Query,
  Payload,
  Payload
> {
  protected path = "/subscriber-lists";
}
