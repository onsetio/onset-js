import WidgetEmbed from './libs/widget';
import { getCookie, setCookie } from './utils/cookie';

export interface WidgetOptions {
  page: string;
  title: string;
  color?: string;
  colorYiq?: string;
  triggerTextColor?: string;
  triggerText: string;
  triggerBgColor?: string;
  customTrigger?: boolean;
  showOnLoad?: boolean;
  project?: string;
  showRoadmap?: boolean;
  direction?: 'left' | 'right' | 'center';
  triggerDirection?: 'left' | 'right';
  theme?: 'light' | 'dark' | 'auto';
  width?: string;
  height?: string;
  hideBadge?: boolean;
  hideProjects?: boolean;
  allowSubscribers?: boolean;
}

const DEFAULT_OPTIONS: Partial<WidgetOptions> = {
  triggerText: 'Release Notes',
  width: '400px',
  height: '95%',
  triggerTextColor: '#FFFFFF',
  triggerBgColor: '#3e45eb',
  direction: 'right',
  customTrigger: false,
  hideBadge: false,
  theme: 'auto',
  showOnLoad: false,
  showRoadmap: false,
  hideProjects: false,
};

export default class Widget extends EventTarget {
  options!: WidgetOptions;
  #embed!: WidgetEmbed;
  #allReleases?: any[];
  #allRoadmap?: any[];

  constructor(options: WidgetOptions) {
    super();

    if (!options.page) {
      throw new Error('[ONSET] - Page slug is not defined.');
    }

    this.options = Object.assign(DEFAULT_OPTIONS, options);
    this.#embed = new WidgetEmbed(this.options, this);
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

  get #roadmap() {
    if (!this.#allRoadmap) {
      return [];
    }

    if (!this.options.project) {
      return this.#allRoadmap;
    }

    return this.#allRoadmap.filter(
      ({ project }) => project.slug === this.options.project
    );
  }

  get #releases() {
    if (!this.#allReleases) {
      return [];
    }

    if (!this.options.project) {
      return this.#allReleases;
    }

    return this.#allReleases.filter(
      ({ project }) => project.slug === this.options.project
    );
  }

  get #newReleases() {
    const latestSeen = getCookie('onset:latest');

    if (!latestSeen) {
      return [];
    }

    const newIndex = this.#releases.findIndex(({ id }) => id === latestSeen);
    return this.#releases.slice(0, newIndex);
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

  onReady() {
    this.#embed.isReady = true;
    this.#triggerEvent('ready');

    if (this.options.showOnLoad) {
      this.show();
    } else if (!this.options.customTrigger) {
      this.#embed.showTrigger();
    }
  }

  onLoad(data: { releases: any[]; projects: any[]; roadmap: any[] }) {
    this.#allReleases = data.releases;
    this.#allRoadmap = data.roadmap;

    this.#triggerEvent('loaded', {
      roadmap: this.#roadmap,
      releases: this.#releases,
    });

    this.#onNewRelease();
  }

  #onNewRelease() {
    const releases = this.#newReleases;

    if (releases.length) {
      this.#triggerEvent('new_release', { releases });

      if (!this.options.customTrigger && !this.options.hideBadge) {
        this.#embed.showBadge(releases.length.toString());
      }
    }
  }

  #markAsRead() {
    if (this.#releases.length) {
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

    this.options = Object.assign(DEFAULT_OPTIONS, options);
    this.#embed.reload(this.options);
    this.#triggerEvent('reload', this.options);
  }

  update(options: WidgetOptions) {
    if (options.page && options.page !== this.options.page) {
      throw new Error(
        '[ONSET] - To change page slug use the .reload() method.'
      );
    }

    this.options = Object.assign(this.options, options);
    this.#embed.update(this.options);
    this.#triggerEvent('update', this.options);

    if (!this.options.customTrigger && !this.isOpen) {
      this.#embed.showTrigger();
    }
  }
}
