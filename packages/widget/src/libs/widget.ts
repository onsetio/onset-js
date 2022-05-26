import Widget, { WidgetOptions } from '../index';

const URL = 'https://widget-js.onset.io';

export default class WidgetEmbed extends EventTarget {
  options: WidgetOptions;
  isReady = false;
  isOpen = false;

  data: any;
  app?: HTMLDivElement;
  container?: HTMLDivElement;
  trigger?: HTMLDivElement;
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
    // create container
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
      (app.contentWindow as any).widget = this;
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
    trigger.innerText = this.options.triggerText || 'Release Notes';

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.showContainer();
      this.hideTrigger();
    });

    document.body.append(trigger);

    this.trigger = trigger;
  }

  setupStylesheet() {
    const style = document.createElement('style');

    const organization = this.data;
    const zIndex = 2147483638;
    const colorYiq =
      this.options.triggerTextColor || organization.color_yiq || 'FFFFFF';
    const color = this.options.triggerBgColor || organization.color || '3e45eb';

    const styles = `
      .ow_container {
        opacity: 0;
        width: 100%;
        width: 100%;
        height: 100%;
        bottom: 0;
        position: fixed;
        overflow: hidden;
        z-index: ${zIndex};
        box-shadow: 0 5px 40px rgba(0,0,0,.2);
        transform: translateX(120%);
        transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
      }

      @media (min-width: 576px) {
        .ow_container {
          max-width: 400px;
          max-height: 95%;
          right: 20px;
          bottom: 20px;
          border-radius: 6px;
        }
      }

      .ow_container.ow_show {
        opacity: 1;
        transform: translateX(0%);
      }

      .ow_app {
        width: 100%;
        height: 100%;
        border: 0px;
        position: relative;
        z-index: ${zIndex};
      }

      .ow_trigger {
        top: 50%;
        right: 0;
        position: fixed;
        cursor: pointer;
        z-index: ${zIndex};
        color: ${colorYiq};
        padding: 10px 15px;
        transform-origin: center;
        border-radius: 3px 3px 0 0;
        background-color: ${color};
        box-shadow: 0 0 8px 0 rgba(0,0,0,.25);
        transition: transform .5s cubic-bezier(0.19, 1, 0.22, 1);
        transform: translate3d(50%,-50%,0) rotate(270deg) translateY(50%);
      }

      .ow_trigger.ow_show {
        transform: translate3d(50%,-50%,0) rotate(270deg) translateY(-50%);
      }
    `;

    style.innerText = styles.trim().replace(/(\r\n|\n|\r)/gm, '');
    document.head.append(style);
  }

  setup() {
    this.setupStylesheet();
    this.setupWidget();

    if (!this.options.customTrigger) {
      this.setupTrigger();
    }
  }

  onReady(releases: any[]) {
    this.isReady = true;
    this.instance.onReady(releases);
  }

  showContainer() {
    this.isOpen = true;
    this.container?.classList.add('ow_show');
  }

  hideContainer() {
    this.isOpen = false;
    this.container?.classList.remove('ow_show');
  }

  showTrigger() {
    this.trigger?.classList.add('ow_show');
  }

  hideTrigger() {
    this.trigger?.classList.remove('ow_show');
  }
}
