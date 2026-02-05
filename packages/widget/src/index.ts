import { getCookie, setCookie } from "./utils";

type QueueItem<T extends keyof OnsetWidget = keyof OnsetWidget> = {
  type: T;
  lifecycle: "ready" | "loaded";
  payload?: Parameters<OnsetWidget[T]>[0];
};

type Release = {
  id: string;
  page: string;
  title: string;
  released_at: string;
  description: string;
  description_text: string;
};

export interface OnsetWidgetOptions {
  page: string;
  debug?: boolean;
  title?: string;
  theme?: "light" | "dark" | "system";
  showLatestPopup?: boolean;
  popupPosition?: "left" | "right";
  widgetPosition?: "left" | "right" | "center";
  callbacks?: {
    onReady?: () => void;
    onLoaded?: (releases: Release[]) => void;
    onWidgetOpen?: () => void;
    onWidgetClose?: () => void;
    onPopupOpen?: (releaseId: string) => void;
    onPopupClose?: () => void;
  };
}

const WIDGET_URL = "https://widget-v2.onset.io";

export class OnsetWidget {
  private widget: HTMLIFrameElement | null = null;
  private options: OnsetWidgetOptions;
  private queue: QueueItem[] = [];
  private isReady = false;
  private isLoaded = false;
  private releases: Release[] = [];

  constructor(options: OnsetWidgetOptions) {
    if (!options.page) {
      throw new Error('OnsetWidget: "page" option is required');
    }

    this.options = {
      debug: false,
      theme: "system",
      widgetPosition: "right",
      showLatestPopup: true,
      popupPosition: "right",
      ...options,
    };

    this.log("Initializing widget with options:", options);

    this.mountWidget();
    this.showLatestReleasePopup();
  }

  private log(message: string, ...optionalParams: unknown[]) {
    if (!this.options.debug) {
      return;
    }

    console.log(
      "%c[Onset Widget]",
      "color: #608b4e;",
      message,
      ...optionalParams,
    );
  }

  private mountWidget() {
    this.log("Mounting the widget...");

    const iframe = document.createElement("iframe");
    iframe.id = "ow_widget";

    // setting to widget by default
    iframe.dataset.type = "widget";
    iframe.dataset.direction = this.options.widgetPosition;
    iframe.dataset.state = "closed";

    const css = document.createElement("style");
    css.innerHTML = `
      #ow_widget {
        opacity: 0;
        border: none;
        bottom: 10px;
        position: fixed;
      }

      #ow_widget[data-type="widget"] {
        opacity: 1;
        width: 100%;
        z-index: 2147483638;
        transform: translateX(0%);
        height: calc(100vh - 20px) !important;
      }

      #ow_widget[data-type="widget"][data-direction="left"] {
        left: 10px;
        max-width: 480px;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      }

      #ow_widget[data-type="widget"][data-direction="left"][data-state="closed"] {
        opacity: 0;
        transform: translateX(calc(-100% - 10px));
      }

      #ow_widget[data-type="widget"][data-direction="right"] {
        right: 10px;
        max-width: 480px;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      }

      #ow_widget[data-type="widget"][data-direction="right"][data-state="closed"] {
        opacity: 0;
        transform: translateX(calc(100% + 10px));
      }

      #ow_widget[data-type="widget"][data-direction="center"] {
        left: 50%;
        max-width: 580px;
        transform: translateX(-50%);
        transition: opacity 0.3s ease-in-out;
      }

      #ow_widget[data-type="widget"][data-direction="center"][data-state="closed"] {
        opacity: 0;
        z-index: -2147483638;
      }

      #ow_widget[data-type="popup"] {
        width: 100%;
        max-width: 360px;
        transition: all 0.3s ease-in-out;
        transform: translateY(calc(100% + 10px));
      }

      #ow_widget[data-type="popup"][data-direction="left"] {
        left: 10px;
      }

      #ow_widget[data-type="popup"][data-direction="right"] {
        right: 10px;
      }

      #ow_widget[data-type="popup"][data-state="expanded"],
      #ow_widget[data-type="popup"][data-state="open"] {
        opacity: 1;
        z-index: 2147483638;
        transform: translateY(0%);
      }

      #ow_widget[data-type="popup"][data-state="expanded"] {
        max-width: 480px;
        height: calc(100vh - 20px) !important;
      }
    `;
    document.head.append(css);

    const base = document.createElement("base");
    base.target = "_blank";

    const script = document.createElement("script");
    script.src = `${WIDGET_URL}/app.js`;
    script.async = true;
    script.type = "module";

    const style = document.createElement("link");
    style.href = `${WIDGET_URL}/app.css`;
    style.rel = "stylesheet";

    // root div
    const root = document.createElement("div");
    root.id = "root";

    iframe.addEventListener("load", () => {
      iframe.contentDocument?.head.append(base);
      iframe.contentDocument?.head.append(style);
      iframe.contentDocument?.body.append(root);
      iframe.contentDocument?.body.append(script);
    });

    this.widget = iframe;

    window.addEventListener("message", this.eventListener.bind(this));
    this.log("Event listeners added");

    document.body.append(iframe);
    this.log("Widget mounted");
  }

