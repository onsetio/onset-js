import type { Label } from "./types";
import { Base } from "./base";

type Payload = {
  name: string;
  slug?: string;
  color: string;
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Labels extends Base<Label, Query, Payload> {
  protected path = "/labels";
}
