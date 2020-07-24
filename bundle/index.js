import App from "./app.js";
import Browser from "./browser.js";
import {isBrowserSupported} from "/web-piano/bundle/components/browser.js";
const ActualApp = isBrowserSupported(navigator) ? App : Browser;
const app2 = new ActualApp({
  target: document.body
});
