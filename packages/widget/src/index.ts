import WidgetEmbed from './libs/widget';
import { getCookie, setCookie } from './utils/cookie';

export interface WidgetOptions {
  page: string;
  title: string;
  triggerTextColor?: string;
  triggerText: string;
  triggerBgColor?: string;
  customTrigger?: boolean;
  showOnLoad?: boolean;
  project?: string;
  showRoadmap?: boolean;
  direction?: 'left' | 'right' | 'center';
  triggerDirection?: 'left' | 'right';
  theme?: 'light' | 'dark' | 'system';
  width?: string;
  height?: string;
  hideBadge?: boolean;
  allowSubscribers?: boolean;
}

export type WidgetUpdateOptions = Pick<
  WidgetOptions,
  'title' | 'theme' | 'project' | 'allowSubscribers'
>;

export default class Widget extends EventTarget {
  options!: WidgetOptions;
  #embed!: WidgetEmbed;
  #releases?: any[];

  constructor(options: WidgetOptions) {
    super();

    if (!options.page) {
      throw new Error('[ONSET] - Page slug is not defined.');
    }

    this.options = options;
    this.#embed = new WidgetEmbed(options, this);
  }

  #triggerEvent(name: string, details: any = {}) {
    const event = new CustomEvent(name, {
      detail: {
        ...details,
        isOpen: this.isOpen,
        isReady: this.isReady,
      },
    });

    this.dispatchEvent(event);
  }

  #eventHandler(fn: (arg: any) => void) {
    return function hanlder({ type, detail }: any) {
      fn.call(null, { ...detail, type });
    } as EventListenerOrEventListenerObject;
  }

  get #newReleaseCount() {
    const latestSeen = getCookie('onset:latest');

    if (!latestSeen) {
      return 0;
    }

    let releases = this.#releases || [];

    if (this.options.project) {
      releases = releases.filter(
        ({ project }) => project.slug === this.options.project
      );
    }

    return releases.findIndex(({ id }) => id === latestSeen);
  }

  get isReady() {
    return this.#embed.isReady;
  }

  get isOpen() {
    return this.#embed.isOpen;
  }

  on(name: string, fn: () => void) {
    if (typeof fn !== 'function') {
      throw new Error('[ONSET] - Event callback must be a function.');
    }

    this.addEventListener(name, this.#eventHandler(fn));
  }

  off(name: string, fn: () => void) {
    if (typeof fn !== 'function') {
      throw new Error('[ONSET] - Event callback must be a function.');
    }

    this.removeEventListener(name, this.#eventHandler(fn));
  }

  onReady(releases: any[] = []) {
    this.#triggerEvent('ready', { releases });

    if (this.options.showOnLoad) {
      this.show();
    } else if (!this.options.customTrigger) {
      this.#embed.showTrigger();
      this.onNewRelease(releases);
    }
  }

  onNewRelease(releases: any[] = []) {
    this.#releases = releases;
    const releaseCount = this.#newReleaseCount;

    if (!this.options.hideBadge && releaseCount > 0) {
      this.#triggerEvent('new_release', { count: releaseCount });
      this.#embed.showBadge(releaseCount.toString());
    }
  }

  #markAsRead() {
    if (this.#releases) {
      setCookie('onset:latest', this.#releases[0].id);
      this.#triggerEvent('read');
    }
  }

  show() {
    this.#embed.showContainer();

    if (!this.options.customTrigger) {
      this.#embed.hideTrigger();
    }

    this.#triggerEvent('show');

    setTimeout(() => {
      this.#embed.hideBadge();
      this.#markAsRead();
    }, 1000);
  }

  hide() {
    this.#embed.hideContainer();

    if (!this.options.customTrigger) {
      this.#embed.showTrigger();
    }

    this.#triggerEvent('hide');
  }

  toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  reload(options: WidgetOptions) {
    if (!options.page) {
      throw new Error('[ONSET] - Page slug is not defined.');
    }

    this.options = options;
    this.#embed.reload(options);
    this.#triggerEvent('reload', options);
  }

  update(options: WidgetOptions) {
    if (options.page && options.page !== this.options.page) {
      throw new Error(
        '[ONSET] - To change page slug use the .reload() method.'
      );
    }

    this.options = {
      ...this.options,
      ...options,
    };

    this.#embed.update(this.options);
    this.#triggerEvent('update', this.options);
  }
}
