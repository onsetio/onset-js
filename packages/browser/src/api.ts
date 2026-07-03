import { Releases } from "./releases";
import { Roadmap } from "./roadmap";
import { Workspace } from "./workspace";

export default class OnsetBrowserClient {
  private page: string;

  constructor(page: string) {
    if (!page) {
      throw new Error("[ONSET] - Page slug is not defined.");
    }

    this.page = page;
  }

  get workspace() {
    return new Workspace(this.page);
  }

  get releases() {
    return new Releases(this.page);
  }

  get roadmap() {
    return new Roadmap(this.page);
  }
}
