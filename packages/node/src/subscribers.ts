import type { Subscriber } from "./types";
import { Base } from "./base";

type Payload = {
  email: string;
  list_ids?: string[];
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Subscribers extends Base<Subscriber, Query, Payload> {
  protected path = "/subscribers";
}
