import WidgetEmbed from './libs/widget';

export interface WidgetOptions {
  page: string;
  triggerTextColor?: string;
  triggerText: string;
  triggerBgColor?: string;
  customTrigger?: boolean;
  showOnLoad?: boolean;
}

export default class Widget extends EventTarget {
  options: WidgetOptions;
  #embed: WidgetEmbed;

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
    if (this.options.showOnLoad) {
      this.show();
    } else if (!this.options.customTrigger) {
      this.#embed.showTrigger();
    }
  }

  show() {
    this.#embed.showContainer();

    if (!this.options.customTrigger) {
      this.#embed.hideTrigger();
    }

    this.#triggerEvent('show');
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
}
