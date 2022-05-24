import { Release } from 'interfaces';

export type ReleaseQuery = {
  project_id?: string;
  offset?: number;
  limit?: number;
};

export interface ReleasePublishBody {
  email?: boolean;
  integrations?: string[];
}

export interface ReleaseBody
  extends Omit<
    Release,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'organization_id'
    | 'change_list_html'
    | 'change_list_html'
  > {}
