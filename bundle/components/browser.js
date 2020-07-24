export const browsers = [{
  name: "Mozilla Firefox",
  link: "https://www.mozilla.org/ru/firefox/"
}, {
  name: "Chrome",
  link: "https://www.google.com/chrome/"
}];
export function isBrowserSupported(navigator) {
  return navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Firefox") != -1;
}
