import type { Subscriber } from "./types";
import { Base } from "./base";

type CreatePayload = {
  email: string;
  list_ids?: string[];
};

// `email` can't be changed after creation - update only accepts list_ids.
type UpdatePayload = {
  list_ids?: string[];
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Subscribers extends Base<
  Subscriber,
  Query,
  CreatePayload,
  UpdatePayload
> {
  protected path = "/subscribers";
}
