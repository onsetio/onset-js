import { Label } from 'interfaces';

export interface LabelQuery {
  offset?: number;
  limit?: number;
}

export interface LabelBody extends Pick<Label, 'name' | 'color' | 'slug'> {}
