import { Subscriber } from 'interfaces';

export interface SubscriberQuery {
  offset?: number;
  limit?: number;
}

export interface SubscriberCreateBody
  extends Pick<Subscriber, 'email' | 'is_public'> {}

export interface SubscriberUpdateBody extends Pick<Subscriber, 'is_public'> {}
