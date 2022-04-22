export interface ProjectQuery {
  offset?: number;
  limit?: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  organization_id: string;
  is_public: boolean;
}

export interface Integration {
  id: string;
  type: string;
}
