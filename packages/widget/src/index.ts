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
      ...optionalParams
    );
  }

  private mountWidget() {
    this.log("Mounting the widget...");

    const container = document.createElement("div");
    container.id = "ow_container";

    const iframe = document.createElement("iframe");
    iframe.id = "ow_iframe";
    iframe.style.transition = "all 0.3s ease-in-out";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.bottom = "10px";
    iframe.style.zIndex = "999999";
    iframe.style.opacity = "0";

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

    container.append(iframe);
    document.body.append(container);
    this.log("Widget mounted");

    document.addEventListener("message", this.eventListener.bind(this));
    this.log("Event listeners added");
  }

  private eventListener() {
    this.log("Adding event listeners...");

    window.addEventListener("message", (event) => {
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
    });
  }

  private postMessage(data: Record<string, unknown>) {
    this.log("Posting message to widget:", data);
    this.widget?.contentWindow?.postMessage({ source: "onset", ...data }, "*");
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

    this.widget.style.height = "calc(100vh - 20px)";
    this.widget.style.opacity = "1";

    this.widget.style.left = "unset";
    this.widget.style.right = "unset";
    this.widget.style.transform = "unset";
    this.widget.style.width = "100%";

    if (this.options.widgetPosition === "left") {
      this.widget.style.maxWidth = "480px";

      if (this.options.popupPosition === "left") {
        this.widget.style.left = "10px";
      } else {
        this.widget.style.right = "100%";
        this.widget.style.transform = "translateX(calc(100% + 10px))";
      }
    } else if (this.options.widgetPosition === "center") {
      this.widget.style.maxWidth = "580px";

      if (this.options.popupPosition === "left") {
        this.widget.style.left = "50%";
        this.widget.style.transform = "translateX(-50%)";
      } else {
        this.widget.style.right = "50%";
        this.widget.style.transform = "translateX(50%)";
      }
    } else {
      this.widget.style.maxWidth = "480px";

      if (this.options.popupPosition === "left") {
        this.widget.style.left = "100%";
        this.widget.style.transform = "translateX(calc(-100% - 10px))";
      } else {
        this.widget.style.right = "10px";
      }
    }

    this.postMessage({ type: "expandedPopup" });
  }

  private collapsePopup() {
    if (!this.widget) {
      this.log("Widget not mounted, not collapsing popup");
      return;
    }

    this.widget.style.opacity = "1";
    this.widget.style.height = "0px";
    this.widget.style.transform = "unset";
    this.widget.style.width = "100%";
    this.widget.style.maxWidth = "360px";
    this.widget.style.minWidth = "320px";

    if (this.options.popupPosition === "left") {
      this.widget.style.left = "10px";
    } else {
      this.widget.style.right = "10px";
    }

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
        new Date(b.released_at).getTime() - new Date(a.released_at).getTime()
    )[0];

    const lastSeenReleaseIds = getCookie("onset:latest")?.split(",") || [];

    if (lastSeenReleaseIds.includes(latestRelease.id as string)) {
      this.log("Latest release already seen, not showing popup");
      return;
    }

    lastSeenReleaseIds.push(latestRelease.id as string);

    setCookie(
      "onset:latest",
      Array.from(new Set(lastSeenReleaseIds)).join(",")
    );

    this.openPopup(latestRelease.id as string);
  }

  /**
   * Opens the release note popup with the given release ID.
   * @param id Release ID to highlight specific release.
   */
  public openReleaseNote(id: string = "latest") {
    if (!id) {
      this.log("No release ID provided to openReleaseNote");
      throw new Error(
        'OnsetWidget: "id" parameter is required for openReleaseNote'
      );
    }

    if (!this.isLoaded) {
      this.log("Widget not loaded, queuing openReleaseNote");
      this.queue.push({
        type: "openReleaseNote",
        payload: id,
        lifecycle: "loaded",
      });
      return;
    }

    if (this.releases.length === 0) {
      this.log("No releases available, not opening release note");
      return;
    }

    this.openPopup(id);
    this.expandPopup();
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

    this.widget.style.height = "calc(100vh - 20px)";
    this.widget.style.left = "unset";
    this.widget.style.right = "unset";
    this.widget.style.transform = "unset";
    this.widget.style.width = "100%";

    if (this.options.widgetPosition === "left") {
      this.widget.style.maxWidth = "480px";
      this.widget.style.left = "10px";
      this.widget.style.transform = "translateX(calc(-100% - 10px))";
    } else if (this.options.widgetPosition === "center") {
      this.widget.style.maxWidth = "580px";
      this.widget.style.left = "50%";
      this.widget.style.transform = "translateX(-50%)";
    } else {
      this.widget.style.maxWidth = "480px";
      this.widget.style.right = "10px";
      this.widget.style.transform = "translateX(calc(100% + 10px))";
    }

    this.widget.addEventListener(
      "transitionend",
      () => {
        this.widget!.style.opacity = "1";

        if (this.options.widgetPosition !== "center") {
          this.widget!.style.transform = "translateX(0%)";
        }

        this.postMessage({ type: "openedWidget" });
        this.options.callbacks?.onWidgetOpen?.();
      },
      { once: true }
    );
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

    this.widget!.style.opacity = "0";

    if (this.options.widgetPosition === "left") {
      this.widget!.style.transform = "translateX(calc(-100% - 10px))";
    } else if (this.options.widgetPosition === "right") {
      this.widget!.style.transform = "translateX(calc(100% + 10px))";
    }

    this.widget.addEventListener(
      "transitionend",
      () => {
        this.postMessage({ type: "closedWidget" });
        this.options.callbacks?.onWidgetClose?.();
      },
      { once: true }
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

    this.widget.style.opacity = "1";
    this.widget.style.width = "100%";
    this.widget.style.maxWidth = "360px";
    this.widget.style.minWidth = "320px";
    this.widget.style.height = "0px";

    if (this.options.popupPosition === "left") {
      this.widget.style.left = "10px";
    } else {
      this.widget.style.right = "10px";
    }

    if (id === "latest") {
      id = this.releases?.[0]?.id as string;
    }

    this.postMessage({ type: "openedPopup", releaseId: id });
    this.options.callbacks?.onPopupOpen?.(id);
    this.log("Popup opened for release ID:", id);
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

    this.widget.style.opacity = "0";
    this.widget.style.width = "0";
    this.widget.style.height = "0";

    this.postMessage({ type: "closedPopup" });
    this.options.callbacks?.onPopupClose?.();
    this.log("Popup closed");
  }

  /**
   * Removes the widget from the DOM and cleans up event listeners.
   */
  public remove() {
    this.log("Removing the widget...");

    const container = document.getElementById("ow_container");
    if (container) {
      document.body.removeChild(container);
      this.log("Widget removed");
    } else {
      this.log("Widget container not found, nothing to remove");
    }

    document.removeEventListener("message", this.eventListener.bind(this));
    this.log("Event listeners removed");
  }
}
