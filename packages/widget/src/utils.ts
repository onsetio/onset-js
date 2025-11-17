export function getCookie(name: string) {
  name = `${name}=`;

  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) == " ") {
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
  data: unknown,
  domain?: string,
  expires = "Fri, 31 Dec 9999 23:59:59 GMT"
) {
  domain = domain ?? window.location.hostname;
  document.cookie = `${name}=${data};expires=${expires};path=/;domain=${domain};`;
}

export function removeCookie(name: string, domain?: string) {
  domain = domain ?? window.location.hostname;
  setCookie(name, null, domain, "Thu, 01 Jan 1970 00:00:00 UTC");
}
