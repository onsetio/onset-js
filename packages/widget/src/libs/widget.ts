import Widget, { WidgetOptions } from '../index';

const URL = 'https://widget-js.onset.io';

export default class WidgetEmbed extends EventTarget {
  options: WidgetOptions;
  isReady = false;
  isOpen = false;
  hasNew = false;

  data: any;
  app!: HTMLDivElement;
  container!: HTMLDivElement;
  trigger?: HTMLDivElement;
  badge?: HTMLDivElement;
  stylesheet!: HTMLStyleElement;
  customStylesheet!: HTMLStyleElement;
  instance: Widget;

  constructor(options: WidgetOptions, instance: Widget) {
    super();
    this.options = options;
    this.instance = instance;
    this.init();
  }

  async init() {
    try {
      this.data = await this.fetchData();
      this.setupStylesheet();
      this.setupWidget();
      this.setup();
    } catch (err) {
      console.error('[ONSET] - Something went wrong.', err);
    }
  }

  fetch(url: string) {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          if (xhttp.status == 200) {
            resolve(JSON.parse(xhttp.responseText));
          } else {
            reject(xhttp.statusText);
          }
        }
      };

      xhttp.open('GET', url, true);
      xhttp.send();
    });
  }

  fetchData() {
    return this.fetch(`https://${this.options.page}/data.json`);
  }

  setupWidget() {
    // create a container
    const container = document.createElement('div');
    container.id = 'ow_container';

    // create app
    const app = document.createElement('iframe');
    app.id = 'ow_app';

    // root div
    const root = document.createElement('div');
    root.id = 'onset-root';

    // base property
    const base = document.createElement('base');
    base.target = '_blank';

    // app script
    const script = document.createElement('script');
    script.src = `${URL}/static/js/main.js`;
    script.async = true;

    // app style
    const style = document.createElement('link');
    style.href = `${URL}/static/css/main.css`;
    style.rel = 'stylesheet';

    app.addEventListener('load', () => {
      app.contentDocument?.head.append(base);
      app.contentDocument?.head.append(style);

      // set widget properties
      (app.contentWindow as any).widget = this.instance;
      (app.contentWindow as any).data = this.data;
      app.contentDocument?.body.append(root);
      app.contentDocument?.body.append(script);
    });

    // append
    container.append(app);
    document.body.append(container);

    // store
    this.app = app;
    this.container = container;
  }

  setupTrigger() {
    const trigger = document.createElement('div');
    trigger.id = 'ow_trigger';
    trigger.innerText = this.options.triggerText;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.instance.show();
    });

    document.body.append(trigger);

    this.trigger = trigger;
  }

  setupBadge() {
    if (!this.trigger) {
      return;
    }

    const badge = document.createElement('div');
    badge.id = 'ow_badge';
    this.trigger.append(badge);
    this.badge = badge;
  }

  setupStylesheet() {
    const style = document.createElement('style');
    const zIndex = 2147483638;

    let styles = `
      #ow_container {
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        overflow: hidden;
        z-index: -${zIndex};
        box-shadow: 0 5px 40px rgba(0,0,0,.2);
        transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
      }

      @media (min-width: 576px) {
        #ow_container {
          top: 50%;
          border-radius: 6px;
          transform: translate(0%, -50%);
        }
      }

      #ow_container.ow_show {
        opacity: 1;
        z-index: ${zIndex};
      }

      #ow_app {
        width: 100%;
        height: 100%;
        border: 0px;
        position: relative;
        z-index: ${zIndex};
      }

      #ow_trigger {
        top: 50%;
        position: fixed;
        cursor: pointer;
        z-index: ${zIndex};
        padding: 10px 15px;
        transform-origin: center;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 0 8px 0 rgba(0,0,0,.25);
        transform: translateY(-50%);
        transition: transform .5s cubic-bezier(0.19, 1, 0.22, 1);
      }

      #ow_badge {
        display: none;
        border-radius: 3px;
        vertical-align: middle;
        margin-left: 5px;
        background-color: rgba(0,0,0,30%);
        font-size: 80%;
        line-height: 1;
        padding: 5px 8px;
      }
    `;

    style.innerText = styles.trim().replace(/(\r\n|\n|\r)/gm, '');
    document.head.append(style);

    this.stylesheet = style;
  }

  setupCustomStyle() {
    const style = document.createElement('style');

    const organization = this.data;
    const width = this.options.width;
    const height = this.options.height;
    const direction = this.options.direction;
    const colorYiq = organization?.color_yiq ?? this.options.triggerTextColor;
    const color = organization?.color ?? this.options.triggerBgColor;
    const triggerDirection = this.options.triggerDirection || direction;

    let styles = `
      @media (min-width: 576px) {
        #ow_container {
          max-width: ${width};
          max-height: ${height};
        }
      }

      #ow_trigger {
        color: ${colorYiq};
        background-color: ${color};
      }
    `;

    if (triggerDirection === 'left') {
      styles += `
        #ow_trigger {
          left: 0;
          transform: translate3d(-50%,-50%,0) rotate(-270deg) translateY(50%);
        }
        #ow_trigger.ow_show {
          transform: translate3d(-50%,-50%,0) rotate(-270deg) translateY(-50%);
        }
      `;
    }

    if (triggerDirection === 'right') {
      styles += `
        #ow_trigger {
          right: 0;
          transform: translate3d(50%,-50%,0) rotate(270deg) translateY(50%);
        }
        #ow_trigger.ow_show {
          transform: translate3d(50%,-50%,0) rotate(270deg) translateY(-50%);
        }
      `;
    }

    if (direction === 'left') {
      styles += `
        @media (min-width: 576px) {
          #ow_container {
            left: 0;
            transform: translate(-120%, -50%);
          }

          #ow_container.ow_show {
            transform: translate(20px, -50%);
          }
        }
      `;
    }

    if (direction === 'right') {
      styles += `
        @media (min-width: 576px) {
          #ow_container {
            right: 0;
            transform: translate(120%, -50%);
          }

          #ow_container.ow_show {
            transform: translate(-20px, -50%);
          }
        }
      `;
    }

    if (direction === 'center') {
      styles += `
        @media (min-width: 576px) {
          #ow_container {
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `;
    }

    style.innerText = styles.trim().replace(/(\r\n|\n|\r)/gm, '');
    document.head.append(style);

    this.customStylesheet = style;
  }

  setup() {
    this.setupCustomStyle();

    if (!this.options.customTrigger) {
      this.setupTrigger();

      if (!this.options.hideBadge) {
        this.setupBadge();
      }
    }
  }

  destroy() {
    this.container?.remove();
    this.stylesheet?.remove();
    this.customStylesheet?.remove();
    this.trigger?.remove();
    this.badge?.remove();
    this.isReady = false;
  }

  update(options?: WidgetOptions) {
    if (options) {
      this.options = options;
    }

    this.customStylesheet?.remove();
    this.trigger?.remove();
    this.badge?.remove();

    this.setup();
  }

  async reload(options: WidgetOptions) {
    try {
      this.isReady = false;
      this.options = options;
      this.data = await this.fetchData();
      this.update();
    } catch (err) {
      console.error('[ONSET] - Something went wrong.', err);
    }
  }

  showContainer() {
    if (!this.container) {
      return;
    }

    this.isOpen = true;
    this.container.classList.add('ow_show');
  }

  hideContainer() {
    if (!this.container) {
      return;
    }

    this.isOpen = false;
    this.container.classList.remove('ow_show');
  }

  showTrigger() {
    if (!this.trigger) {
      return;
    }

    this.trigger.classList.add('ow_show');
  }

  hideTrigger() {
    if (!this.trigger) {
      return;
    }

    this.trigger.classList.remove('ow_show');
  }

  showBadge(count: string) {
    if (!this.badge) {
      return;
    }

    this.badge.innerText = count;
    this.badge.style.display = 'inline-block';
  }

  hideBadge() {
    if (!this.badge) {
      return;
    }

    this.badge.style.display = 'none';
  }
}