  private eventListener(event: MessageEvent) {
    if (event.data?.source !== "onset") {
      return;
    }

    this.log("Received message from widget:", event.data);

    switch (event.data.type) {
      case "ready":
        this.log("Widget is ready");
        this.isReady = true;
        this.postMessage({ type: "init", options: this.options });
        this.options.callbacks?.onReady?.();
        this.flushQueue("ready");
        break;
      case "loaded":
        this.log("Widget has loaded");
        this.isLoaded = true;
        this.releases = event.data.releases;
        this.options.callbacks?.onLoaded?.(this.releases);
        this.flushQueue("loaded");
        break;
      case "openWidget":
        this.openWidget();
        break;
      case "closeWidget":
        this.closeWidget();
        break;
      case "closePopup":
        this.closePopup();
        break;
      case "expandPopup":
        this.expandPopup();
        break;
      case "collapsePopup":
        this.collapsePopup();
        break;
      case "resizePopup":
        this.resizePopup(event.data.size);
        break;
    }
  }

  private postMessage(data: Record<string, unknown>) {
    this.log("Posting message to widget:", data);
    this.widget?.contentWindow?.postMessage(
      { source: "onset", ...JSON.parse(JSON.stringify(data)) },
      "*",
    );
  }

  private flushQueue(lifecycle: "ready" | "loaded") {
    this.log("Flushing queue...");

    this.queue.forEach((item) => {
      if (item.lifecycle !== lifecycle) {
        return;
      }

      this[item.type].call(this, item.payload as never);
      this.log("Flushed item from queue:", item);
    });

    this.queue = this.queue.filter((item) => item.lifecycle !== lifecycle);
  }

  private expandPopup() {
    if (!this.widget) {
      this.log("Widget not mounted, not expanding popup");
      return;
    }

    this.widget.dataset.direction = this.options.popupPosition;
    this.widget.dataset.type = "popup";

    this.widget!.dataset.state = "expanded";

    this.postMessage({ type: "expandedPopup" });
    this.log("Popup expanded");
  }

  private collapsePopup() {
    if (!this.widget) {
      this.log("Widget not mounted, not collapsing popup");
      return;
    }

    this.widget.dataset.direction = this.options.popupPosition;
    this.widget.dataset.type = "popup";
    this.widget!.dataset.state = "open";

    this.postMessage({ type: "collapsedPopup" });
  }

  private resizePopup(size: { width: number; height: number }) {
    if (!this.widget) {
      this.log("Widget not mounted, not resizing popup");
      return;
    }

    this.widget.style.height = `${size.height}px`;

    this.postMessage({ type: "resizedPopup", size });
  }

