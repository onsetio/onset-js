import type { AxiosInstance } from 'axios';
import type { Organization as IOrganization } from 'interfaces';

export class Organization {
  private client: AxiosInstance;
  private path = '/organization';

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async retrieve(): Promise<IOrganization> {
    const { data } = await this.client.get<IOrganization>(this.path);
    return data;
  }
}
