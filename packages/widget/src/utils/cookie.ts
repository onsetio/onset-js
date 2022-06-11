export function getDomain() {
  let domain = null;

  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const name = `__t${new Date().getTime()}`;

  for (let i = 0; i < parts.length; i++) {
    domain = parts.slice(-1 - i).join('.');

    setCookie(name, null, domain);

    if (getCookie(name)) {
      removeCookie(name, domain);
      return domain;
    }
  }
}

export function getCookie(name: string) {
  name = `${name}=`;

  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length);
    }
  }

  return null;
}

export function setCookie(
  name: string,
  data: any,
  domain?: string,
  expires = 'Fri, 31 Dec 9999 23:59:59 GMT'
) {
  domain = domain ?? getDomain();
  document.cookie = `${name}=${data};expires=${expires};path=/;domain=${domain};`;
}

export function removeCookie(name: string, domain?: string) {
  domain = domain ?? getDomain();
  setCookie(name, null, domain, 'Thu, 01 Jan 1970 00:00:00 UTC');
}
