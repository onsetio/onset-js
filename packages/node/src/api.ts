import axios, { AxiosInstance } from 'axios';

import { Organization } from './organization';
import { Labels } from './labels';
import { Projects } from './projects';
import { Releases } from './releases';
import { Subscribers } from './subscribers';
import { Roadmap } from './roadmap';

export default class OnsetAPI {
  protected version = 'v1';
  private baseURL = 'https://api.onset.io';
  private client: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('[ONSET] - API Key is required.');
    }

    this.client = axios.create({
      baseURL: `${this.baseURL}/${this.version}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  get organization() {
    return new Organization(this.client);
  }

  get projects() {
    return new Projects(this.client);
  }

  get releases() {
    return new Releases(this.client);
  }

  get subscribers() {
    return new Subscribers(this.client);
  }

  get labels() {
    return new Labels(this.client);
  }

  get roadmap() {
    return new Roadmap(this.client);
  }
}
