export interface SubscriberQuery {
  offset?: number;
  limit?: number;
}

export interface SubscriberCreate {
  email: string;
  is_public: boolean;
}

export interface SubscriberUpdate {
  is_public: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  is_public: boolean;
  organization_id: string;
  created_at: string;
  updated_at: string;
}
