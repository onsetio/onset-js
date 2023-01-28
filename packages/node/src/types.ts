import { Release, Feature, Label, Project, Subscriber } from 'interfaces';

export type Query = {
  offset?: number;
  limit?: number;
};

export interface SubscriberCreateBody
  extends Pick<Subscriber, 'email' | 'is_public'> {}

export interface SubscriberUpdateBody extends Pick<Subscriber, 'is_public'> {}

export interface LabelBody extends Pick<Label, 'name' | 'color' | 'slug'> {}

export interface ProjectBody
  extends Omit<
    Project,
    'id' | 'created_at' | 'updated_at' | 'organization_id'
  > {}

export interface FeatureBody
  extends Omit<
    Feature,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'archived_at'
    | 'organization_id'
    | 'description_html'
  > {}

export interface ReleaseBody
  extends Omit<
    Release,
    | 'id'
    | 'share_id'
    | 'created_at'
    | 'updated_at'
    | 'full_title'
    | 'full_version'
    | 'hero_image_url'
    | 'organization_id'
    | 'change_list_html'
    | 'change_list_html'
  > {}

export interface ReleaseAppendBody
  extends Pick<Release, 'description' | 'change_list'> {}

export interface ReleasePublishBody {
  email?: boolean;
  integrations?: string[];
}
