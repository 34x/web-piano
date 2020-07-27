import { isBrowserSupported } from "./browser";

test("check isBrowserSupported for not supported browsers returns false", () => {
  expect(isBrowserSupported({ userAgent: 'foo'})).toBe(false);
  expect(isBrowserSupported({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15'})).toBe(false);
});

test("check isBrowserSupported for supported browsers returns true", () => {
  expect(isBrowserSupported({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0'})).toBe(true);
});