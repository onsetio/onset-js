import type { Webhook } from 'interfaces';
import { Base } from './base';

type Payload = {
  title: string;
  url: string;
  events: Record<string, boolean>;
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Webhooks extends Base<Webhook, Query, Payload> {
  protected path = '/webhooks';
}
