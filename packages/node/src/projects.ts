import type { Project } from "./types";
import { Base } from "./base";

type Payload = {
  name: string;
  slug?: string;
};

type Query = Partial<{
  offset: number;
  limit: number;
}>;

export class Projects extends Base<Project, Query, Payload> {
  protected path = "/projects";
}