  private showLatestReleasePopup() {
    if (!this.isLoaded) {
      this.log("Widget not loaded, queuing showLatestReleasePopup");
      this.queue.push({
        type: "showLatestReleasePopup" as keyof OnsetWidget,
        lifecycle: "loaded",
      });
      return;
    }

    if (!this.options.showLatestPopup) {
      this.log("showLatestPopup option is disabled, not showing popup");
      return;
    }

    if (!this.releases.length) {
      this.log("No releases available, not showing popup");
      return;
    }

    const latestRelease = this.releases.sort(
      (a, b) =>
        new Date(b.released_at).getTime() - new Date(a.released_at).getTime(),
    )[0];

    const lastSeenReleaseIds = getCookie("onset:latest")?.split(",");

    if (!lastSeenReleaseIds) {
      this.log("No latest release cookie found, not showing popup");
      setCookie("onset:latest", latestRelease.id);
      return;
    }

    if (lastSeenReleaseIds.includes(latestRelease.id as string)) {
      this.log("Latest release already seen, not showing popup");
      return;
    }

    lastSeenReleaseIds.push(latestRelease.id as string);

    setCookie(
      "onset:latest",
      Array.from(new Set(lastSeenReleaseIds)).join(","),
    );

    this.openPopup(latestRelease.id as string);
  }

  /**
   * Opens the widget.
   */
  public openWidget() {
    if (!this.isLoaded) {
      this.log("Widget not ready, queuing openWidget");
      this.queue.push({ type: "openWidget", lifecycle: "loaded" });
      return;
    }

    if (!this.widget) {
      this.log("Widget not mounted, not opening widget");
      return;
    }

    this.postMessage({ type: "openedWidget" });
    this.options.callbacks?.onWidgetOpen?.();

    this.widget.dataset.direction = this.options.widgetPosition;
    this.widget.dataset.type = "widget";

    setTimeout(() => (this.widget!.dataset.state = "open"), 500);
  }

  /**
   * Closes the widget.
   */
  public closeWidget() {
    if (!this.isReady) {
      this.log("Widget not ready, queuing closeWidget");
      this.queue.push({ type: "closeWidget", lifecycle: "ready" });
      return;
    }

    if (!this.widget) {
      this.log("Widget not mounted, not closing widget");
      return;
    }

    this.widget.dataset.direction = this.options.widgetPosition;
    this.widget.dataset.type = "widget";
    this.widget.dataset.state = "closed";

    this.widget.addEventListener(
      "transitionend",
      () => {
        this.postMessage({ type: "closedWidget" });
        this.options.callbacks?.onWidgetClose?.();
        this.log("Widget closed");
      },
      { once: true },
    );
  }

  /**
   * Opens the popup with the given release ID.
   * @param id Release ID to highlight specific release.
   */
  public openPopup(id: string = "latest") {
    if (!id) {
      this.log("No release ID provided to openPopup");
      throw new Error('OnsetWidget: "id" parameter is required for openPopup');
    }

    if (!this.isLoaded) {
      this.log("Widget not loaded, queuing openPopup");
      this.queue.push({ type: "openPopup", payload: id, lifecycle: "loaded" });
      return;
    }

    if (!this.widget) {
      this.log("Widget not mounted, not opening popup");
      return;
    }

    if (id === "latest") {
      id = this.releases?.[0]?.id as string;
    }

    this.postMessage({ type: "openedPopup", releaseId: id });
    this.options.callbacks?.onPopupOpen?.(id);
    this.log("Popup opened for release ID:", id);

    this.widget.dataset.direction = this.options.popupPosition;
    this.widget.dataset.type = "popup";

    setTimeout(() => (this.widget!.dataset.state = "open"), 500);
  }

  /**
   * Closes the popup.
   */
  public closePopup() {
    if (!this.isReady) {
      this.log("Widget not ready, queuing closePopup");
      this.queue.push({ type: "closePopup", lifecycle: "ready" });
      return;
    }

    if (!this.widget) {
      this.log("Widget not mounted, not closing popup");
      return;
    }

    this.widget.dataset.direction = this.options.popupPosition;
    this.widget.dataset.type = "popup";
    this.widget.dataset.state = "closed";

    this.widget.addEventListener(
      "transitionend",
      () => {
        this.postMessage({ type: "closedPopup" });
        this.options.callbacks?.onPopupClose?.();
        this.log("Popup closed");
      },
      { once: true },
    );
  }

  /**
   * Removes the widget from the DOM and cleans up event listeners.
   */
  public remove() {
    this.log("Removing the widget...");

    const container = document.getElementById("ow_widget");

    if (container) {
      document.body.removeChild(container);
      this.log("Widget removed");
    } else {
      this.log("Widget container not found, nothing to remove");
    }

    window.removeEventListener("message", this.eventListener.bind(this));
    this.log("Event listeners removed");
  }
}
